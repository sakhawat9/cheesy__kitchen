import Categories from "components/Categories/Categories";
import Layout from "components/common/Layout";
import FeaturedFoods from "components/FeaturedFoods/FeaturedFoods";
import Hero from "components/Home/Hero/Hero";
import LatestFoods from "components/LatestFoods/LatestFoods";
import Testimonials from "components/Testimonials/Testimonials";
import React from "react";
import "react-multi-carousel/lib/styles.css";

const HomePage = () => {
  return (
    <Layout>
      <Hero infinite="true" autoPlay="true" deviceType="desktop" />
      <Categories />
      <LatestFoods />
      <FeaturedFoods />
      <Testimonials />
    </Layout>
  );
};

export default HomePage;
