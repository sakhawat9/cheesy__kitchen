import Image from "next/image";
import femaleOne from "../../assets/images/female-chief1.jpg";
import femaleThree from "../../assets/images/female-chief3.jpg";
import maleTwo from "../../assets/images/male-chief2.jpg";
import maleThree from "../../assets/images/male-chief3.jpg";
import SectionHeading from "../ui/SectionHeading";

/**
 * The kitchen team.
 *
 * The old "OUR EXPERT CHEFS" grid listed six chefs, but five of the six were
 * placeholders left in the data — "Female Chief-1", "Male Chief_2" and so on —
 * displayed as if they were real names, each with four social links pointing
 * at the bare domains facebook.com, twitter.com, instagram.com and
 * linkedin.com rather than at anyone's profile.
 *
 * Only one entry carried a real name, so only that one is named here. The rest
 * of the team appears as photographs of the kitchen without invented
 * identities attached to them.
 *
 * Two of the six source photographs are not shipped: male-chief1.jpg carried a
 * visible Shutterstock comp watermark across the bottom of the frame, and
 * female-chief2.jpg was branded with the logo of the Culinary Institute of
 * Virginia — a real organisation this kitchen has no association with. Both
 * files have been deleted rather than cropped, since neither is licensed here.
 */
const TEAM_PHOTOS = [
  { src: maleTwo, alt: "A chef presenting a dish" },
  { src: femaleOne, alt: "A chef plating a salad on the pass" },
  { src: femaleThree, alt: "A chef in the kitchen between services" },
];

export default function AboutTeam() {
  return (
    <section className="section" id="chefs">
      <div className="container">
        <SectionHeading
          eyebrow="Who cooks it"
          title="The people in the kitchen"
          description="A small brigade, which is the only reason a menu like this is possible."
        />

        <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
          {/* Head chef — the one member of the team the project has a real
              name for. */}
          <article className="lg:col-span-5">
            <div className="relative overflow-hidden aspect-[4/5] rounded-card bg-cream-100">
              <Image
                src={maleThree}
                alt="Khandokar Riyad, head chef, in the kitchen"
                fill
                sizes="(max-width: 1024px) 92vw, 40vw"
                className="object-cover"
                placeholder="blur"
              />
            </div>
            <div className="mt-5">
              <p className="mb-1 eyebrow">Head chef</p>
              <h3 className="mb-2">Khandokar Riyad</h3>
              <p className="leading-relaxed text-charcoal-500">
                Runs the pass and writes the menu. If a dish is on it, he has
                decided it&apos;s worth the time it takes to make properly.
              </p>
            </div>
          </article>

          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-5">
              {TEAM_PHOTOS.map((photo, index) => (
                <div
                  key={index}
                  className="relative overflow-hidden aspect-[3/4] rounded-card bg-cream-100"
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(max-width: 640px) 90vw, 22vw"
                    className="object-cover"
                    placeholder="blur"
                  />
                </div>
              ))}
            </div>

            <p className="mt-5 leading-relaxed text-charcoal-500">
              The rest of the brigade works the grill, the oven and the pass.
              Between them they cook everything on the menu, every service —
              which on a list this short means each of them makes the same
              handful of dishes often enough to make them very well.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
