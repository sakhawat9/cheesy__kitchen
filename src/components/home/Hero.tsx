import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { MdArrowForward, MdChevronLeft, MdChevronRight } from "react-icons/md";
import { formatPrice } from "../../utils/format";

const ROTATE_MS = 6000;

/**
 * Featured-dish hero.
 *
 * Three problems with the original are fixed here:
 *
 *  1. It stretched a bare <img> full-bleed with copy absolutely positioned on
 *     top, and every slide printed the same "Welcome Cheesy__kitchen" heading
 *     regardless of which dish was showing — so the <h1> was duplicated once
 *     per slide. This is a split layout that reflows, and the dish's own name
 *     is the heading.
 *
 *  2. react-multi-carousel derives slide widths by measuring its container on
 *     mount and needs an explicit `deviceType` to render anything during SSR.
 *     At narrow viewports that measurement collapsed the hero to a bare strip.
 *     Slides here are plain stacked elements toggled by opacity, so the height
 *     comes from the content and never depends on JS measurement.
 *
 *  3. It also shipped a module-level `images` array of five URLs pointing at a
 *     third-party WordPress demo site, which nothing rendered.
 */
export default function Hero({ foods = [] }: any) {
  const featured = foods.filter((food: any) => food?.prichard === true);
  const slides = featured.length > 0 ? featured : foods.slice(0, 3);

  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const count = slides.length;
  const go = useCallback((next: number) => setIndex((next + count) % count), [count]);

  useEffect(() => {
    if (count < 2 || paused) return undefined;
    const timer = setInterval(() => setIndex((i) => (i + 1) % count), ROTATE_MS);
    return () => clearInterval(timer);
  }, [count, paused]);

  if (count === 0) return null;

  return (
    <section
      aria-label="Featured dishes"
      aria-roledescription="carousel"
      className="relative bg-charcoal-900"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="container">
        <div className="relative">
          {slides.map((food: any, i: number) => (
            <Slide
              key={food._id}
              food={food}
              active={i === index}
              // The first slide holds the layout height; the rest are stacked
              // on top of it and faded in.
              stacked={i !== 0}
              position={`${i + 1} of ${count}`}
              priority={i === 0}
            />
          ))}
        </div>
      </div>

      {count > 1 && (
        <div className="absolute left-0 right-0 flex items-center justify-center gap-3 bottom-5">
          <button
            type="button"
            onClick={() => go(index - 1)}
            aria-label="Previous featured dish"
            className="flex items-center justify-center transition-colors border rounded-full w-9 h-9 border-white/25 text-white/70 hover:bg-white hover:text-charcoal-900"
          >
            <MdChevronLeft className="w-5 h-5" aria-hidden="true" />
          </button>

          <div className="flex items-center gap-2">
            {slides.map((food: any, i: number) => (
              /* The visible dot stays small, but the button itself is a
                 24px-tall target — bare 8px dots are below the minimum touch
                 size and near-impossible to hit on a phone. */
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
                  className={`block h-2 transition-all rounded-full ${
                    i === index
                      ? "w-6 bg-ember-500"
                      : "w-2 bg-white/30 group-hover:bg-white/60"
                  }`}
                />
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => go(index + 1)}
            aria-label="Next featured dish"
            className="flex items-center justify-center transition-colors border rounded-full w-9 h-9 border-white/25 text-white/70 hover:bg-white hover:text-charcoal-900"
          >
            <MdChevronRight className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>
      )}
    </section>
  );
}

function Heading({ active, className, children }: any) {
  return active ? (
    <h1 className={className}>{children}</h1>
  ) : (
    <p className={`font-bold font-heading ${className}`} aria-hidden="true">
      {children}
    </p>
  );
}

function Slide({ food, active, stacked, position, priority }: any) {
  return (
    <div
      role="group"
      aria-roledescription="slide"
      aria-label={`${food.name}, ${position}`}
      aria-hidden={!active}
      // Inactive slides are inert: no pointer events and no tab stops, so the
      // hidden CTAs can't be reached by keyboard.
      inert={!active || undefined}
      className={`transition-opacity duration-500 ${
        stacked ? "absolute inset-0" : ""
      } ${active ? "opacity-100" : "opacity-0 pointer-events-none"}`}
    >
      <div className="grid items-center gap-8 py-14 md:py-20 lg:py-24 md:grid-cols-2 lg:gap-16">
        <div className="order-2 md:order-1">
          <p className="mb-4 eyebrow text-ember-400">On the pass tonight</p>

          {/* Only the visible slide contributes an <h1>: the carousel keeps
              every slide in the DOM, so rendering all of them as <h1> gave the
              homepage three competing top-level headings. */}
          <Heading active={active} className="mb-4 text-white text-display">
            {food.name}
          </Heading>

          <p className="max-w-md mb-6 leading-relaxed text-cream-400 md:text-lg">
            {food.shortDesc}
          </p>

          <p className="flex items-baseline gap-3 mb-8">
            <span className="text-2xl font-semibold text-white">
              {formatPrice(food.price)}
            </span>
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <Link href={`/foods/${food.slug}`} className="btn btn-accent btn-lg">
              See the dish
              <MdArrowForward className="w-5 h-5" aria-hidden="true" />
            </Link>
            <Link href="/foods" className="btn btn-on-dark btn-lg">
              Full menu
            </Link>
          </div>
        </div>

        <div className="order-1 md:order-2">
          <div className="relative overflow-hidden aspect-[4/3] rounded-card bg-charcoal-800">
            <Image
              src={food.image}
              alt={food.name}
              fill
              sizes="(max-width: 768px) 92vw, 46vw"
              className="object-cover"
              priority={priority}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
