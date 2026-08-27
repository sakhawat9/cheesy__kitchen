import Layout from "components/common/Layout";
import FoodDetails from "components/menu/FoodDetails";
import FoodTabs from "components/menu/FoodTabs";
import RelatedFoods from "components/menu/RelatedFoods";
import PageMasthead from "components/ui/PageMasthead";
import foodRepo from "repositories/foodRepo";
import { categoryLabel } from "utils/format";

export default function FoodDetailPage({ food, foods = [] }: any) {
  return (
    <Layout heroPage title={food.name} description={food.shortDesc}>
      {/* Breadcrumb-only bar, so the dish name is the page's single <h1>
          rather than appearing in a masthead and again above the buy box. */}
      <PageMasthead
        compact
        crumbs={[
          { label: "Menu", href: "/foods" },
          { label: categoryLabel(food.category), href: `/category/${food.category}` },
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
  if (!food) return { notFound: true };

  const foods = await foodRepo.listAll();
  return { props: { food, foods } };
}
