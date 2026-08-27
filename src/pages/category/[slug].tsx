import Layout from "components/common/Layout";
import { categoryBySlug } from "components/menu/categories";
import MenuBrowser from "components/menu/MenuBrowser";
import PageHeader from "components/ui/PageHeader";
import foodRepo from "repositories/foodRepo";

/**
 * One category page for every category, replacing six hand-written copies
 * (barger.js, biryani.js, chicken.js, coffee.js, pasta.js, pizza.js) that were
 * identical apart from one filter string. Three of the six filtered on a
 * category no dish used, so they rendered an empty page; all six carried
 * barger.js's copy-pasted heading ("Chicken Category Food") and its broken
 * add-to-cart handler, which referenced an undefined `food` and threw on click.
 */
export default function CategoryPage({ foods = [], category }: any) {
  return (
    <Layout
      title={category.name}
      description={`${category.name} at Cheesy_Kitchen — ${category.blurb}`}
    >
      <PageHeader
        eyebrow="Category"
        title={category.name}
        description={category.blurb}
        crumbs={[
          { label: "Categories", href: "/category" },
          { label: category.name },
        ]}
      />

      <div className="section">
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
