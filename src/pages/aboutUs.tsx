import Layout from "components/common/Layout";
import Experience from "components/home/Experience";
import OrderCTA from "components/home/OrderCTA";
import Reviews from "components/home/Reviews";
import Story from "components/home/Story";
import PageMasthead from "components/ui/PageMasthead";
import Reveal from "components/ui/Reveal";
import SectionIntro from "components/ui/SectionIntro";
import Image from "next/image";
import femaleThree from "assets/images/female-chief3.jpg";
import maleTwo from "assets/images/male-chief2.jpg";
import maleThree from "assets/images/male-chief3.jpg";
import foodRepo from "repositories/foodRepo";
import reviewRepo from "repositories/reviewRepo";

/**
 * How the kitchen cooks, and who cooks it.
 *
 * Only one member of the brigade has a real name recorded anywhere in this
 * project ("Khandokar Riyad", head chef); the rest of the original data was
 * placeholders — "Female Chief-1", "Male Chief_2" — presented as if they were
 * people, each with four social links pointing at bare domains. So only the
 * head chef is named, and the rest of the team appears as photographs of the
 * kitchen with no invented identities attached.
 *
 * Two of the six original photographs are gone entirely: one carried a visible
 * Shutterstock comp watermark, the other the logo of a real culinary school
 * this kitchen has no association with.
 */
const PRINCIPLES = [
  {
    title: "Slow where it counts",
    body: "Forty-eight hours for dough, overnight for brine. The waiting is the recipe, and there's no way to hurry it that doesn't show on the plate.",
  },
  {
    title: "Cooked to order",
    body: "Nothing is made ahead or held under a lamp. Your ticket prints, and that's when the cooking starts.",
  },
  {
    title: "A short list, prepped daily",
    body: "Four courses means everything on the menu is prepped fresh each morning, and nothing sits waiting for a customer who might not come.",
  },
  {
    title: "Free delivery, no minimum",
    body: "Across Dhaka, on every order, however small. It shouldn't cost extra to eat well.",
  },
];

export default function AboutPage({ reviews = [], foods = [] }: any) {
  const storyImages = [...foods].reverse();

  return (
    <Layout
      heroPage
      title="Our Story"
      description="How Cheesy Kitchen cooks: a short menu, prepped daily, with dough proved for 48 hours and chickens brined overnight."
    >
      <PageMasthead
        label="Our story"
        title="A short menu, cooked properly"
        description="Why the list is four courses long, and what happens to your order between the ticket printing and the door."
        crumbs={[{ label: "Our Story" }]}
        image={foods[2]?.image ?? foods[0]?.image}
      />

      <Story foods={storyImages} />

      {/* Principles */}
      <section className="section surface-dark on-dark">
        <div className="container">
          <SectionIntro
            label="How we cook"
            title="Four rules the kitchen doesn't bend"
            align="center"
            dark
            className="mb-16"
          />

          <div className="grid gap-x-10 gap-y-12 sm:grid-cols-2">
            {PRINCIPLES.map((principle, index) => (
              <Reveal key={principle.title} delay={index * 90} className="flex gap-6">
                <span
                  aria-hidden="true"
                  className="text-4xl leading-none font-display text-saffron-400 shrink-0"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="mb-3 text-2xl text-oat-50">{principle.title}</h3>
                  <p className="leading-relaxed text-oat-400">{principle.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Experience />

      {/* The brigade */}
      <section className="section surface-cream" id="chefs">
        <div className="container">
          <SectionIntro
            label="Who cooks it"
            title="The people in the kitchen"
            description="A small brigade, which is the only reason a menu like this is possible."
            align="center"
            className="mb-16"
          />

          <div className="grid gap-10 lg:grid-cols-12 lg:gap-14 lg:items-center">
            <Reveal className="lg:col-span-5">
              <div className="relative overflow-hidden aspect-[4/5] rounded-panel bg-oat-200">
                <Image
                  src={maleThree}
                  alt="Khandokar Riyad, head chef, in the kitchen"
                  fill
                  sizes="(max-width: 1024px) 92vw, 40vw"
                  className="object-cover"
                  placeholder="blur"
                />
              </div>
              <div className="mt-6">
                <p className="mb-2 label">Head chef</p>
                <h3 className="mb-3 text-3xl">Khandokar Riyad</h3>
                <p className="leading-relaxed text-espresso-500">
                  Runs the pass and writes the menu. If a dish is on it, he has
                  decided it&apos;s worth the time it takes to make properly.
                </p>
              </div>
            </Reveal>

            <div className="lg:col-span-7">
              <div className="grid grid-cols-2 gap-5">
                <Reveal delay={100}>
                  <div className="relative overflow-hidden aspect-[3/4] rounded-panel bg-oat-200">
                    <Image
                      src={maleTwo}
                      alt="A chef presenting a dish"
                      fill
                      sizes="(max-width: 1024px) 45vw, 26vw"
                      className="object-cover"
                      placeholder="blur"
                    />
                  </div>
                </Reveal>
                <Reveal delay={180} className="pt-10">
                  <div className="relative overflow-hidden aspect-[3/4] rounded-panel bg-oat-200">
                    <Image
                      src={femaleThree}
                      alt="A chef in the kitchen between services"
                      fill
                      sizes="(max-width: 1024px) 45vw, 26vw"
                      className="object-cover"
                      placeholder="blur"
                    />
                  </div>
                </Reveal>
              </div>

              <Reveal delay={240}>
                <p className="mt-8 text-lg leading-relaxed text-espresso-500">
                  The rest of the brigade works the grill, the oven and the pass.
                  Between them they cook everything on the menu, every service —
                  which on a list this short means each of them makes the same
                  handful of dishes often enough to make them very well.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <Reviews reviews={reviews} />
      <OrderCTA image={foods[0]?.image} />
    </Layout>
  );
}

export async function getServerSideProps() {
  const [reviews, foods] = await Promise.all([
    reviewRepo.listAll(),
    foodRepo.listAll(),
  ]);
  return { props: { reviews, foods } };
}
