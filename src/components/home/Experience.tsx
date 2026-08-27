import Image from "next/image";
import femaleOne from "../../assets/images/female-chief1.jpg";
import femaleThree from "../../assets/images/female-chief3.jpg";
import maleThree from "../../assets/images/male-chief3.jpg";
import Reveal from "../ui/Reveal";
import SectionIntro from "../ui/SectionIntro";

/**
 * The kitchen at work.
 *
 * A staggered collage of the brigade rather than a row of matching portraits,
 * with the copy interleaved. Everything stated here is about how the food is
 * cooked — no covers-per-night, no awards, no years-in-business, because none
 * of that is established anywhere in the project.
 */
const NOTES = [
  {
    title: "An open kitchen",
    body: "Nothing is assembled out of sight. The pass faces the room, and the person who cooked your food is the person who sends it.",
  },
  {
    title: "One service at a time",
    body: "A short menu means a small brigade, and a small brigade means every plate is checked before it leaves.",
  },
];

export default function Experience() {
  return (
    <section className="section surface-cream">
      <div className="container">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16 lg:items-center">
          {/* Collage */}
          <div className="lg:col-span-6">
            <div className="grid grid-cols-5 gap-4 sm:gap-5">
              <Reveal className="col-span-3">
                <div className="relative overflow-hidden aspect-[3/4] rounded-panel bg-oat-200">
                  <Image
                    src={maleThree}
                    alt="A chef at work in the Cheesy Kitchen kitchen"
                    fill
                    sizes="(max-width: 1024px) 55vw, 28vw"
                    className="object-cover"
                    placeholder="blur"
                  />
                </div>
              </Reveal>

              <div className="flex flex-col col-span-2 gap-4 pt-10 sm:gap-5">
                <Reveal delay={120}>
                  <div className="relative overflow-hidden aspect-square rounded-panel bg-oat-200">
                    <Image
                      src={femaleOne}
                      alt="A chef plating a dish on the pass"
                      fill
                      sizes="(max-width: 1024px) 40vw, 20vw"
                      className="object-cover"
                      placeholder="blur"
                    />
                  </div>
                </Reveal>

                <Reveal delay={220}>
                  <div className="relative overflow-hidden aspect-square rounded-panel bg-oat-200">
                    <Image
                      src={femaleThree}
                      alt="A chef in the kitchen between services"
                      fill
                      sizes="(max-width: 1024px) 40vw, 20vw"
                      className="object-cover"
                      placeholder="blur"
                    />
                  </div>
                </Reveal>
              </div>
            </div>
          </div>

          {/* Copy */}
          <div className="lg:col-span-6 lg:pl-6">
            <SectionIntro
              label="The experience"
              title={
                <>
                  Cooked in front of you,{" "}
                  <em className="italic font-normal text-chilli-600">
                    not behind a wall
                  </em>
                </>
              }
              description="A dining room built around the pass, so the kitchen is part of the room rather than hidden from it."
            />

            <Reveal delay={140}>
              <dl className="mt-10 space-y-8">
                {NOTES.map((note, index) => (
                  <div key={note.title} className="flex gap-5">
                    <span
                      aria-hidden="true"
                      className="text-2xl leading-none font-display text-saffron-500 shrink-0 pt-0.5"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <dt className="mb-2 text-xl font-display text-espresso-900">
                        {note.title}
                      </dt>
                      <dd className="leading-relaxed text-espresso-500">
                        {note.body}
                      </dd>
                    </div>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
