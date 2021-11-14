import Layout from "components/common/Layout";
import Hero from "components/Home/Hero/Hero";
import React from "react";
import "react-multi-carousel/lib/styles.css";

const HomePage = () => {
  return (
    <Layout>
      <Hero infinite="true" autoPlay="true" deviceType="desktop" />
    </Layout>
  );
};

export default HomePage;
