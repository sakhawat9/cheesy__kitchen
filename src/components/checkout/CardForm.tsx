import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useMemo, useState } from "react";
import { BiErrorCircle } from "react-icons/bi";
import { MdLockOutline } from "react-icons/md";
import Button from "../ui/Button";

// Loaded outside the component so the Stripe object isn't recreated on every
// render. Falls back to the project's existing test key when no environment
// variable is set, which is what the old hardcoded literal provided.
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_KEY ||
    "pk_test_X2jogsHYgJQNw8Mxn1iYXZyM001TvFWmtv",
);

/**
 * Stripe card entry.
 *
 * The old SimpleCardForm passed `className` twice to <CardNumberElement>
 * (React drops the first and warns), styled its inputs with `bg-gray-500` on
 * a light form, and left the submit button enabled while the payment was in
 * flight, so a double click charged twice. Its element styling is now driven
 * from the design tokens so the Stripe iframes match every other input.
 */
export default function CardForm({ onSuccess, submitting = false }: any) {
  return (
    <Elements stripe={stripePromise}>
      <Form onSuccess={onSuccess} submitting={submitting} />
    </Elements>
  );
}

function Form({ onSuccess, submitting }: any) {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const options = useMemo(
    () => ({
      style: {
        base: {
          color: "#1A1512",
          fontFamily: "var(--font-body), system-ui, sans-serif",
          fontSize: "16px",
          "::placeholder": { color: "#B0A69C" },
        },
        invalid: { color: "#B3261E", iconColor: "#B3261E" },
      },
    }),
    [],
  );

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!stripe || !elements || busy) return;

    setBusy(true);
    setError(null);

    const { error: stripeError, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardNumberElement)!,
    });

    if (stripeError) {
      setError(stripeError.message ?? "We couldn't process that card.");
      setBusy(false);
      return;
    }

    try {
      await onSuccess(paymentMethod.card);
    } finally {
      setBusy(false);
    }
  };

  const elementClass =
    "block w-full px-4 py-3 bg-white border rounded border-charcoal-200 transition-colors focus-within:border-ember-600 focus-within:ring-1 focus-within:ring-ember-600";

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="field">
        <label htmlFor="card-number" className="label">
          Card number
        </label>
        <div className={elementClass}>
          <CardNumberElement id="card-number" options={options} />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="field">
          <label htmlFor="card-expiry" className="label">
            Expiry date
          </label>
          <div className={elementClass}>
            <CardExpiryElement id="card-expiry" options={options} />
          </div>
        </div>

        <div className="field">
          <label htmlFor="card-cvc" className="label">
            Security code
          </label>
          <div className={elementClass}>
            <CardCvcElement id="card-cvc" options={options} />
          </div>
        </div>
      </div>

      {error && (
        <p className="mb-5 alert alert-danger" role="alert">
          <BiErrorCircle className="w-5 h-5 shrink-0" aria-hidden="true" />
          <span>{error}</span>
        </p>
      )}

      <Button
        type="submit"
        variant="accent"
        size="lg"
        block
        disabled={!stripe}
        loading={busy || submitting}
      >
        <MdLockOutline className="w-5 h-5" aria-hidden="true" />
        Place order
      </Button>

      <p className="mt-4 text-xs text-center text-charcoal-400">
        Card details go straight to Stripe and are never stored on our servers.
      </p>

      <p className="p-3 mt-5 text-xs rounded bg-cream-100 text-charcoal-500">
        <strong className="font-semibold text-charcoal-700">Test mode.</strong>{" "}
        Use card <span className="tabular-nums">4242 4242 4242 4242</span> with
        any future expiry and any CVC.
      </p>
    </form>
  );
}
