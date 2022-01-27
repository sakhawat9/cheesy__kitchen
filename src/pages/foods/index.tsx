import Layout from "components/common/Layout";
import Title from "components/common/Title";
import LatestFood from "components/LatestFoods/LatestFood";
import Pagination from "components/Pagination";
import Food from "models/Food";
import React, { useState } from "react";
import db from "utils/db";

const AllFoods = (props) => {
  const { foods } = props;

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = foods.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Layout title="Cheesy__kitchen all food">
      <div className="all-food">
        <div className="all-food__wrapper">
          <Title title="All Foods" subtitle="Find your food" description="" />
          <div className="latest-food__wrapper__cart">
            {currentPosts.map((food) => (
              <LatestFood key={food._id} food={food} />
            ))}
          </div>
        </div>
        <div className="container">
          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={foods.length}
            paginate={paginate}
          />
        </div>
      </div>
    </Layout>
  );
};

export default AllFoods;

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
