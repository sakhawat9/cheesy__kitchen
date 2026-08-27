import { BiReceipt, BiUser } from "react-icons/bi";
import { MdOutlineRateReview, MdOutlineRestaurantMenu } from "react-icons/md";
import { formatPrice } from "../../utils/format";

/**
 * Dashboard summary tiles.
 *
 * The old DashHome repeated the same block four times, each on a different
 * shade of the `amazon` green with the tile's own icon rendered a second time
 * at `text-8xl` in gray behind the number. The counts were real; the fifth
 * figure anyone actually wants — revenue — wasn't shown at all.
 */
export default function StatCards({ foods = [], orders = [], users = [], reviews = [] }: any) {
  const revenue = orders.reduce(
    (sum: number, order: any) =>
      sum +
      (order.total ??
        (order.cartItems ?? []).reduce(
          (line: number, item: any) => line + (item.price ?? 0) * (item.quantity ?? 1),
          0,
        )),
    0,
  );

  const STATS = [
    { label: "Dishes on the menu", value: foods.length, icon: MdOutlineRestaurantMenu },
    { label: "Orders", value: orders.length, icon: BiReceipt },
    { label: "Revenue", value: formatPrice(revenue), icon: BiReceipt },
    { label: "Customers", value: users.length, icon: BiUser },
    { label: "Reviews", value: reviews.length, icon: MdOutlineRateReview },
  ];

  return (
    <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
      {STATS.map(({ label, value, icon: Icon }) => (
        <div key={label} className="p-5 bg-white border rounded-card border-oat-300">
          <div className="flex items-center gap-3 mb-3">
            <span className="flex items-center justify-center w-9 h-9 rounded-full bg-saffron-100 text-saffron-700">
              <Icon className="w-5 h-5" aria-hidden="true" />
            </span>
            <dt className="text-sm font-medium text-espresso-500">{label}</dt>
          </div>
          <dd className="text-2xl font-semibold font-display text-espresso-900">{value}</dd>
        </div>
      ))}
    </dl>
  );
}
