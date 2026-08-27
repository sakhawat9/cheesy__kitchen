import Image from "next/image";
import Link from "next/link";
import { MdArrowForward } from "react-icons/md";
import { formatPrice } from "../../utils/format";
import FoodCard from "../menu/FoodCard";
import Rating from "../ui/Rating";

/**
 * The chef's picks: an editorial panel beside the dishes in that edit.
 *
 * Layout notes — the old FeaturedFoods band put a centred heading above a
 * three-card row and a stray `<button><a>` "View All Food" underneath, and it
 * reused the very same LatestFood cards rendered a few hundred pixels above in
 * the same page. Two changes fix both:
 *
 *  - the panel is a grid item that stretches to the height of the dish grid
 *    (copy is overlaid on the image rather than stacked under it), so the two
 *    columns always end level whatever the dish count
 *  - the panel features one dish as the chef's pick and the grid shows the
 *    *rest* of the edit, so no photo appears twice
 *
 * The grid is topped up with a "view all" tile, which keeps its shape even
 * when the edit has an odd number of remaining dishes.
 */
export default function ChefsTable({ foods = [] }: any) {
  if (foods.length === 0) return null;

  // Highest-rated dish leads the edit; the rest fill the grid.
  const [pick, ...rest] = [...foods].sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
  const grid = rest.slice(0, 3);
  const lowest = Math.min(...foods.map((food: any) => food.price));

  return (
    <section className="section" aria-labelledby="chefs-table-heading">
      <div className="container">
        <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
          {/* Editorial panel — stretches to match the dish grid's height. */}
          <article className="relative overflow-hidden lg:col-span-5 rounded-card bg-charcoal-900 min-h-[30rem]">
            <Image
              src={pick.image}
              alt=""
              fill
              sizes="(max-width: 1024px) 92vw, 40vw"
              className="object-cover"
            />

            {/* Two layers, because a bottom-anchored gradient alone only works
                while the panel is tall. On narrow screens the panel is short
                and the copy reaches the top of the image, where a single
                gradient has almost no opacity. The flat scrim guarantees
                contrast at any height; the gradient still gives the photo
                depth below it. */}
            <div aria-hidden="true" className="absolute inset-0 bg-charcoal-950/55" />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/60 to-transparent"
            />

            <div className="relative flex flex-col justify-end h-full p-7 sm:p-9">
              <p className="mb-3 eyebrow text-ember-400">The chef&apos;s table</p>

              <h2 id="chefs-table-heading" className="mb-4 text-white">
                What we&apos;d order ourselves
              </h2>

              <p className="max-w-sm mb-6 text-cream-400">
                A handful of dishes the kitchen is proudest of — the ones we put
                in front of friends when they ask what&apos;s good.
              </p>

              {/* Facts pulled from the menu, so the copy can't go stale. */}
              <dl className="flex flex-wrap pt-5 mb-6 border-t gap-x-8 gap-y-3 border-white/15">
                <div>
                  <dt className="text-xs tracking-wide uppercase text-charcoal-300">
                    In this edit
                  </dt>
                  <dd className="mt-0.5 font-semibold text-white">
                    {foods.length} {foods.length === 1 ? "dish" : "dishes"}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs tracking-wide uppercase text-charcoal-300">
                    Starting at
                  </dt>
                  <dd className="mt-0.5 font-semibold text-white">
                    {formatPrice(lowest)}
                  </dd>
                </div>
              </dl>

              {/* Chef's pick — a concrete entry point rather than a bare
                  "view all", and it names the dish shown in the photo. */}
              <Link
                href={`/foods/${pick.slug}`}
                className="flex items-center gap-4 p-3 mb-4 transition-colors border rounded-card group border-white/15 bg-white/5 hover:bg-white/10"
              >
                <div className="relative overflow-hidden rounded w-14 h-14 shrink-0">
                  <Image
                    src={pick.image}
                    alt=""
                    fill
                    sizes="56px"
                    className="object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-xs tracking-wide uppercase text-ember-400">
                    Chef&apos;s pick
                  </p>
                  <p className="font-semibold text-white truncate">{pick.name}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <Rating value={pick.rating ?? 0} showValue={false} />
                    <span className="text-sm text-cream-400">
                      {formatPrice(pick.price)}
                    </span>
                  </div>
                </div>

                <MdArrowForward
                  className="w-5 h-5 transition-transform text-white/60 shrink-0 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
            </div>
          </article>

          {/* Dishes in the edit */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
              {grid.map((food: any) => (
                <FoodCard key={food._id} food={food} />
              ))}

              {/* Deliberately a solid tile, not a dashed one — dashed borders
                  mean "empty state" everywhere else in this design system, so
                  a dashed CTA here read as unfinished rather than clickable. */}
              <Link
                href="/foods"
                className="flex flex-col items-center justify-center gap-3 p-6 text-center transition-colors border group rounded-card border-cream-300 bg-cream-200/60 hover:bg-ember-50 hover:border-ember-400 min-h-[14rem]"
              >
                <span className="flex items-center justify-center w-12 h-12 text-white transition-colors rounded-full bg-charcoal-900 group-hover:bg-ember-600">
                  <MdArrowForward
                    className="w-5 h-5 transition-transform group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </span>
                <span className="font-semibold text-charcoal-900">
                  See the whole menu
                </span>
                <span className="text-sm text-charcoal-500">
                  Everything we&apos;re cooking, from {formatPrice(lowest)}
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
