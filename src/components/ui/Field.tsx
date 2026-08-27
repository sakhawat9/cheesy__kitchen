import { useId } from "react";
import { BiErrorCircle } from "react-icons/bi";

/**
 * Wraps a form control with a real `<label htmlFor>`, an optional hint, and an
 * error message wired through `aria-describedby` / `aria-invalid`.
 *
 * The old forms nested the control inside a bare `<label>` with the caption in
 * a `<span>`, and rendered errors into an unassociated `<span>` that screen
 * readers never announced.
 *
 * Usage with react-hook-form:
 *   <Field label="Email" error={errors.email?.message} required>
 *     {(id, describedBy, invalid) => (
 *       <input id={id} aria-describedby={describedBy} aria-invalid={invalid}
 *              className={inputClass(invalid)} {...register("email")} />
 *     )}
 *   </Field>
 */
export default function Field({
  label,
  error,
  hint,
  required = false,
  className = "",
  children,
}: any) {
  const reactId = useId();
  const id = `f-${reactId}`;
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;

  const describedBy =
    [error ? errorId : null, hint ? hintId : null].filter(Boolean).join(" ") ||
    undefined;

  return (
    <div className={`field ${className}`}>
      {label && (
        <label htmlFor={id} className="field-label">
          {label}
          {required && (
            <span className="ml-0.5 text-danger" aria-hidden="true">
              *
            </span>
          )}
          {required && <span className="sr-only"> (required)</span>}
        </label>
      )}

      {typeof children === "function"
        ? children(id, describedBy, error ? "true" : "false")
        : children}

      {hint && !error && (
        <p id={hintId} className="field-hint">
          {hint}
        </p>
      )}

      {error && (
        <p id={errorId} className="field-error" role="alert">
          <BiErrorCircle className="flex-shrink-0 w-4 h-4 mt-0.5" aria-hidden="true" />
          <span>{error}</span>
        </p>
      )}
    </div>
  );
}

/** Class list for a control inside a Field, toggling the invalid styling. */
export function inputClass(invalid: string | boolean, base = "input") {
  return invalid === "true" || invalid === true ? `${base} input-error` : base;
}
