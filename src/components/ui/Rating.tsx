import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";

/**
 * Star rating rendered from the dish's real `rating` value.
 *
 * The stars are decorative (`aria-hidden`) and the accessible value is exposed
 * once as text — previously every card and the detail page shipped five
 * hardcoded outline stars next to a literal "10 Review", which was both
 * inaccurate and read as ten separate list items to a screen reader.
 *
 * Half stars matter here because most dishes sit on x.5: rounding 4.5 up drew
 * five solid stars beside the label "4.5", which read as a contradiction.
 */
export default function Rating({
  value = 0,
  count,
  size = "sm",
  showValue = true,
  className = "",
}: any) {
  const rating = Number(value) || 0;
  const starSize = size === "lg" ? "w-4 h-4" : "w-3.5 h-3.5";

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span className="flex gap-0.5 text-ember-500" aria-hidden="true">
        {Array.from({ length: 5 }, (_, i) => {
          const position = i + 1;
          if (rating >= position) return <BsStarFill key={i} className={starSize} />;
          // Anything at least a quarter into this star draws as a half.
          if (rating >= position - 0.75)
            return <BsStarHalf key={i} className={starSize} />;
          return <BsStar key={i} className={`${starSize} text-charcoal-300`} />;
        })}
      </span>

      {showValue && (
        <span className="text-sm text-charcoal-500">
          <span className="sr-only">Rated </span>
          {rating.toFixed(1)}
          <span className="sr-only"> out of 5</span>
          {typeof count === "number" && (
            <>
              {" "}
              <span className="text-charcoal-400">({count})</span>
            </>
          )}
        </span>
      )}
    </div>
  );
}
