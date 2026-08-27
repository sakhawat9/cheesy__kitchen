import { formatPrice } from "../../utils/format";

/** Dish price. One component so currency formatting can't drift per screen. */
export default function Price({ price, size = "md", className = "" }: any) {
  const sizes: Record<string, string> = {
    sm: "text-base",
    md: "text-lg",
    lg: "text-2xl",
  };

  return (
    <p className={`flex flex-wrap items-baseline gap-2 ${className}`}>
      <span className={`font-semibold text-charcoal-900 ${sizes[size] ?? sizes.md}`}>
        {formatPrice(price)}
      </span>
    </p>
  );
}
