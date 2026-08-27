import Image from "next/image";
import Link from "next/link";
import { MdArrowForward } from "react-icons/md";
import { CATEGORIES } from "../menu/categories";
import SectionHeading from "../ui/SectionHeading";

/**
 * Category entry points.
 *
 * The old version was a react-slick carousel of six circular thumbnails with
 * `centerMode` and 200px of centre padding, which clipped the outer tiles at
 * most widths. Two of its six tiles pointed at categories no dish belonged to.
 *
 * Counts here are computed from the menu that's actually rendered, and each
 * tile borrows a real photo from a dish in its category, so nothing can drift
 * out of sync with the data.
 */
export default function CategoryShowcase({ foods = [] }: any) {
  const withCounts = CATEGORIES.map((category) => {
    const dishes = foods.filter((food: any) => food.category === category.slug);
    return { ...category, count: dishes.length, image: dishes[0]?.image };
  }).filter((category) => category.count > 0);

  if (withCounts.length === 0) return null;

  return (
    <section className="section">
      <div className="container">
        <SectionHeading
          eyebrow="The menu"
          title="Start with what you're hungry for"
          description="Four things, done properly, rather than forty done adequately."
        />

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 sm:gap-6">
          {withCounts.map((category, index) => (
            <Link
              key={category.slug}
              href={`/category/${category.slug}`}
              className="relative flex flex-col justify-end overflow-hidden transition-shadow duration-200 group aspect-[4/5] rounded-card bg-charcoal-800 hover:shadow-lift"
            >
              <Image
                src={category.image}
                alt=""
                fill
                sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 24vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                priority={index < 2}
              />

              {/* Gradient rather than a flat 50% black overlay: keeps the food
                  photography appetising while the label stays legible. */}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-charcoal-950/90 via-charcoal-950/30 to-transparent"
              />

              {/* Name and count only. These tiles are a quarter of the row
                  wide, and clamping the category blurb into them left two
                  cramped lines of small type fighting the photograph behind
                  it. The blurb belongs on /category, where the tiles are
                  twice the size. */}
              <div className="relative p-5">
                <h3 className="mb-1 text-white text-h4">{category.name}</h3>
                <p className="flex items-center gap-1.5 text-sm text-cream-400">
                  {category.count} {category.count === 1 ? "dish" : "dishes"}
                  <MdArrowForward
                    className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
