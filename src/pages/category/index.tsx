import Layout from "components/common/Layout";
import { CATEGORIES } from "components/menu/categories";
import PageHeader from "components/ui/PageHeader";
import Image from "next/image";
import Link from "next/link";
import { MdArrowForward } from "react-icons/md";
import foodRepo from "repositories/foodRepo";

export default function CategoryIndexPage({ foods = [] }: any) {
  const categories = CATEGORIES.map((category) => {
    const dishes = foods.filter((food: any) => food.category === category.slug);
    return { ...category, count: dishes.length, image: dishes[0]?.image };
  }).filter((category) => category.count > 0);

  return (
    <Layout
      title="Categories"
      description="Browse the Cheesy_Kitchen menu by category — burgers, pizza, chicken and pasta."
    >
      <PageHeader
        eyebrow="Browse"
        title="Categories"
        description="Four ways in, depending on what you're in the mood for."
        crumbs={[{ label: "Categories" }]}
      />

      <div className="section">
        <div className="container">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {categories.map((category, index) => (
              <Link
                key={category.slug}
                href={`/category/${category.slug}`}
                className="relative flex flex-col justify-end overflow-hidden transition-shadow duration-200 group aspect-[16/10] rounded-card bg-charcoal-800 hover:shadow-lift"
              >
                <Image
                  src={category.image}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 90vw, 45vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  priority={index < 2}
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-charcoal-950/90 via-charcoal-950/35 to-transparent"
                />

                <div className="relative p-6 sm:p-7">
                  <h2 className="mb-2 text-white text-h3">{category.name}</h2>
                  <p className="max-w-sm mb-3 text-sm leading-relaxed text-cream-400">
                    {category.blurb}
                  </p>
                  <p className="flex items-center gap-1.5 text-sm font-semibold text-white">
                    {category.count} {category.count === 1 ? "dish" : "dishes"}
                    <MdArrowForward
                      className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </p>
                </div>
              </Link>
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
