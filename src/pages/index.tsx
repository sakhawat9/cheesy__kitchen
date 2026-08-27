import Layout from "components/common/Layout";
import CategoryShowcase from "components/home/CategoryShowcase";
import ChefsTable from "components/home/ChefsTable";
import ClosingCTA from "components/home/ClosingCTA";
import Hero from "components/home/Hero";
import MenuHighlights from "components/home/MenuHighlights";
import Testimonials from "components/home/Testimonials";
import ValueProps from "components/home/ValueProps";
import foodRepo from "repositories/foodRepo";
import reviewRepo from "repositories/reviewRepo";

export default function HomePage({ foods = [], review = [] }: any) {
  // Split the menu so no dish appears in two bands of the same page — the old
  // homepage rendered LatestFoods and FeaturedFoods back to back from the same
  // six records.
  const featured = foods.filter((food: any) => food?.prichard === true);
  const rest = foods.filter((food: any) => !food?.prichard);

  return (
    <Layout description="A short menu cooked properly — smashed burgers, 48-hour pizza dough and overnight-brined chicken, delivered free across Dhaka.">
      <Hero foods={foods} />
      <ValueProps />
      <CategoryShowcase foods={foods} />
      <ChefsTable foods={featured.length > 0 ? featured : foods} />
      <MenuHighlights foods={rest.length > 0 ? rest : foods} />
      <Testimonials data={review} />
      <ClosingCTA />
    </Layout>
  );
}

export async function getServerSideProps() {
  const [foods, review] = await Promise.all([
    foodRepo.listAll(),
    reviewRepo.listAll(),
  ]);
  return { props: { foods, review } };
}
