import Categories from "components/Categories/Categories";
import Layout from "components/common/Layout";
import Hero from "components/Home/Hero/Hero";
import LatestFoods from "components/LatestFoods/LatestFoods";
import React from "react";
import "react-multi-carousel/lib/styles.css";

const HomePage = () => {
  return (
    <Layout>
      <Hero infinite="true" autoPlay="true" deviceType="desktop" />
      <Categories />
      <LatestFoods />
    </Layout>
  );
};

export default HomePage;
