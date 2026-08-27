import { useCallback, useEffect, useRef, useState } from "react";
import { LuArrowLeft, LuArrowRight, LuInfo, LuQuote } from "react-icons/lu";
import Link from "next/link";
import Rating from "../ui/Rating";
import Reveal from "../ui/Reveal";
import SectionIntro from "../ui/SectionIntro";

/**
 * Customer reviews.
 *
 * Real reviews — anything submitted through /review-form and stored against
 * the reviews collection — are rendered with the guest's name and, where the
 * record has one, their avatar.
 *
 * When there are none, the section still renders, because a restaurant page
 * with a hole where the reviews go looks broken. What it renders instead is
 * clearly-labelled sample scaffolding: a notice saying no reviews have been
 * left yet, cards tagged "Sample", and placeholder copy that describes itself
 * rather than imitating a customer. Nothing here should ever be mistaken for
 * feedback a real person gave — the moment one real review exists, all of it
 * is replaced.
 *
 * The carousel is native scroll-snap rather than a carousel library: it swipes
 * correctly on touch for free, keeps every card in the accessibility tree, and
 * needs no JS to be usable.
 */
const SAMPLE_REVIEWS = [
  {
    _id: "sample-1",
    name: "Guest name appears here",
    description:
      "This card shows how a guest review will look. When someone leaves a review through the review form, their words replace this placeholder text automatically.",
  },
  {
    _id: "sample-2",
    name: "Guest name appears here",
    description:
      "Reviews are shown newest first. Each one displays the rating, the review itself, and the name on the account that left it.",
  },
  {
    _id: "sample-3",
    name: "Guest name appears here",
    description:
      "Nothing on this page is written on a customer's behalf. Until real reviews come in, these three sample cards stand in for them.",
  },
];

export default function Reviews({ reviews = [] }: any) {
  const hasReal = reviews.length > 0;
  const items = hasReal ? reviews : SAMPLE_REVIEWS;

  const trackRef = useRef<HTMLUListElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const syncArrows = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    setAtStart(track.scrollLeft <= 4);
    setAtEnd(track.scrollLeft + track.clientWidth >= track.scrollWidth - 4);
  }, []);

  useEffect(() => {
    syncArrows();
    const track = trackRef.current;
    if (!track) return undefined;
    track.addEventListener("scroll", syncArrows, { passive: true });
    window.addEventListener("resize", syncArrows);
    return () => {
      track.removeEventListener("scroll", syncArrows);
      window.removeEventListener("resize", syncArrows);
    };
  }, [syncArrows]);

  const scrollBy = (direction: number) => {
    const track = trackRef.current;
    if (!track) return;
    // One card plus its gap, so a click always lands on a snap point.
    const card = track.querySelector("li");
    const step = card ? card.clientWidth + 24 : track.clientWidth * 0.8;
    track.scrollBy({ left: step * direction, behavior: "smooth" });
  };

  const showArrows = items.length > 1;

  return (
    <section className="section bg-oat-200" aria-labelledby="reviews-heading">
      <div className="container">
        <div className="flex flex-col gap-8 mb-12 lg:flex-row lg:items-end lg:justify-between">
          <SectionIntro
            label="Guest book"
            title="What people say after eating"
            as="h2"
            className="mb-0"
          />

          {showArrows && (
            <Reveal delay={100} className="flex gap-3 shrink-0">
              <button
                type="button"
                onClick={() => scrollBy(-1)}
                disabled={atStart}
                aria-label="Previous reviews"
                className="btn-icon disabled:opacity-30"
              >
                <LuArrowLeft className="w-5 h-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => scrollBy(1)}
                disabled={atEnd}
                aria-label="Next reviews"
                className="btn-icon disabled:opacity-30"
              >
                <LuArrowRight className="w-5 h-5" aria-hidden="true" />
              </button>
            </Reveal>
          )}
        </div>

        {/* Honest about what's on screen when nothing has been left yet. */}
        {!hasReal && (
          <Reveal>
            <p
              className="flex items-start gap-3 p-4 mb-10 text-sm border border-dashed rounded-card border-espresso-300 text-espresso-600 bg-oat-100"
              role="status"
            >
              <LuInfo
                className="w-5 h-5 mt-0.5 shrink-0 text-saffron-600"
                aria-hidden="true"
              />
              <span>
                <strong className="font-medium text-espresso-800">
                  No guest reviews yet.
                </strong>{" "}
                The cards below are sample placeholders showing how reviews will
                appear — they are not real customer feedback.{" "}
                <Link href="/review-form" className="link">
                  Be the first to leave one
                </Link>
                .
              </span>
            </p>
          </Reveal>
        )}

        <h2 id="reviews-heading" className="sr-only">
          {hasReal ? "Customer reviews" : "Sample customer reviews"}
        </h2>

        <Reveal delay={140}>
          <ul
            ref={trackRef}
            className="flex gap-6 pb-4 -mx-5 overflow-x-auto snap-x snap-mandatory scroll-px-5 px-5 sm:-mx-8 sm:px-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {items.map((review: any) => (
              <li
                key={review._id}
                className="snap-start shrink-0 w-[min(22rem,85vw)] lg:w-[26rem]"
              >
                <ReviewCard review={review} sample={!hasReal} />
              </li>
            ))}
          </ul>
        </Reveal>

        {hasReal && (
          <Reveal delay={200} className="flex justify-center mt-12">
            <Link href="/review-form" className="btn btn-line">
              Leave a review
            </Link>
          </Reveal>
        )}
      </div>
    </section>
  );
}

function ReviewCard({ review, sample }: any) {
  const [avatarFailed, setAvatarFailed] = useState(false);
  const initial = review.name?.trim()?.charAt(0)?.toUpperCase() ?? "?";

  return (
    <figure
      className={`flex flex-col h-full p-8 transition-shadow duration-300 rounded-panel bg-oat-50 hover:shadow-card ${
        sample ? "border border-dashed border-espresso-300" : ""
      }`}
    >
      <div className="flex items-start justify-between gap-4 mb-6">
        <LuQuote
          className="w-8 h-8 text-saffron-400 shrink-0"
          aria-hidden="true"
        />
        {sample ? (
          <span className="tag tag-neutral">Sample</span>
        ) : (
          <Rating value={5} showValue={false} />
        )}
      </div>

      <blockquote
        className={`flex-1 text-lg leading-relaxed font-display ${
          sample ? "text-espresso-400 italic" : "text-espresso-800"
        }`}
      >
        {sample ? review.description : `“${review.description}”`}
      </blockquote>

      <figcaption className="flex items-center gap-4 pt-6 mt-6 border-t border-espresso-200/60">
        <span className="flex items-center justify-center w-12 h-12 overflow-hidden rounded-full shrink-0 bg-oat-300 text-espresso-600">
          {!sample && review.img && !avatarFailed ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={review.img}
              alt=""
              className="object-cover w-full h-full"
              onError={() => setAvatarFailed(true)}
            />
          ) : (
            <span className="text-lg font-display" aria-hidden="true">
              {sample ? "—" : initial}
            </span>
          )}
        </span>

        <span>
          <span
            className={`block font-medium ${
              sample ? "text-espresso-400 italic" : "text-espresso-900"
            }`}
          >
            {review.name}
          </span>
          <span className="block text-xs uppercase tracking-[0.14em] text-espresso-400">
            {sample ? "Placeholder" : "Guest review"}
          </span>
        </span>
      </figcaption>
    </figure>
  );
}
