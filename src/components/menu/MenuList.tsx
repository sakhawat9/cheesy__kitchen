import Link from "next/link";
import { formatPrice } from "../../utils/format";

/**
 * A printed restaurant menu: dish name, a dotted leader, then the price.
 *
 * This is the site's signature pattern and the reason the menu doesn't read
 * like a product grid. The leader is a repeating radial-gradient on a flexible
 * element, so it stretches to fill whatever space is left between the name and
 * the price at any width — no fixed dot counts, no overflow.
 *
 * The whole row is one link. The name and price are `<span>`s inside it rather
 * than separate links, so a screen reader announces "Margherita Italiana, $80"
 * as a single target.
 */
export default function MenuList({ items = [], dark = false, className = "" }: any) {
  if (items.length === 0) return null;

  return (
    <ul className={`space-y-7 ${className}`}>
      {items.map((item: any) => (
        <li key={item._id}>
          <Link
            href={`/foods/${item.slug}`}
            className={`block group ${dark ? "" : ""}`}
          >
            <span className={`menu-row ${dark ? "menu-row--dark" : ""}`}>
              <span className="menu-row__name">{item.name}</span>
              <span aria-hidden="true" className="menu-row__leader" />
              <span className="menu-row__price">{formatPrice(item.price)}</span>
            </span>

            {item.shortDesc && (
              <span
                className={`block mt-1.5 text-sm leading-relaxed max-w-xl ${
                  dark ? "text-oat-400" : "text-espresso-500"
                }`}
              >
                {item.shortDesc}
              </span>
            )}
          </Link>
        </li>
      ))}
    </ul>
  );
}
