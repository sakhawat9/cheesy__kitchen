import { MdAdd, MdRemove } from "react-icons/md";

/**
 * Plus/minus quantity control.
 *
 * The cart previously used a Material-UI <Select> listing every integer up to
 * `countInStock` — 20 menu entries to change a quantity by one, and the only
 * reason @material-ui was a dependency at all.
 */
export default function QuantityStepper({
  value,
  onChange,
  min = 1,
  max = 99,
  disabled = false,
  label = "Quantity",
}: any) {
  return (
    <div className="inline-flex items-center border rounded-full border-charcoal-200">
      <button
        type="button"
        onClick={() => onChange(value - 1)}
        disabled={disabled || value <= min}
        aria-label={`Decrease ${label.toLowerCase()}`}
        className="flex items-center justify-center transition-colors rounded-full w-9 h-9 text-charcoal-700 hover:bg-charcoal-50 disabled:opacity-40 disabled:cursor-not-allowed"
      >
        <MdRemove className="w-4 h-4" aria-hidden="true" />
      </button>

      <span
        aria-live="polite"
        className="w-10 text-sm font-semibold text-center tabular-nums text-charcoal-900"
      >
        <span className="sr-only">{label}: </span>
        {value}
      </span>

      <button
        type="button"
        onClick={() => onChange(value + 1)}
        disabled={disabled || value >= max}
        aria-label={`Increase ${label.toLowerCase()}`}
        className="flex items-center justify-center transition-colors rounded-full w-9 h-9 text-charcoal-700 hover:bg-charcoal-50 disabled:opacity-40 disabled:cursor-not-allowed"
      >
        <MdAdd className="w-4 h-4" aria-hidden="true" />
      </button>
    </div>
  );
}
