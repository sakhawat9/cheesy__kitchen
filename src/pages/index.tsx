import Layout from "components/common/Layout";
import Experience from "components/home/Experience";
import Hero from "components/home/Hero";
import Marquee from "components/home/Marquee";
import MenuPreview from "components/home/MenuPreview";
import OrderCTA from "components/home/OrderCTA";
import Reviews from "components/home/Reviews";
import SignatureDishes from "components/home/SignatureDishes";
import Story from "components/home/Story";
import VisitUs from "components/home/VisitUs";
import foodRepo from "repositories/foodRepo";
import reviewRepo from "repositories/reviewRepo";

/**
 * The homepage, ordered the way you'd walk into a restaurant: the room, the
 * promise, who we are, what we're known for, the menu, the experience, what
 * other people thought, and finally how to order and where to find us.
 */
export default function HomePage({ foods = [], reviews = [] }: any) {
  const featured = foods.filter((food: any) => food?.prichard === true);
  const signature = featured.length > 0 ? featured : foods;

  // The story band borrows two dishes for its imagery; take them from the end
  // of the list so they aren't the same plates the hero is already showing.
  const storyImages = [...foods].reverse();

  return (
    <Layout
      heroPage
      description="A short menu cooked properly — smashed burgers, 48-hour pizza dough and overnight-brined chicken, delivered free across Dhaka."
    >
      <Hero foods={foods} />
      <Marquee />
      <Story foods={storyImages} />
      <SignatureDishes foods={signature} />
      <MenuPreview foods={foods} />
      <Experience />
      <Reviews reviews={reviews} />
      <OrderCTA image={signature[0]?.image} />
      <VisitUs />
    </Layout>
  );
}

export async function getServerSideProps() {
  const [foods, reviews] = await Promise.all([
    foodRepo.listAll(),
    reviewRepo.listAll(),
  ]);
  return { props: { foods, reviews } };
}
