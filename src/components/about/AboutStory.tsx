import Image from "next/image";
import SectionHeading from "../ui/SectionHeading";

/**
 * The kitchen's story.
 *
 * The old AboutUsContent pulled all four of its images and icons from
 * `my-templates.online/deli-taste`, a third-party theme demo — hotlinked
 * assets on a host nobody controls, none of them showing this kitchen.
 *
 * The copy it carried ("More than 50 restaurants and cafes cooperate with us.
 * More than 250 employees…") described a delivery marketplace rather than a
 * single kitchen, and stated headcounts nobody can verify. This copy makes no
 * claims beyond how the food is cooked.
 *
 * The photographs are the kitchen's own dishes, taken from the live menu, so
 * the page can't end up illustrated with food this kitchen doesn't serve.
 */
export default function AboutStory({ foods = [] }: any) {
  const [first, second] = foods;

  return (
    <section className="section">
      <div className="container">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14 lg:items-center">
          <div className="lg:col-span-6">
            <SectionHeading
              eyebrow="Our kitchen"
              title="We'd rather cook four things well"
              align="left"
              as="h2"
              className="mb-6"
            />

            <div className="space-y-4 leading-relaxed text-charcoal-600">
              <p>
                Cheesy_Kitchen started from a simple frustration: menus that run
                to six pages, where half the dishes come out of a freezer and
                the other half are cooked by someone who has made them four
                hundred times that week and stopped tasting them.
              </p>
              <p>
                So we made the menu short. Short enough that everything on it is
                prepped fresh each morning, and short enough that the person
                cooking your burger has the time to smash it properly rather
                than clear a rail of twenty tickets.
              </p>
              <p>
                The dough proves for forty-eight hours because that is how long
                it takes. Chickens are brined overnight for the same reason.
                Sauces are built in the pan from what came out of it. None of
                this is clever — it is just the slower version of things most
                kitchens do quickly.
              </p>
              <p>
                If a dish stops being worth the time, it comes off the menu
                rather than staying on it quietly. That&apos;s the whole
                philosophy.
              </p>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="grid grid-cols-2 gap-4 sm:gap-5">
              {first && (
                <div className="relative overflow-hidden aspect-[3/4] rounded-card bg-cream-100">
                  <Image
                    src={first.image}
                    alt={first.name}
                    fill
                    sizes="(max-width: 1024px) 45vw, 24vw"
                    className="object-cover"
                  />
                </div>
              )}
              {second && (
                <div className="relative mt-8 overflow-hidden aspect-[3/4] rounded-card bg-cream-100">
                  <Image
                    src={second.image}
                    alt={second.name}
                    fill
                    sizes="(max-width: 1024px) 45vw, 24vw"
                    className="object-cover"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
