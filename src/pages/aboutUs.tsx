import AboutStory from "components/about/AboutStory";
import AboutTeam from "components/about/AboutTeam";
import AboutValues from "components/about/AboutValues";
import Layout from "components/common/Layout";
import ClosingCTA from "components/home/ClosingCTA";
import Testimonials from "components/home/Testimonials";
import PageHeader from "components/ui/PageHeader";
import foodRepo from "repositories/foodRepo";
import reviewRepo from "repositories/reviewRepo";

export default function AboutPage({ review = [], foods = [] }: any) {
  return (
    <Layout
      title="Our Kitchen"
      description="How Cheesy_Kitchen cooks: a short menu, prepped daily, with dough proved for 48 hours and chickens brined overnight."
    >
      <PageHeader
        eyebrow="About us"
        title="Our kitchen"
        description="Why the menu is short, and what happens to your order between the ticket printing and the door."
        crumbs={[{ label: "Our Kitchen" }]}
      />

      <AboutStory foods={foods} />
      <AboutValues />
      <AboutTeam />
      <Testimonials data={review} />
      <ClosingCTA />
    </Layout>
  );
}

export async function getServerSideProps() {
  const [review, foods] = await Promise.all([
    reviewRepo.listAll(),
    foodRepo.listAll(),
  ]);
  return { props: { review, foods } };
}
