import Layout from "components/common/Layout";
import Sidebar from "components/Dashboard/Sidebar";
import ManageFoods from "components/ManageFoods/ManageFoods";
import Food from "models/Food";
import React from "react";
import db from "utils/db";

const managefoods = (props: any) => {
  const { allFood } = props;
  return (
    <Layout>
      <div className="flex items-stretch w-full bg-gray-200">
        <Sidebar />
        <div className="w-full min-h-screen p-5 m-5 transition-all bg-white manageCourses__items section-padding page-content__body">
          <ManageFoods foods={allFood} />
        </div>
      </div>
    </Layout>
  );
};

export default managefoods;

export async function getServerSideProps() {
  await db.connect();
  const foods = await Food.find({}).lean();
  await db.disconnect();
  return {
    props: {
      allFood: foods.map(db.convertDocToObj),
    },
  };
}
