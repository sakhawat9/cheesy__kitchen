import Layout from "components/common/Layout";
import { CATEGORIES } from "components/menu/categories";
import PageMasthead from "components/ui/PageMasthead";
import Reveal from "components/ui/Reveal";
import Image from "next/image";
import Link from "next/link";
import { LuArrowUpRight } from "react-icons/lu";
import foodRepo from "repositories/foodRepo";
import { formatPrice } from "utils/format";

export default function CategoryIndexPage({ foods = [] }: any) {
  const categories = CATEGORIES.map((category) => {
    const dishes = foods.filter((food: any) => food.category === category.slug);
    return {
      ...category,
      count: dishes.length,
      image: dishes[0]?.image,
      from: dishes.length ? Math.min(...dishes.map((d: any) => d.price)) : null,
    };
  }).filter((category) => category.count > 0);

  return (
    <Layout
      heroPage
      title="The Kitchen"
      description="Browse the Cheesy Kitchen menu by course — burgers, pizza, chicken and pasta."
    >
      <PageMasthead
        label="Browse"
        title="The kitchen"
        description="Four courses, depending on what you're in the mood for."
        crumbs={[{ label: "Kitchen" }]}
        image={foods[1]?.image ?? foods[0]?.image}
      />

      <div className="section surface-cream">
        <div className="container">
          <div className="grid gap-8 sm:grid-cols-2">
            {categories.map((category, index) => (
              <Reveal key={category.slug} delay={index * 80}>
                <Link
                  href={`/category/${category.slug}`}
                  className="relative flex flex-col justify-end overflow-hidden group aspect-[5/4] sm:aspect-[4/3] rounded-panel bg-espresso-800"
                >
                  <Image
                    src={category.image}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 90vw, 45vw"
                    className="object-cover transition-transform duration-[900ms] ease-out-soft group-hover:scale-105"
                    priority={index < 2}
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-espresso-950 via-espresso-950/40 to-transparent"
                  />

                  <div className="relative p-7 sm:p-9">
                    <div className="flex items-end justify-between gap-4">
                      <div>
                        <h2 className="mb-2 text-4xl text-oat-50">{category.name}</h2>
                        <p className="max-w-sm text-sm leading-relaxed text-oat-400">
                          {category.blurb}
                        </p>
                        <p className="mt-4 text-sm text-saffron-400">
                          {category.count}{" "}
                          {category.count === 1 ? "dish" : "dishes"}
                          {category.from !== null && (
                            <> &middot; from {formatPrice(category.from)}</>
                          )}
                        </p>
                      </div>

                      <span
                        aria-hidden="true"
                        className="flex items-center justify-center w-12 h-12 transition-colors border rounded-full shrink-0 border-white/25 text-oat-100 group-hover:bg-saffron-500 group-hover:border-saffron-500 group-hover:text-espresso-950"
                      >
                        <LuArrowUpRight className="w-5 h-5" />
                      </span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  const foods = await foodRepo.listAll();
  return { props: { foods } };
}
