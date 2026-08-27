import Layout from "components/common/Layout";
import { categoryBySlug } from "components/menu/categories";
import MenuBrowser from "components/menu/MenuBrowser";
import PageMasthead from "components/ui/PageMasthead";
import foodRepo from "repositories/foodRepo";

/**
 * One category page for every category, replacing six hand-written copies that
 * were identical apart from one filter string — three of which filtered on a
 * category no dish used and rendered an empty page.
 */
export default function CategoryPage({ foods = [], category }: any) {
  const hero = foods.find((food: any) => food.category === category.slug);

  return (
    <Layout
      heroPage
      title={category.name}
      description={`${category.name} at Cheesy Kitchen — ${category.blurb}`}
    >
      <PageMasthead
        label="On the menu"
        title={category.name}
        description={category.blurb}
        crumbs={[{ label: "Kitchen", href: "/category" }, { label: category.name }]}
        image={hero?.image}
      />

      <div className="section surface-cream">
        <div className="container">
          <MenuBrowser foods={foods} initialCategory={category.slug} />
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ params }: any) {
  const category = categoryBySlug(params.slug);
  if (!category) return { notFound: true };

  const foods = await foodRepo.listAll();
  return { props: { foods, category } };
}
