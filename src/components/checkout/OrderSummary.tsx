import Image from "next/image";
import { cartTotals, formatPrice } from "../../utils/format";

/** Read-only basket summary shown alongside the delivery and payment forms. */
export default function OrderSummary({ cartItems = [] }: any) {
  const { itemCount, subtotal, total } = cartTotals(cartItems);

  return (
    <div className="card card-pad">
      <h2 className="mb-5 text-h4">Your order</h2>

      <ul className="mb-5 space-y-4">
        {cartItems.map((item: any) => (
          <li key={item._id} className="flex items-center gap-3">
            <div className="relative w-12 h-12 overflow-hidden rounded shrink-0 bg-cream-100">
              <Image
                src={item.image}
                alt=""
                fill
                sizes="48px"
                className="object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate text-charcoal-900">
                {item.name}
              </p>
              <p className="text-xs text-charcoal-500">
                {item.quantity} × {formatPrice(item.price)}
              </p>
            </div>
            <p className="text-sm font-semibold text-charcoal-900 tabular-nums">
              {formatPrice(item.price * item.quantity)}
            </p>
          </li>
        ))}
      </ul>

      <dl className="pt-4 space-y-3 text-sm border-t border-cream-300">
        <div className="flex justify-between">
          <dt className="text-charcoal-500">
            Subtotal ({itemCount} {itemCount === 1 ? "item" : "items"})
          </dt>
          <dd className="font-medium text-charcoal-900">{formatPrice(subtotal)}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-charcoal-500">Delivery</dt>
          <dd className="font-medium text-success">Free</dd>
        </div>
        <div className="flex justify-between pt-3 border-t border-cream-300">
          <dt className="text-base font-semibold text-charcoal-900">Total</dt>
          <dd className="text-base font-semibold text-charcoal-900">
            {formatPrice(total)}
          </dd>
        </div>
      </dl>
    </div>
  );
}
