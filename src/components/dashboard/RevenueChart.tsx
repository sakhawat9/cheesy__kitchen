import { useMemo } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import EmptyState from "../ui/EmptyState";
import { BiLineChart } from "react-icons/bi";
import { formatPrice } from "../../utils/format";

/**
 * Revenue over the last 12 weeks, derived from real orders.
 *
 * The old DashboardChart plotted a hardcoded `uv`/`pv`/`amt` array over
 * "Page A" through "Page G" — the stock recharts documentation example, left
 * in place and presented as this restaurant's analytics.
 */
export default function RevenueChart({ orders = [] }: any) {
  const data = useMemo(() => {
    const WEEKS = 12;
    const now = new Date();
    const buckets = Array.from({ length: WEEKS }, (_, index) => {
      const start = new Date(now);
      start.setDate(start.getDate() - (WEEKS - 1 - index) * 7);
      return {
        label: start.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
        weekStart: start,
        revenue: 0,
        orders: 0,
      };
    });

    orders.forEach((order: any) => {
      const placed = new Date(order.createdAt);
      if (Number.isNaN(placed.getTime())) return;

      const weeksAgo = Math.floor(
        (now.getTime() - placed.getTime()) / (7 * 24 * 60 * 60 * 1000),
      );
      const index = WEEKS - 1 - weeksAgo;
      if (index < 0 || index >= WEEKS) return;

      buckets[index].revenue +=
        order.total ??
        (order.cartItems ?? []).reduce(
          (sum: number, item: any) => sum + (item.price ?? 0) * (item.quantity ?? 1),
          0,
        );
      buckets[index].orders += 1;
    });

    return buckets;
  }, [orders]);

  if (orders.length === 0) {
    return (
      <div className="p-5 bg-white border rounded-card border-cream-300">
        <h2 className="mb-4 text-h4">Revenue</h2>
        <EmptyState
          compact
          icon={BiLineChart}
          title="No orders yet"
          description="Once orders start coming in, weekly revenue will be charted here."
        />
      </div>
    );
  }

  return (
    <div className="p-5 bg-white border rounded-card border-cream-300">
      <h2 className="mb-1 text-h4">Revenue</h2>
      <p className="mb-6 text-sm text-charcoal-500">Last 12 weeks</p>

      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#C0492B" stopOpacity={0.28} />
                <stop offset="100%" stopColor="#C0492B" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" stroke="#E8DECE" vertical={false} />
            <XAxis
              dataKey="label"
              tick={{ fontSize: 12, fill: "#8A7E74" }}
              tickLine={false}
              axisLine={{ stroke: "#E8DECE" }}
            />
            <YAxis
              tick={{ fontSize: 12, fill: "#8A7E74" }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => formatPrice(value)}
              width={70}
            />
            <Tooltip
              formatter={(value: any) => [formatPrice(value), "Revenue"]}
              contentStyle={{
                borderRadius: "0.5rem",
                border: "1px solid #E8DECE",
                fontSize: "0.875rem",
              }}
            />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#C0492B"
              strokeWidth={2}
              fill="url(#revenueFill)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
