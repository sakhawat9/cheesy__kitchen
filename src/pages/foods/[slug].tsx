import Layout from "components/common/Layout";
import FoodDetails from "components/menu/FoodDetails";
import FoodTabs from "components/menu/FoodTabs";
import RelatedFoods from "components/menu/RelatedFoods";
import { categoryLabel } from "utils/format";
import PageHeader from "components/ui/PageHeader";
import foodRepo from "repositories/foodRepo";

export default function FoodDetailPage({ food, foods = [] }: any) {
  return (
    <Layout title={food.name} description={food.shortDesc}>
      {/* Breadcrumb-only bar, so the dish name is the page's single <h1>
          rather than appearing in a banner and again above the buy box. */}
      <PageHeader
        crumbs={[
          { label: "Menu", href: "/foods" },
          {
            label: categoryLabel(food.category),
            href: `/category/${food.category}`,
          },
          { label: food.name },
        ]}
      />

      <FoodDetails food={food} />
      <FoodTabs food={food} />
      <RelatedFoods foods={foods} current={food} />
    </Layout>
  );
}

export async function getServerSideProps({ params }: any) {
  const food = await foodRepo.getBySlug(params.slug);

  // A slug that doesn't exist now renders the 404 page. Previously the page
  // returned `singleFoods: null`, which rendered a permanent "Loading..."
  // string and answered 200 to crawlers.
  if (!food) return { notFound: true };

  const foods = await foodRepo.listAll();
  return { props: { food, foods } };
}
