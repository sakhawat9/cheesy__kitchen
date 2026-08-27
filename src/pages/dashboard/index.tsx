import DashboardLayout from "components/dashboard/DashboardLayout";
import RevenueChart from "components/dashboard/RevenueChart";
import StatCards from "components/dashboard/StatCards";
import EmptyState from "components/ui/EmptyState";
import Link from "next/link";
import { BiReceipt } from "react-icons/bi";
import foodRepo from "repositories/foodRepo";
import orderRepo from "repositories/orderRepo";
import reviewRepo from "repositories/reviewRepo";
import userRepo from "repositories/userRepo";
import { formatDate, formatPrice } from "utils/format";

export default function DashboardPage({ foods, orders, users, reviews }: any) {
  const recent = [...orders]
    .sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    .slice(0, 5);

  return (
    <DashboardLayout title="Overview">
      <StatCards foods={foods} orders={orders} users={users} reviews={reviews} />

      <div className="grid gap-6 mt-6 xl:grid-cols-12">
        <div className="xl:col-span-7">
          <RevenueChart orders={orders} />
        </div>

        <div className="xl:col-span-5">
          <div className="p-5 bg-white border rounded-card border-cream-300">
            <div className="flex items-center justify-between gap-4 mb-5">
              <h2 className="text-h4">Recent orders</h2>
              {orders.length > 0 && (
                <Link href="/dashboard/allOrder" className="text-sm link shrink-0">
                  View all
                </Link>
              )}
            </div>

            {recent.length === 0 ? (
              <EmptyState
                compact
                icon={BiReceipt}
                title="No orders yet"
                description="New orders will show up here as they come in."
              />
            ) : (
              <ul className="divide-y divide-cream-200">
                {recent.map((order: any) => (
                  <li key={order._id} className="flex items-center gap-4 py-3">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate text-charcoal-900">
                        {order.userInfo?.name ?? "Guest"}
                      </p>
                      <p className="text-xs text-charcoal-500">
                        {formatDate(order.createdAt)} ·{" "}
                        {order.cartItems?.length ?? 0}{" "}
                        {order.cartItems?.length === 1 ? "item" : "items"}
                      </p>
                    </div>
                    <p className="text-sm font-semibold text-charcoal-900 tabular-nums">
                      {formatPrice(
                        order.total ??
                          (order.cartItems ?? []).reduce(
                            (sum: number, item: any) =>
                              sum + (item.price ?? 0) * (item.quantity ?? 1),
                            0,
                          ),
                      )}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export async function getServerSideProps() {
  const [foods, orders, users, reviews] = await Promise.all([
    foodRepo.listAll(),
    orderRepo.listAll(),
    userRepo.listAll(),
    reviewRepo.listAll(),
  ]);

  return {
    props: {
      foods,
      orders,
      // Password hashes were previously serialised into the page's JSON payload
      // and shipped to the browser.
      users: users.map(({ password, ...rest }: any) => rest),
      reviews,
    },
  };
}
