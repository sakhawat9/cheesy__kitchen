import Layout from "components/common/Layout";
import Button from "components/ui/Button";
import EmptyState from "components/ui/EmptyState";
import PageHeader from "components/ui/PageHeader";
import QuantityStepper from "components/ui/QuantityStepper";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";
import { MdDeleteOutline, MdOutlineShoppingBasket } from "react-icons/md";
import { cartTotals, formatPrice } from "utils/format";
import { Store } from "utils/Store";
import { useCart } from "utils/useCart";
import { useMounted } from "utils/useMounted";

/**
 * The basket.
 *
 * Rewritten off @material-ui — it was the only screen using it, and the whole
 * dependency existed to render one <Table> and a <Select> of every integer up
 * to `countInStock`. This is a responsive list that becomes cards on mobile,
 * where the old table simply overflowed the viewport horizontally.
 *
 * The page was also wrapped in `dynamic(..., { ssr: false })`, which blanked
 * it entirely until JS loaded. Instead the basket is rendered server-side as
 * its loading skeleton and filled in once the cookie is readable.
 */
export default function CartPage() {
  const router = useRouter();
  const { state } = useContext(Store);
  const { setQuantity, removeFromCart, pending } = useCart();
  const mounted = useMounted();

  const cartItems = state.cart.cartItems;
  const { itemCount, subtotal, total } = cartTotals(cartItems);

  return (
    <Layout title="Your Basket">
      <PageHeader
        eyebrow="Checkout"
        title="Your basket"
        crumbs={[{ label: "Basket" }]}
      />

      <div className="section">
        <div className="container">
          {!mounted ? (
            <BasketSkeleton />
          ) : cartItems.length === 0 ? (
            <EmptyState
              icon={MdOutlineShoppingBasket}
              title="Your basket is empty"
              description="Nothing in here yet. Have a look at what the kitchen is cooking tonight."
              action={{ label: "Browse the menu", href: "/foods" }}
              secondaryAction={{ label: "Back home", href: "/" }}
            />
          ) : (
            <div className="grid gap-8 lg:grid-cols-12 lg:gap-10 lg:items-start">
              {/* Items */}
              <div className="lg:col-span-8">
                <ul className="divide-y divide-cream-300 border-y border-cream-300">
                  {cartItems.map((item) => (
                    <li
                      key={item._id}
                      className="flex flex-col gap-4 py-5 sm:flex-row sm:items-center"
                    >
                      <Link
                        href={`/foods/${item.slug}`}
                        className="relative w-full overflow-hidden shrink-0 sm:w-24 aspect-[4/3] sm:aspect-square rounded-card bg-cream-100"
                      >
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          sizes="(max-width: 640px) 90vw, 96px"
                          className="object-cover"
                        />
                      </Link>

                      <div className="flex-1 min-w-0">
                        <h2 className="text-base font-semibold">
                          <Link
                            href={`/foods/${item.slug}`}
                            className="transition-colors hover:text-ember-700"
                          >
                            {item.name}
                          </Link>
                        </h2>
                        <p className="mt-0.5 text-sm text-charcoal-500">
                          {formatPrice(item.price)} each
                        </p>
                      </div>

                      <div className="flex items-center justify-between gap-4 sm:justify-end">
                        <QuantityStepper
                          value={item.quantity}
                          onChange={(next) => setQuantity(item, next)}
                          max={item.countInStock}
                          disabled={pending === `qty-${item._id}`}
                          label={`Quantity of ${item.name}`}
                        />

                        <p className="w-20 text-base font-semibold text-right text-charcoal-900 tabular-nums">
                          {formatPrice(item.price * item.quantity)}
                        </p>

                        <button
                          type="button"
                          onClick={() => removeFromCart(item)}
                          aria-label={`Remove ${item.name} from your basket`}
                          className="flex items-center justify-center transition-colors rounded-full w-9 h-9 text-charcoal-400 hover:bg-danger-soft hover:text-danger"
                        >
                          <MdDeleteOutline className="w-5 h-5" aria-hidden="true" />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="mt-6">
                  <Link href="/foods" className="link">
                    Add something else to the order
                  </Link>
                </div>
              </div>

              {/* Summary */}
              <aside className="lg:col-span-4 lg:sticky lg:top-24">
                <div className="card card-pad">
                  <h2 className="mb-5 text-h4">Order summary</h2>

                  <dl className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <dt className="text-charcoal-500">
                        Subtotal ({itemCount} {itemCount === 1 ? "item" : "items"})
                      </dt>
                      <dd className="font-medium text-charcoal-900">
                        {formatPrice(subtotal)}
                      </dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-charcoal-500">Delivery</dt>
                      <dd className="font-medium text-success">Free</dd>
                    </div>
                    <div className="flex justify-between pt-3 mt-3 border-t border-cream-300">
                      <dt className="text-base font-semibold text-charcoal-900">
                        Total
                      </dt>
                      <dd className="text-base font-semibold text-charcoal-900">
                        {formatPrice(total)}
                      </dd>
                    </div>
                  </dl>

                  <Button
                    variant="accent"
                    size="lg"
                    block
                    className="mt-6"
                    onClick={() => router.push("/shipping")}
                  >
                    Checkout
                  </Button>

                  <p className="mt-4 text-xs text-center text-charcoal-400">
                    Free delivery across Dhaka on every order.
                  </p>
                </div>
              </aside>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

/** Matches the basket's shape so the page doesn't jump when the cookie loads. */
function BasketSkeleton() {
  return (
    <div className="grid gap-8 lg:grid-cols-12 lg:gap-10" aria-hidden="true">
      <div className="space-y-5 lg:col-span-8">
        {Array.from({ length: 2 }, (_, i) => (
          <div key={i} className="flex gap-4 py-5">
            <div className="w-24 h-24 skeleton rounded-card shrink-0" />
            <div className="flex-1 space-y-3">
              <div className="w-1/2 h-4 skeleton" />
              <div className="w-1/4 h-3 skeleton" />
            </div>
          </div>
        ))}
      </div>
      <div className="lg:col-span-4">
        <div className="h-64 skeleton rounded-card" />
      </div>
    </div>
  );
}
