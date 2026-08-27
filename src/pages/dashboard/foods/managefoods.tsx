import axios from "axios";
import DashboardLayout from "components/dashboard/DashboardLayout";
import ConfirmDialog from "components/ui/ConfirmDialog";
import EmptyState from "components/ui/EmptyState";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { MdOutlineRestaurantMenu } from "react-icons/md";
import { RiDeleteBin7Line } from "react-icons/ri";
import { toast } from "react-toastify";
import foodRepo from "repositories/foodRepo";
import { categoryLabel, formatPrice } from "utils/format";
import { Store } from "utils/Store";

/**
 * Manage the menu.
 *
 * The old ManageFoods rendered a `flex flex-wrap` of cards with `window.confirm`
 * on delete, and the delete request went to an endpoint whose handler called
 * Mongoose's removed `.remove()` — so nothing was ever actually deleted, but
 * the card disappeared from the page until you reloaded.
 */
export default function ManageFoodsPage({ foods = [] }: any) {
  const router = useRouter();
  const { state } = useContext(Store);
  const [target, setTarget] = useState<any>(null);
  const [deleting, setDeleting] = useState(false);

  // Mirror the server props locally so a delete disappears from the table
  // immediately. Re-running getServerSideProps via router.replace() on the
  // same URL is not guaranteed to repaint before the user looks again, which
  // left a just-deleted dish sitting in the table.
  const [rows, setRows] = useState(foods);
  useEffect(() => setRows(foods), [foods]);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await axios.delete(`/api/admin/foods/${target._id}`, {
        headers: { authorization: `Bearer ${state.userInfo?.token}` },
      });
      toast.success(`“${target.name}” removed from the menu.`);
      setRows((current: any[]) => current.filter((food) => food._id !== target._id));
      setTarget(null);
      router.replace(router.asPath, undefined, { scroll: false });
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ??
          "We couldn't delete that dish. Please try again.",
      );
    } finally {
      setDeleting(false);
    }
  };

  return (
    <DashboardLayout title="Manage menu">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8 -mt-4">
        <p className="text-charcoal-500">
          {rows.length} {rows.length === 1 ? "dish" : "dishes"} on the menu.
        </p>
        <Link href="/dashboard/foods/addFoods" className="btn btn-accent btn-sm">
          Add a dish
        </Link>
      </div>

      {rows.length === 0 ? (
        <EmptyState
          icon={MdOutlineRestaurantMenu}
          title="The menu is empty"
          description="Add the first dish and it'll appear on the site straight away."
          action={{ label: "Add a dish", href: "/dashboard/foods/addFoods" }}
        />
      ) : (
        <div className="table-wrap">
          <table className="table">
            <caption className="sr-only">Every dish on the menu</caption>
            <thead>
              <tr>
                <th scope="col">Dish</th>
                <th scope="col">Category</th>
                <th scope="col">Price</th>
                <th scope="col">Stock</th>
                <th scope="col">Featured</th>
                <th scope="col" className="text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((food: any) => (
                <tr key={food._id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12 overflow-hidden rounded shrink-0 bg-cream-100">
                        <Image
                          src={food.image}
                          alt=""
                          fill
                          sizes="48px"
                          className="object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium truncate text-charcoal-900">
                          {food.name}
                        </p>
                        <p className="text-xs truncate text-charcoal-500">
                          /foods/{food.slug}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td>{categoryLabel(food.category)}</td>
                  <td className="tabular-nums">{formatPrice(food.price)}</td>
                  <td>
                    {food.countInStock > 0 ? (
                      <span className="badge badge-fresh">
                        {food.countInStock} in stock
                      </span>
                    ) : (
                      <span className="badge badge-neutral">Sold out</span>
                    )}
                  </td>
                  <td>
                    {food.prichard ? (
                      <span className="badge badge-accent">Featured</span>
                    ) : (
                      <span className="text-charcoal-400">—</span>
                    )}
                  </td>
                  <td>
                    <div className="flex items-center justify-end gap-1">
                      <Link
                        href={`/dashboard/foods/${food._id}`}
                        aria-label={`Edit ${food.name}`}
                        className="flex items-center justify-center transition-colors rounded-full w-9 h-9 text-charcoal-500 hover:bg-cream-100 hover:text-charcoal-900"
                      >
                        <FiEdit className="w-4 h-4" aria-hidden="true" />
                      </Link>
                      <button
                        type="button"
                        onClick={() => setTarget(food)}
                        aria-label={`Delete ${food.name}`}
                        className="flex items-center justify-center transition-colors rounded-full w-9 h-9 text-charcoal-500 hover:bg-danger-soft hover:text-danger"
                      >
                        <RiDeleteBin7Line className="w-4 h-4" aria-hidden="true" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <ConfirmDialog
        open={Boolean(target)}
        onClose={() => setTarget(null)}
        onConfirm={handleDelete}
        loading={deleting}
        title={`Delete “${target?.name}”?`}
        description="This removes the dish from the menu permanently. Orders that already include it are unaffected."
        confirmLabel="Delete dish"
      />
    </DashboardLayout>
  );
}

export async function getServerSideProps() {
  const foods = await foodRepo.listAll();
  return { props: { foods } };
}
