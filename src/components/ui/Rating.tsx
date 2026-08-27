import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";

/**
 * Star rating rendered from a real `rating` value, in saffron.
 *
 * Stars are decorative (`aria-hidden`) and the value is exposed once as text.
 * Half stars matter because most dishes sit on x.5: rounding 4.5 up drew five
 * solid stars beside the label "4.5", which read as a contradiction.
 */
export default function Rating({
  value = 0,
  count,
  size = "sm",
  showValue = true,
  dark = false,
  className = "",
}: any) {
  const rating = Number(value) || 0;
  const starSize = size === "lg" ? "w-4 h-4" : "w-3.5 h-3.5";

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span
        className={`flex gap-0.5 ${dark ? "text-saffron-400" : "text-saffron-500"}`}
        aria-hidden="true"
      >
        {Array.from({ length: 5 }, (_, i) => {
          const position = i + 1;
          if (rating >= position) return <BsStarFill key={i} className={starSize} />;
          if (rating >= position - 0.75)
            return <BsStarHalf key={i} className={starSize} />;
          return (
            <BsStar
              key={i}
              className={`${starSize} ${dark ? "text-espresso-600" : "text-espresso-300"}`}
            />
          );
        })}
      </span>

      {showValue && (
        <span className={`text-sm ${dark ? "text-oat-400" : "text-espresso-500"}`}>
          <span className="sr-only">Rated </span>
          {rating.toFixed(1)}
          <span className="sr-only"> out of 5</span>
          {typeof count === "number" && (
            <>
              {" "}
              <span className={dark ? "text-espresso-500" : "text-espresso-400"}>
                ({count})
              </span>
            </>
          )}
        </span>
      )}
    </div>
  );
}
