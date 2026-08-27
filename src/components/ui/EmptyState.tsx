import Button from "./Button";

/**
 * Shared empty / zero-result state. Every list surface (basket, menu, search,
 * orders, admin tables) routes through this so an empty screen always looks
 * deliberate rather than like a rendering failure.
 */
export default function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  secondaryAction,
  compact = false,
  className = "",
  as: Heading = "h3",
}: any) {
  return (
    <div
      className={`flex flex-col items-center justify-center text-center rounded-panel bg-oat-200/70 ${
        compact ? "px-5 py-10" : "px-6 py-16 sm:py-20"
      } ${className}`}
    >
      {Icon && (
        <span
          className={`flex items-center justify-center rounded-full bg-oat-100 text-chilli-600 shadow-subtle ${
            compact ? "w-12 h-12 mb-4" : "w-20 h-20 mb-6"
          }`}
        >
          <Icon className={compact ? "w-5 h-5" : "w-8 h-8"} aria-hidden="true" />
        </span>
      )}

      <Heading className={compact ? "mb-1.5 text-base font-semibold" : "mb-3 text-h3"}>
        {title}
      </Heading>

      {description && (
        <p
          className={`max-w-sm text-espresso-500 ${
            compact ? "mb-4 text-sm" : "mb-8"
          }`}
        >
          {description}
        </p>
      )}

      {(action || secondaryAction) && (
        <div className="flex flex-wrap items-center justify-center gap-3">
          {action && (
            <Button href={action.href} onClick={action.onClick} variant="order">
              {action.label}
            </Button>
          )}
          {secondaryAction && (
            <Button
              href={secondaryAction.href}
              onClick={secondaryAction.onClick}
              variant="line"
            >
              {secondaryAction.label}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
