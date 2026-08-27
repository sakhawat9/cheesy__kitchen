import axios from "axios";
import CardForm from "components/checkout/CardForm";
import CheckoutSteps from "components/checkout/CheckoutSteps";
import OrderSummary from "components/checkout/OrderSummary";
import Layout from "components/common/Layout";
import EmptyState from "components/ui/EmptyState";
import PageMasthead from "components/ui/PageMasthead";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { LuCircleCheck, LuShoppingBasket } from "react-icons/lu";
import { toast } from "react-toastify";
import { Store } from "utils/Store";
import { useMounted } from "utils/useMounted";

/**
 * Payment step.
 *
 * The old flow put the billing form, a payment-method radio group and the
 * order list on one unstructured screen. Its billing inputs were bound with
 * `value={userInfo?.name}` and no `onChange`, so React logged a controlled-
 * input warning and the fields were read-only by accident. The "Paypal" radio
 * revealed a "Pay now" button wired to nothing. And on success it fired a
 * sweetalert but never navigated, leaving you on a checkout page with an empty
 * basket.
 *
 * Delivery details now come from the previous step rather than being asked for
 * twice, and a successful order shows a confirmation.
 */
export default function PaymentsPage() {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const { userInfo, cart } = state;
  const mounted = useMounted();

  const [submitting, setSubmitting] = useState(false);
  const [placed, setPlaced] = useState(false);

  useEffect(() => {
    if (!mounted) return;
    if (!userInfo) {
      router.replace("/login?redirect=/payments");
      return;
    }
    // Skipping straight to /payments with no address would previously submit
    // an order with `phone: ""` and `address: ""`.
    if (cart.cartItems.length > 0 && !cart.shippingAddress?.address && !placed) {
      router.replace("/shipping");
    }
  }, [mounted, userInfo, cart.cartItems.length, cart.shippingAddress, placed, router]);

  const handlePayment = async (paymentInfo) => {
    setSubmitting(true);
    try {
      await axios.post(
        "/api/orders/orders",
        {
          phone: cart.shippingAddress?.phone ?? "",
          address: [
            cart.shippingAddress?.address,
            cart.shippingAddress?.city,
            cart.shippingAddress?.postalCode,
          ]
            .filter(Boolean)
            .join(", "),
          paymentInfo,
          userInfo,
          cartItems: cart.cartItems,
        },
        { headers: { authorization: `Bearer ${userInfo.token}` } },
      );

      setPlaced(true);
      dispatch({ type: "CART_CLEAR" });
    } catch (error) {
      toast.error(
        error?.response?.data?.message ??
          "We couldn't place that order. Your card has not been charged.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Layout heroPage title={placed ? "Order confirmed" : "Payment"}>
      <PageMasthead
        label="Checkout"
        title={placed ? "Order confirmed" : "Payment"}
        crumbs={[
          { label: "Basket", href: "/cartFood" },
          { label: "Delivery", href: "/shipping" },
          { label: "Payment" },
        ]}
      />

      <div className="section surface-cream">
        <div className="container">
          {!mounted ? (
            <div className="h-96 skeleton rounded-panel" aria-hidden="true" />
          ) : placed ? (
            <EmptyState
              icon={LuCircleCheck}
              title="Thanks — the kitchen has your order"
              description="We're cooking it now. You'll get a call from the rider when they're close."
              action={{ label: "Back to the menu", href: "/foods" }}
              secondaryAction={{ label: "Back home", href: "/" }}
            />
          ) : cart.cartItems.length === 0 ? (
            <EmptyState
              icon={LuShoppingBasket}
              title="Your basket is empty"
              description="There's nothing to pay for yet."
              action={{ label: "Browse the menu", href: "/foods" }}
            />
          ) : (
            <>
              <CheckoutSteps current={2} />

              <div className="grid gap-8 lg:grid-cols-12 lg:gap-10 lg:items-start">
                <div className="lg:col-span-7">
                  <h2 className="mb-8 text-display">Card details</h2>
                  <CardForm onSuccess={handlePayment} submitting={submitting} />
                </div>

                <aside className="space-y-6 lg:col-span-5 lg:sticky lg:top-24">
                  <OrderSummary cartItems={cart.cartItems} />

                  <div className="p-7 rounded-panel bg-oat-200">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <h2 className="text-2xl">Delivering to</h2>
                      <Link href="/shipping" className="text-sm link shrink-0">
                        Edit
                      </Link>
                    </div>
                    <address className="text-sm not-italic leading-relaxed text-espresso-600">
                      {cart.shippingAddress?.fullName}
                      <br />
                      {cart.shippingAddress?.address}
                      <br />
                      {[cart.shippingAddress?.city, cart.shippingAddress?.postalCode]
                        .filter(Boolean)
                        .join(" ")}
                      <br />
                      {cart.shippingAddress?.phone}
                    </address>
                    {cart.shippingAddress?.notes && (
                      <p className="pt-3 mt-3 text-sm border-t border-espresso-200/60 text-espresso-500">
                        {cart.shippingAddress.notes}
                      </p>
                    )}
                  </div>
                </aside>
              </div>
            </>
          )}
        </div>
      </div>
    </Layout>
  );
}
