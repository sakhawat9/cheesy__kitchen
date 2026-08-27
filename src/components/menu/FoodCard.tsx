import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { MdOutlineAdd } from "react-icons/md";
import { categoryLabel } from "../../utils/format";
import { useCart } from "../../utils/useCart";
import Price from "../ui/Price";
import Rating from "../ui/Rating";

/**
 * The dish card, used by the homepage, menu, category pages, search and
 * related dishes. It replaces four near-identical components (LatestFood,
 * FeaturedFood, SearchCourse and a `Card` copy-pasted into all six category
 * pages) that each hardcoded their own markup and add-to-cart handler.
 *
 * Key fixes over the originals:
 *  - fixed 4:3 image ratio, so cards in a grid always line up; the old cards
 *    used unconstrained <img> and every row was a different height
 *  - the whole card is one link target via a stretched overlay, while the
 *    add-to-basket button stays separately focusable. The old cards wrapped a
 *    <Link> inside a <button> (invalid) and fired add-to-cart on view clicks
 *  - dish names wrap and clamp instead of overflowing the card
 */
export default function FoodCard({ food, priority = false }: any) {
  const { name, slug, image, price, shortDesc, rating = 0, countInStock = 0, category } =
    food;

  const { addToCart, pending } = useCart();
  const [imageFailed, setImageFailed] = useState(false);

  const soldOut = countInStock <= 0;
  const busy = pending === `cart-${food._id}`;

  return (
    <article className="relative flex flex-col h-full overflow-hidden transition-shadow duration-200 bg-white border group rounded-card border-cream-300 hover:shadow-lift">
      <div className="relative overflow-hidden aspect-[4/3] bg-cream-100">
        {imageFailed ? (
          // Dishes whose remote photo 404s previously showed the browser's
          // broken-image glyph and collapsed the card's height.
          <div className="flex items-center justify-center w-full h-full text-sm text-charcoal-300">
            Photo unavailable
          </div>
        ) : (
          <Image
            src={image}
            alt={name}
            fill
            sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            onError={() => setImageFailed(true)}
            priority={priority}
          />
        )}

        {soldOut && (
          <span className="absolute badge badge-neutral top-3 left-3">
            Sold out today
          </span>
        )}
      </div>

      <div className="flex flex-col flex-1 p-5">
        {category && (
          <p className="mb-1.5 text-xs font-medium tracking-wide uppercase text-charcoal-400">
            {categoryLabel(category)}
          </p>
        )}

        <h3 className="mb-2 text-base font-semibold leading-snug line-clamp-2">
          {/* Stretched link: makes the whole card clickable without wrapping
              the add button in an anchor. */}
          <Link
            href={`/foods/${slug}`}
            className="transition-colors after:absolute after:inset-0 after:content-[''] hover:text-ember-700"
          >
            {name}
          </Link>
        </h3>

        {shortDesc && (
          <p className="mb-3 text-sm leading-relaxed text-charcoal-500 line-clamp-2">
            {shortDesc}
          </p>
        )}

        <Rating value={rating} size="sm" className="mb-4" />

        <div className="flex items-end justify-between gap-3 mt-auto">
          <Price price={price} />

          <button
            type="button"
            onClick={() => addToCart(food)}
            disabled={soldOut || busy}
            aria-label={`Add ${name} to your basket`}
            className="relative z-10 btn-icon btn-icon-sm"
          >
            <MdOutlineAdd className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </article>
  );
}
