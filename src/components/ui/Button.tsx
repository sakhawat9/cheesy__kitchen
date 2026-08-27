import Link from "next/link";
import { forwardRef } from "react";

const VARIANTS: Record<string, string> = {
  primary: "btn-primary",
  accent: "btn-accent",
  outline: "btn-outline",
  ghost: "btn-ghost",
  danger: "btn-danger",
  onDark: "btn-on-dark",
};

const SIZES: Record<string, string> = {
  sm: "btn-sm",
  md: "",
  lg: "btn-lg",
};

/**
 * The single button in the app. Renders an `<a>` (via next/link) when `href`
 * is passed and a `<button>` otherwise, so navigation stays semantically
 * correct instead of a `<button>` wrapping a `<Link>` — which the old cards,
 * hero and cart all did, producing invalid nested-interactive HTML.
 */
const Button = forwardRef<any, any>(function Button(
  {
    variant = "primary",
    size = "md",
    block = false,
    href,
    className = "",
    loading = false,
    disabled,
    children,
    ...props
  },
  ref,
) {
  const classes = [
    "btn",
    VARIANTS[variant] ?? VARIANTS.primary,
    SIZES[size] ?? "",
    block ? "btn-block" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const content = (
    <>
      {loading && <Spinner />}
      {children}
    </>
  );

  if (href) {
    return (
      <Link ref={ref} href={href} className={classes} {...props}>
        {content}
      </Link>
    );
  }

  return (
    <button
      ref={ref}
      className={classes}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...props}
    >
      {content}
    </button>
  );
});

function Spinner() {
  return (
    <svg
      className="w-4 h-4 animate-spin"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-90"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      />
    </svg>
  );
}

export default Button;
