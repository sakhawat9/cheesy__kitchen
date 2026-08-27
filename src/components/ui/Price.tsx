import { formatPrice } from "../../utils/format";

/** Dish price, set in the display serif so it reads as a menu price. */
export default function Price({ price, size = "md", dark = false, className = "" }: any) {
  const sizes: Record<string, string> = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-3xl",
  };

  return (
    <p
      className={`font-display font-semibold tabular-nums ${
        dark ? "text-saffron-400" : "text-chilli-600"
      } ${sizes[size] ?? sizes.md} ${className}`}
    >
      {formatPrice(price)}
    </p>
  );
}
