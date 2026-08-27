import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { LuChevronDown } from "react-icons/lu";
import { formatPrice } from "../../utils/format";

const ROTATE_MS = 7000;

/**
 * Full-bleed photographic hero.
 *
 * The whole viewport is the food. A slow ken-burns drift keeps the plate alive
 * without asking anything of the reader, the headline is fixed brand copy
 * rather than a dish name (so it reads as a restaurant, not a product page),
 * and the rotating dish is credited in a small card at the bottom corner —
 * which doubles as the link into that dish.
 *
 * Slides are stacked and cross-faded rather than measured by a carousel
 * library: the height comes from the layout, so nothing can collapse before
 * JS runs.
 */
export default function Hero({ foods = [] }: any) {
  const featured = foods.filter((food: any) => food?.prichard === true);
  const slides = (featured.length > 0 ? featured : foods).slice(0, 4);

  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const count = slides.length;
  const go = useCallback((next: number) => setIndex((next + count) % count), [count]);

  useEffect(() => {
    if (count < 2 || paused) return undefined;
    const timer = setInterval(() => setIndex((i) => (i + 1) % count), ROTATE_MS);
    return () => clearInterval(timer);
  }, [count, paused]);

  const current = slides[index];

  return (
    <section
      aria-label="Welcome"
      className="relative flex flex-col justify-end min-h-[100svh] overflow-hidden bg-espresso-950 on-dark"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      {/* Photography */}
      <div aria-hidden="true" className="absolute inset-0">
        {slides.map((food: any, i: number) => (
          <div
            key={food._id}
            className={`absolute inset-0 transition-opacity duration-[1200ms] ease-out-soft ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={food.image}
              alt=""
              fill
              sizes="100vw"
              priority={i === 0}
              className="object-cover animate-kenburns"
            />
          </div>
        ))}

        {/* Scrims are weighted to the left, where the copy sits, rather than
            flooding the whole frame. A flat 55% wash made the headline safe but
            left the food looking grey — which is the one thing a restaurant
            hero cannot afford. The photograph stays bright on the right. */}
        <div className="absolute inset-0 bg-gradient-to-r from-espresso-950/95 via-espresso-950/60 to-espresso-950/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-espresso-950 via-transparent to-espresso-950/45" />
      </div>

      <div className="container relative pb-16 pt-32 sm:pb-20">
        <div className="max-w-3xl">
          <p className="mb-6 label-rule text-saffron-400">
            Kitchen open daily &middot; Dhaka
          </p>

          <h1 className="text-hero text-oat-50">
            Four things,
            <br />
            <em className="italic font-normal text-saffron-400">cooked properly.</em>
          </h1>

          <p className="max-w-lg mt-7 text-lg leading-relaxed sm:text-xl text-oat-300">
            Burgers smashed to order, dough proved for forty-eight hours and
            chickens brined overnight. A short menu, because a long one is a lie.
          </p>

          {/* Equal-width on a phone: two pills of different lengths stacked
              on top of each other read as untidy rather than as a pair. */}
          <div className="grid max-w-md gap-3 mt-10 sm:flex sm:max-w-none sm:flex-wrap sm:items-center sm:gap-4">
            <Link href="/foods" className="btn btn-order btn-lg">
              Explore the menu
            </Link>
            <Link href="/aboutUs" className="btn btn-line-light btn-lg">
              Our story
            </Link>
          </div>
        </div>
      </div>

      {/* Now-serving card: credits the photograph and links into the dish. */}
      {current && (
        <div className="container relative pb-10">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <Link
              href={`/foods/${current.slug}`}
              className="inline-flex items-center gap-4 p-2 pr-6 transition-colors border rounded-full group border-white/15 bg-white/5 hover:bg-white/10 backdrop-blur-sm max-w-full"
            >
              <span className="relative w-12 h-12 overflow-hidden rounded-full shrink-0">
                <Image
                  src={current.image}
                  alt=""
                  fill
                  sizes="48px"
                  className="object-cover"
                />
              </span>
              <span className="min-w-0">
                <span className="block text-[0.625rem] uppercase tracking-[0.2em] text-saffron-400">
                  On the pass
                </span>
                <span className="block text-base truncate font-display text-oat-100">
                  {current.name}
                  <span className="ml-2 text-saffron-400">
                    {formatPrice(current.price)}
                  </span>
                </span>
              </span>
            </Link>

            {count > 1 && (
              <div className="flex items-center gap-3">
                {slides.map((food: any, i: number) => (
                  <button
                    key={food._id}
                    type="button"
                    onClick={() => go(i)}
                    aria-label={`Show ${food.name}`}
                    aria-current={i === index}
                    className="flex items-center justify-center w-6 h-6 group"
                  >
                    <span
                      aria-hidden="true"
                      className={`block h-1.5 rounded-full transition-all duration-500 ${
                        i === index
                          ? "w-8 bg-saffron-400"
                          : "w-1.5 bg-oat-100/40 group-hover:bg-oat-100/70"
                      }`}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Scroll cue */}
      <a
        href="#story"
        aria-label="Skip to the story"
        className="absolute z-10 hidden -translate-x-1/2 left-1/2 bottom-4 text-oat-100/50 hover:text-oat-100 transition-colors md:block"
      >
        <LuChevronDown className="w-6 h-6 animate-bounce" aria-hidden="true" />
      </a>
    </section>
  );
}
