import Layout from "components/common/Layout";
import Sidebar from "components/Dashboard/Sidebar";
import ViewAllOrder from "components/ViewAllOrder/ViewAllOrder";
import Order from "models/Orders";
import React from "react";
import db from "utils/db";

const allOrder = ({ orderFoods }) => {
  return (
    <Layout title="All Orders">
      <div className="flex items-stretch w-full h-full bg-gray-100">
        <Sidebar />
        <div className="w-full min-h-screen p-5 py-4 transition-all bg-white">
          <ViewAllOrder orderFood={orderFoods}></ViewAllOrder>
          {/* {orderFoods.map((orderFood) => (
            <ViewAllOrder orderFood={orderFood}></ViewAllOrder>
          ))} */}
        </div>
      </div>
    </Layout>
  );
};

export default allOrder;

export async function getServerSideProps() {
  await db.connect();
  const order = await Order.find({}).lean();
  const orderFoods = JSON.parse(JSON.stringify(order));
  await db.disconnect();
  return {
    props: {
      orderFoods,
    },
  };
}
