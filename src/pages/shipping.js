import CheckoutSteps from "components/checkout/CheckoutSteps";
import OrderSummary from "components/checkout/OrderSummary";
import Layout from "components/common/Layout";
import Button from "components/ui/Button";
import EmptyState from "components/ui/EmptyState";
import Field, { inputClass } from "components/ui/Field";
import PageHeader from "components/ui/PageHeader";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { MdOutlineShoppingBasket } from "react-icons/md";
import { Store } from "utils/Store";
import { useMounted } from "utils/useMounted";

export default function ShippingPage() {
  const router = useRouter();
  const { redirect } = router.query;
  const { state, dispatch } = useContext(Store);
  const { userInfo, cart } = state;
  const mounted = useMounted();

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  // The old page ran this effect with an empty dependency array while reading
  // `shippingAddress` from context, so a saved address never prefilled unless
  // it happened to be present on the very first render.
  useEffect(() => {
    if (!mounted) return;
    if (!userInfo) {
      router.replace("/login?redirect=/shipping");
      return;
    }
    reset({
      fullName: cart.shippingAddress?.fullName ?? userInfo.name ?? "",
      phone: cart.shippingAddress?.phone ?? "",
      address: cart.shippingAddress?.address ?? "",
      city: cart.shippingAddress?.city ?? "",
      postalCode: cart.shippingAddress?.postalCode ?? "",
      notes: cart.shippingAddress?.notes ?? "",
    });
  }, [mounted, userInfo, cart.shippingAddress, reset, router]);

  const onSubmit = (values) => {
    dispatch({ type: "SAVE_SHIPPING_ADDRESS", payload: values });
    router.push(redirect || "/payments");
  };

  return (
    <Layout title="Delivery details">
      {/* The banner renders even before hydration, so the server response
          always carries the page's <h1> rather than an empty shell. */}
      <PageHeader
        eyebrow="Checkout"
        title="Where's it going?"
        crumbs={[{ label: "Basket", href: "/cartFood" }, { label: "Delivery" }]}
      />

      <div className="section">
        <div className="container">
          <CheckoutSteps current={1} />

          {!mounted ? (
            <div className="h-96 skeleton rounded-card" aria-hidden="true" />
          ) : cart.cartItems.length === 0 ? (
            <EmptyState
              icon={MdOutlineShoppingBasket}
              title="There's nothing to deliver yet"
              description="Add something to your basket and we'll take it from there."
              action={{ label: "Browse the menu", href: "/foods" }}
            />
          ) : (
            <div className="grid gap-8 lg:grid-cols-12 lg:gap-10 lg:items-start">
              <div className="lg:col-span-7">
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                  <Field label="Full name" error={errors.fullName?.message} required>
                    {(id, describedBy, invalid) => (
                      <input
                        id={id}
                        type="text"
                        autoComplete="name"
                        aria-describedby={describedBy}
                        aria-invalid={invalid}
                        className={inputClass(invalid)}
                        {...register("fullName", {
                          required: "Please tell us who the order is for.",
                        })}
                      />
                    )}
                  </Field>

                  <Field
                    label="Phone number"
                    error={errors.phone?.message}
                    hint="The rider will call this number if they can't find the door."
                    required
                  >
                    {(id, describedBy, invalid) => (
                      <input
                        id={id}
                        type="tel"
                        autoComplete="tel"
                        aria-describedby={describedBy}
                        aria-invalid={invalid}
                        className={inputClass(invalid)}
                        {...register("phone", {
                          required: "We need a number in case the rider gets stuck.",
                          minLength: {
                            value: 7,
                            message: "That doesn't look like a full phone number.",
                          },
                        })}
                      />
                    )}
                  </Field>

                  <Field
                    label="Street address"
                    error={errors.address?.message}
                    required
                  >
                    {(id, describedBy, invalid) => (
                      <input
                        id={id}
                        type="text"
                        autoComplete="street-address"
                        aria-describedby={describedBy}
                        aria-invalid={invalid}
                        className={inputClass(invalid)}
                        {...register("address", {
                          required: "Please enter the delivery address.",
                        })}
                      />
                    )}
                  </Field>

                  <div className="grid gap-x-5 sm:grid-cols-2">
                    <Field label="City" error={errors.city?.message} required>
                      {(id, describedBy, invalid) => (
                        <input
                          id={id}
                          type="text"
                          autoComplete="address-level2"
                          aria-describedby={describedBy}
                          aria-invalid={invalid}
                          className={inputClass(invalid)}
                          {...register("city", { required: "Please enter a city." })}
                        />
                      )}
                    </Field>

                    <Field label="Postal code" error={errors.postalCode?.message}>
                      {(id, describedBy, invalid) => (
                        <input
                          id={id}
                          type="text"
                          autoComplete="postal-code"
                          aria-describedby={describedBy}
                          aria-invalid={invalid}
                          className={inputClass(invalid)}
                          {...register("postalCode")}
                        />
                      )}
                    </Field>
                  </div>

                  <Field
                    label="Delivery notes"
                    hint="Optional — gate codes, floor number, anything the rider should know."
                  >
                    {(id, describedBy) => (
                      <textarea
                        id={id}
                        rows={3}
                        aria-describedby={describedBy}
                        className="textarea"
                        {...register("notes")}
                      />
                    )}
                  </Field>

                  <Button
                    type="submit"
                    variant="accent"
                    size="lg"
                    loading={isSubmitting}
                    className="mt-2"
                  >
                    Continue to payment
                  </Button>
                </form>
              </div>

              <aside className="lg:col-span-5 lg:sticky lg:top-24">
                <OrderSummary cartItems={cart.cartItems} />
              </aside>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
