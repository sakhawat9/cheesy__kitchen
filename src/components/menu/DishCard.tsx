import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { LuPlus } from "react-icons/lu";
import { categoryLabel, formatPrice } from "../../utils/format";
import { useCart } from "../../utils/useCart";
import Rating from "../ui/Rating";

/**
 * The dish card.
 *
 * Borderless and frameless: the photograph sits in a deep-radius panel and the
 * text sits on the page beneath it, so a grid of these reads as a set of
 * plates rather than a row of boxed products. The add button is a chilli disc
 * that overlaps the bottom edge of the photograph — a single, obvious tap
 * target that also stops the image and the caption reading as two things.
 *
 * The whole card is one link target via a stretched overlay, while the add
 * button stays separately focusable, so there are no nested interactives.
 */
export default function DishCard({ food, priority = false }: any) {
  const { name, slug, image, price, shortDesc, rating = 0, countInStock = 0, category } =
    food;

  const { addToCart, pending } = useCart();
  const [imageFailed, setImageFailed] = useState(false);

  const soldOut = countInStock <= 0;
  const busy = pending === `cart-${food._id}`;

  return (
    <article className="relative flex flex-col h-full group">
      <div className="relative mb-5 overflow-hidden aspect-[4/3] rounded-panel bg-oat-200">
        {imageFailed ? (
          <div className="flex items-center justify-center w-full h-full text-sm text-espresso-400">
            Photo unavailable
          </div>
        ) : (
          <Image
            src={image}
            alt={name}
            fill
            sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
            className="object-cover transition-transform duration-[900ms] ease-out-soft group-hover:scale-105"
            onError={() => setImageFailed(true)}
            priority={priority}
          />
        )}

        {soldOut && (
          <span className="absolute tag tag-on-dark top-4 left-4">Sold out today</span>
        )}

        {/* Add-to-basket disc, overlapping the photograph's lower edge. */}
        <button
          type="button"
          onClick={() => addToCart(food)}
          disabled={soldOut || busy}
          aria-label={`Add ${name} to your basket`}
          className="absolute z-10 flex items-center justify-center transition-all duration-300 rounded-full shadow-lg bottom-4 right-4 w-11 h-11 bg-chilli-600 text-oat-50 hover:bg-chilli-700 hover:scale-110 disabled:opacity-40 disabled:hover:scale-100 disabled:cursor-not-allowed"
        >
          <LuPlus
            className={`w-5 h-5 transition-transform ${busy ? "animate-spin" : ""}`}
            aria-hidden="true"
          />
        </button>
      </div>

      <div className="flex flex-col flex-1">
        {category && (
          <p className="mb-2 label">{categoryLabel(category)}</p>
        )}

        <h3 className="mb-2 text-2xl leading-tight">
          <Link
            href={`/foods/${slug}`}
            className="transition-colors after:absolute after:inset-0 after:content-[''] hover:text-chilli-600"
          >
            {name}
          </Link>
        </h3>

        {shortDesc && (
          <p className="mb-4 text-sm leading-relaxed text-espresso-500 line-clamp-2">
            {shortDesc}
          </p>
        )}

        <div className="flex items-center justify-between gap-4 pt-4 mt-auto border-t border-espresso-200/50">
          <p className="text-xl font-semibold font-display text-chilli-600 tabular-nums">
            {formatPrice(price)}
          </p>
          <Rating value={rating} showValue={false} />
        </div>
      </div>
    </article>
  );
}
