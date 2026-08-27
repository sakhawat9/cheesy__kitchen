import DashboardLayout from "components/dashboard/DashboardLayout";
import EmptyState from "components/ui/EmptyState";
import { BiReceipt } from "react-icons/bi";
import orderRepo from "repositories/orderRepo";
import { formatDate, formatPrice } from "utils/format";

export default function AllOrdersPage({ orders = [] }: any) {
  const sorted = [...orders].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

  return (
    <DashboardLayout title="Orders">
      {sorted.length === 0 ? (
        <EmptyState
          icon={BiReceipt}
          title="No orders yet"
          description="Every order placed through the site will be listed here, newest first."
          action={{ label: "View the menu", href: "/foods" }}
        />
      ) : (
        <div className="table-wrap">
          <table className="table">
            <caption className="sr-only">
              All orders placed through the site, newest first
            </caption>
            <thead>
              <tr>
                <th scope="col">Order</th>
                <th scope="col">Customer</th>
                <th scope="col">Items</th>
                <th scope="col">Delivery to</th>
                <th scope="col">Placed</th>
                <th scope="col" className="text-right">
                  Total
                </th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((order: any) => {
                const total =
                  order.total ??
                  (order.cartItems ?? []).reduce(
                    (sum: number, item: any) =>
                      sum + (item.price ?? 0) * (item.quantity ?? 1),
                    0,
                  );

                return (
                  <tr key={order._id}>
                    <td className="font-mono text-xs text-espresso-500">
                      {String(order._id).slice(-8)}
                    </td>
                    <td>
                      <p className="font-medium text-espresso-900">
                        {order.userInfo?.name ?? "Guest"}
                      </p>
                      <p className="text-xs text-espresso-500">
                        {order.userInfo?.email}
                      </p>
                    </td>
                    <td>
                      <ul className="space-y-0.5 text-xs">
                        {(order.cartItems ?? []).map((item: any, index: number) => (
                          <li key={`${order._id}-${index}`}>
                            {item.quantity ?? 1} × {item.name}
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td className="max-w-[14rem] text-xs">
                      {order.address}
                      {order.phone && (
                        <span className="block text-espresso-500">{order.phone}</span>
                      )}
                    </td>
                    <td className="whitespace-nowrap">{formatDate(order.createdAt)}</td>
                    <td className="font-semibold text-right text-espresso-900 tabular-nums">
                      {formatPrice(total)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </DashboardLayout>
  );
}

export async function getServerSideProps() {
  const orders = await orderRepo.listAll();
  return { props: { orders } };
}
