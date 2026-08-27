import Image from "next/image";
import Link from "next/link";
import Reveal from "../ui/Reveal";
import SectionIntro from "../ui/SectionIntro";

/**
 * The story band.
 *
 * Two overlapping photographs — a tall frame with a circular "plate" crop
 * breaking out of its corner — beside the copy. The circle is the section's
 * signature: it echoes a plate, and it stops the band reading as another
 * two-column text-and-picture row.
 */
export default function Story({ foods = [] }: any) {
  const [first, second] = foods;

  return (
    <section id="story" className="section surface-cream scroll-mt-24">
      <div className="container">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20 lg:items-center">
          {/* Imagery */}
          <Reveal className="relative">
            {first && (
              <div className="relative overflow-hidden aspect-[4/5] max-w-md rounded-panel bg-oat-200">
                <Image
                  src={first.image}
                  alt={first.name}
                  fill
                  sizes="(max-width: 1024px) 90vw, 40vw"
                  className="object-cover"
                />
              </div>
            )}

            {second && (
              <div className="absolute overflow-hidden border-8 rounded-full shadow-lift -bottom-8 right-4 lg:-right-6 w-36 h-36 sm:w-48 sm:h-48 border-oat-100 bg-oat-200">
                <Image
                  src={second.image}
                  alt={second.name}
                  fill
                  sizes="192px"
                  className="object-cover"
                />
              </div>
            )}

            {/* Years-in-the-making style stamp, but stating only what's true:
                the size of the menu. */}
            <div className="absolute hidden -top-6 -left-6 sm:flex flex-col items-center justify-center w-28 h-28 rounded-full bg-chilli-600 text-oat-50 rotate-[-8deg] shadow-glow">
              <span className="text-3xl leading-none font-display">4</span>
              <span className="text-[0.5625rem] uppercase tracking-[0.18em] mt-1">
                Categories
              </span>
            </div>
          </Reveal>

          {/* Copy */}
          <div className="mt-12 lg:mt-0">
            <SectionIntro
              label="Our story"
              title={
                <>
                  We&apos;d rather cook four things{" "}
                  <em className="italic font-normal text-chilli-600">well</em>
                </>
              }
            />

            <Reveal delay={120} className="mt-8 space-y-5 leading-relaxed text-espresso-600">
              <p>
                Cheesy Kitchen started from a simple frustration: menus that run
                to six pages, where half the dishes come out of a freezer and the
                other half are cooked by someone who has made them four hundred
                times that week and stopped tasting them.
              </p>
              <p>
                So we made the menu short. Short enough that everything on it is
                prepped fresh each morning, and short enough that the person
                cooking your burger has the time to smash it properly rather than
                clear a rail of twenty tickets.
              </p>
              <p className="text-lg italic font-display text-espresso-800">
                If a dish stops being worth the time, it comes off the menu
                rather than staying on it quietly.
              </p>
            </Reveal>

            <Reveal delay={200} className="flex flex-wrap gap-4 mt-9">
              <Link href="/aboutUs" className="btn btn-line">
                Read more
              </Link>
              <Link href="/foods" className="btn btn-ghost">
                See the menu &rarr;
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
