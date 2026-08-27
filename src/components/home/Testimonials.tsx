import { useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { BiUser } from "react-icons/bi";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import SectionHeading from "../ui/SectionHeading";

/**
 * Guest reviews carousel.
 *
 * The old configuration used `centerMode` with `centerPadding: "200px"`, which
 * pushed the outer cards under the arrows and clipped them at most widths, and
 * every card rendered at its own height. Slides here are equal-height flex
 * children (see the .slick-track rules in global.css) and the arrows sit
 * outside the track.
 *
 * Renders nothing when there are no reviews, so the section can never appear
 * as an empty band — the old one rendered its heading and an empty carousel.
 */
const SETTINGS = {
  dots: false,
  arrows: false,
  infinite: true,
  speed: 400,
  slidesToShow: 3,
  slidesToScroll: 1,
  responsive: [
    { breakpoint: 1024, settings: { slidesToShow: 2 } },
    { breakpoint: 640, settings: { slidesToShow: 1 } },
  ],
};

export default function Testimonials({ data = [] }: any) {
  const [slider, setSlider] = useState<any>(null);
  if (data.length === 0) return null;

  const showControls = data.length > 1;

  return (
    <section className="section section-bg">
      <div className="container">
        <div className="flex flex-col items-center justify-between gap-6 mb-10 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="Guest reviews"
            title="What people say after eating"
            align="left"
            className="mb-0 sm:mx-0"
          />

          {showControls && (
            <div className="flex gap-2 shrink-0">
              <button
                type="button"
                className="btn-icon"
                onClick={() => slider?.slickPrev()}
                aria-label="Previous review"
              >
                <MdChevronLeft className="w-5 h-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                className="btn-icon"
                onClick={() => slider?.slickNext()}
                aria-label="Next review"
              >
                <MdChevronRight className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>
          )}
        </div>

        <Slider ref={setSlider} {...SETTINGS} className="-mx-3">
          {data.map((review: any) => (
            <div key={review._id} className="h-full px-3">
              <ReviewCard review={review} />
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}

function ReviewCard({ review }: any) {
  const [avatarFailed, setAvatarFailed] = useState(false);

  return (
    <figure className="flex flex-col h-full p-6 bg-white border rounded-card border-cream-300">
      <div className="flex mb-4 text-ember-500" aria-hidden="true">
        {Array.from({ length: 5 }, (_, i) => (
          <AiFillStar key={i} className="w-4 h-4" />
        ))}
      </div>
      <span className="sr-only">Rated 5 out of 5</span>

      <blockquote className="flex-1 mb-6 leading-relaxed text-charcoal-700">
        &ldquo;{review.description}&rdquo;
      </blockquote>

      <figcaption className="flex items-center gap-3 pt-5 border-t border-cream-200">
        <span className="flex items-center justify-center w-10 h-10 overflow-hidden rounded-full bg-cream-200 text-charcoal-400 shrink-0">
          {review.img && !avatarFailed ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={review.img}
              alt=""
              className="object-cover w-full h-full"
              onError={() => setAvatarFailed(true)}
            />
          ) : (
            <BiUser className="w-5 h-5" aria-hidden="true" />
          )}
        </span>
        <span className="text-sm font-semibold text-charcoal-900">{review.name}</span>
      </figcaption>
    </figure>
  );
}
