import AllFood from "components/AllFood/AllFood";
import Layout from "components/common/Layout";
import Title from "components/common/Title";
import Food from "models/Food";
import React from "react";
import db from "utils/db";

const AllFoods = (props) => {
  const { foods } = props;

  return (
    <Layout title="Cheesy__kitchen all food">
      <div className="all-food">
        <div className="all-food__wrapper">
          <Title title="All Foods" subtitle="Find your food" description="" />
          <div className="all-food__wrapper__cart">
            {foods.map((food) => (
              <AllFood key={food._id} food={food} />
            ))}
          </div>
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
