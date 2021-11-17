import Categories from "components/Categories/Categories";
import Layout from "components/common/Layout";
import FeaturedFoods from "components/FeaturedFoods/FeaturedFoods";
import Hero from "components/Home/Hero/Hero";
import LatestFoods from "components/LatestFoods/LatestFoods";
import Testimonials from "components/Testimonials/Testimonials";
import Food from "models/Food";
import React from "react";
import "react-multi-carousel/lib/styles.css";
import db from "utils/db";

const HomePage = (props) => {
  const { foods } = props;

  return (
    <Layout>
      <Hero infinite="true" autoPlay="true" deviceType="desktop" />
      <Categories />
      <LatestFoods foods={foods} />
      <FeaturedFoods />
      <Testimonials />
    </Layout>
  );
};

export default HomePage;

export async function getServerSideProps() {
  await db.connect();
  const foods = await Food.find({}).lean();
  await db.disconnect();
  return {
    props: {
      foods: foods.map(db.convertDocToObj),
    },
  };
}
