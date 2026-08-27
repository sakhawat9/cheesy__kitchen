import Button from "./Button";

/**
 * Shared empty / zero-result state. Every list surface in the app (basket,
 * menu, search, orders, admin tables) routes through this so an empty screen
 * always looks deliberate rather than like a rendering failure. The old cart
 * page was the only screen with any empty state at all, and it was a blue
 * alert box with a stray button below it.
 */
export default function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  secondaryAction,
  // `compact` is for empty states nested inside a card (admin panels), where
  // the full-page padding leaves an awkward amount of dead space.
  compact = false,
  className = "",
  // Heading level. Defaults to h3 (the usual case: nested under a section
  // heading); pass "h2" where this sits directly beneath the page <h1>.
  as: Heading = "h3",
}: any) {
  return (
    <div
      className={`flex flex-col items-center justify-center text-center border border-dashed rounded-card border-cream-400 bg-cream-50 ${
        compact ? "px-5 py-10" : "px-6 py-16"
      } ${className}`}
    >
      {Icon && (
        <span
          className={`flex items-center justify-center rounded-full bg-white text-ember-600 shadow-subtle ${
            compact ? "w-12 h-12 mb-3" : "w-16 h-16 mb-5"
          }`}
        >
          <Icon className={compact ? "w-5 h-5" : "w-7 h-7"} aria-hidden="true" />
        </span>
      )}

      <Heading className={compact ? "mb-1.5 text-base font-semibold" : "mb-2 text-h4"}>
        {title}
      </Heading>

      {description && (
        <p className={`max-w-sm text-sm text-charcoal-500 ${compact ? "mb-4" : "mb-6"}`}>
          {description}
        </p>
      )}

      {(action || secondaryAction) && (
        <div className="flex flex-wrap items-center justify-center gap-3">
          {action && (
            <Button href={action.href} onClick={action.onClick} variant="accent">
              {action.label}
            </Button>
          )}
          {secondaryAction && (
            <Button
              href={secondaryAction.href}
              onClick={secondaryAction.onClick}
              variant="outline"
            >
              {secondaryAction.label}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
