import Image from "next/image";
import Link from "next/link";
import { LuArrowUpRight } from "react-icons/lu";
import { categoryLabel, formatPrice } from "../../utils/format";
import Rating from "../ui/Rating";
import Reveal from "../ui/Reveal";
import SectionIntro from "../ui/SectionIntro";

/**
 * The kitchen's signature dishes.
 *
 * Presented as large alternating editorial rows — photograph one side, a
 * numeral and the dish's story the other — rather than a grid of uniform
 * cards. With a handful of dishes worth singling out, giving each one a full
 * band lets the photography do the selling and keeps this section from
 * duplicating the menu grid further down the page.
 */
export default function SignatureDishes({ foods = [] }: any) {
  const dishes = foods.slice(0, 3);
  if (dishes.length === 0) return null;

  return (
    <section className="section surface-cream">
      <div className="container">
        <SectionIntro
          label="Signature plates"
          title="The ones we're known for"
          description="Three dishes the kitchen would put in front of anyone who asked what's good."
          align="center"
          className="mb-16 sm:mb-20"
        />

        <div className="space-y-16 lg:space-y-24">
          {dishes.map((dish: any, index: number) => {
            const flipped = index % 2 === 1;

            return (
              <Reveal key={dish._id}>
                <article className="grid items-center gap-8 lg:grid-cols-12 lg:gap-14">
                  {/* Photograph */}
                  <div
                    className={`lg:col-span-7 ${
                      flipped ? "lg:order-2" : ""
                    }`}
                  >
                    <Link
                      href={`/foods/${dish.slug}`}
                      className="relative block overflow-hidden group aspect-[16/11] rounded-panel bg-oat-200"
                      tabIndex={-1}
                      aria-hidden="true"
                    >
                      <Image
                        src={dish.image}
                        alt=""
                        fill
                        sizes="(max-width: 1024px) 92vw, 55vw"
                        className="object-cover transition-transform duration-[900ms] ease-out-soft group-hover:scale-105"
                      />
                    </Link>
                  </div>

                  {/* Copy */}
                  <div className={`lg:col-span-5 ${flipped ? "lg:order-1" : ""}`}>
                    <div className="flex items-center gap-4 mb-5">
                      <span
                        aria-hidden="true"
                        className="text-5xl leading-none font-display text-saffron-400"
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="field-label">{categoryLabel(dish.category)}</span>
                    </div>

                    <h3 className="text-display text-espresso-900">
                      <Link
                        href={`/foods/${dish.slug}`}
                        className="transition-colors hover:text-chilli-600"
                      >
                        {dish.name}
                      </Link>
                    </h3>

                    <p className="mt-4 leading-relaxed text-espresso-500">
                      {dish.shortDesc}
                    </p>

                    <div className="flex flex-wrap items-center gap-6 mt-6">
                      <p className="text-3xl font-semibold font-display text-chilli-600">
                        {formatPrice(dish.price)}
                      </p>
                      <Rating value={dish.rating ?? 0} />
                    </div>

                    <Link
                      href={`/foods/${dish.slug}`}
                      className="inline-flex items-center gap-2 mt-8 text-sm font-medium uppercase tracking-[0.14em] text-espresso-900 link-wipe"
                    >
                      See the dish
                      <LuArrowUpRight className="w-4 h-4" aria-hidden="true" />
                    </Link>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
