import { MdCheck } from "react-icons/md";

const STEPS = ["Basket", "Delivery details", "Payment"];

/**
 * Progress indicator across the three checkout screens. The old flow gave no
 * indication of where you were or how many steps remained.
 */
export default function CheckoutSteps({ current = 0 }: { current: number }) {
  return (
    <nav aria-label="Checkout progress" className="mb-10">
      <ol className="flex flex-wrap items-center gap-x-3 gap-y-2">
        {STEPS.map((label, index) => {
          const done = index < current;
          const active = index === current;

          return (
            <li key={label} className="flex items-center gap-3">
              <span
                className={`flex items-center justify-center w-7 h-7 text-xs font-bold rounded-full shrink-0 ${
                  done
                    ? "bg-success text-white"
                    : active
                      ? "bg-ember-600 text-white"
                      : "bg-cream-200 text-charcoal-400"
                }`}
                aria-hidden="true"
              >
                {done ? <MdCheck className="w-4 h-4" /> : index + 1}
              </span>

              <span
                aria-current={active ? "step" : undefined}
                className={`text-sm font-medium ${
                  active ? "text-charcoal-900" : "text-charcoal-500"
                }`}
              >
                {label}
                {done && <span className="sr-only"> (completed)</span>}
              </span>

              {index < STEPS.length - 1 && (
                <span
                  aria-hidden="true"
                  className="hidden w-8 h-px sm:block bg-cream-300"
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
