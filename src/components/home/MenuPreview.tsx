import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { CATEGORIES } from "../menu/categories";
import MenuList from "../menu/MenuList";
import Reveal from "../ui/Reveal";
import SectionIntro from "../ui/SectionIntro";

/**
 * The menu, on the dark ground, laid out the way a menu is laid out.
 *
 * Categories are tabs rather than a filter dropdown — with four of them it's
 * one tap to any course, and the whole list stays on screen. The photograph
 * beside it swaps to the first dish of whichever category is showing, so the
 * band always has something appetising in it.
 *
 * Categories with no dishes behind them are never offered.
 */
export default function MenuPreview({ foods = [] }: any) {
  const available = CATEGORIES.filter((category) =>
    foods.some((food: any) => food.category === category.slug),
  );

  const [active, setActive] = useState(available[0]?.slug ?? "");

  if (available.length === 0) return null;

  const items = foods.filter((food: any) => food.category === active);
  const category = available.find((entry) => entry.slug === active);
  const photo = items[0]?.image;

  return (
    <section className="section surface-dark on-dark">
      <div className="container">
        <SectionIntro
          label="The menu"
          title="Everything we're cooking"
          description="Short by design, prepped fresh each morning, and changed only when something earns its place."
          align="center"
          dark
          className="mb-12 sm:mb-16"
        />

        {/* Category tabs */}
        <Reveal className="flex flex-wrap justify-center gap-2 mb-14">
          {available.map((entry) => {
            const selected = entry.slug === active;
            return (
              <button
                key={entry.slug}
                type="button"
                onClick={() => setActive(entry.slug)}
                aria-pressed={selected}
                className={`px-6 py-2.5 text-label font-medium uppercase rounded-full border transition-all duration-300 ${
                  selected
                    ? "bg-saffron-500 border-saffron-500 text-espresso-950"
                    : "border-white/15 text-oat-300 hover:border-saffron-500/60 hover:text-oat-100"
                }`}
              >
                {entry.name}
              </button>
            );
          })}
        </Reveal>

        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16 lg:items-start">
          {/* Photograph of the selected category */}
          <Reveal className="lg:col-span-5">
            <div className="relative overflow-hidden aspect-[4/5] rounded-panel bg-espresso-800">
              {photo && (
                <Image
                  key={photo}
                  src={photo}
                  alt=""
                  fill
                  sizes="(max-width: 1024px) 90vw, 40vw"
                  className="object-cover duration-700 animate-rise"
                />
              )}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-espresso-950/80 to-transparent"
              />
              <div className="absolute inset-x-0 bottom-0 p-7">
                <p className="mb-1 text-2xl font-display text-oat-50">
                  {category?.name}
                </p>
                <p className="text-sm leading-relaxed text-oat-400">
                  {category?.blurb}
                </p>
              </div>
            </div>
          </Reveal>

          {/* The list */}
          <div className="lg:col-span-7">
            <MenuList key={active} items={items} dark />

            <div className="pt-10 mt-10 border-t border-white/10">
              <Link href="/foods" className="btn btn-line-light">
                See the full menu
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
