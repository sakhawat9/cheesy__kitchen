import DashboardChart from "components/Dashboard/DashboardChart";
import DashHome from "components/Dashboard/DashHome";
import Sidebar from "components/Dashboard/Sidebar";
import Food from "models/Food";
import Order from "models/Orders";
import Review from "models/Review";
import User from "models/User";
import Head from "next/head";
import React from "react";
import db from "utils/db";

const index = ({ food, review, orderFood, user }) => {
  return (
    <>
      <Head>
        <title>Dashboard | ECommerce-Website</title>
      </Head>
      <div className="flex w-full bg-gray-200">
        <Sidebar />
        <div className="m-5 min-h-screen w-full bg-white p-5 transition-all">
          <DashboardChart />
          <DashHome
            food={food}
            review={review}
            order={orderFood}
            user={user}
          />
        </div>
      </div>
    </>
  );
};

export default index;

export async function getServerSideProps() {
  await db.connect();
  const foods = await Food.find({}).lean();
  const review = await Review.find({}).lean();
  const user = await User.find({}).lean();
  const order = await Order.find({}).lean();
  const orderFood = JSON.parse(JSON.stringify(order));
  await db.disconnect();
  return {
    props: {
        food: foods.map(db.convertDocToObj),
      review: review.map(db.convertDocToObj),
      user: user.map(db.convertDocToObj),
      orderFood,
    },
  };
}
