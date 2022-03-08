import DashboardChart from "components/Dashboard/DashboardChart";
import Sidebar from "components/Dashboard/Sidebar";
import Head from "next/head";
import React from "react";

const index = () => {
  return (
    <>
      <Head>
        <title>Dashboard | ECommerce-Website</title>
      </Head>
      <div className="flex w-full bg-gray-200">
        <Sidebar />
        <div className="m-5 min-h-screen w-full bg-white p-5 transition-all">
          <DashboardChart />
        </div>
      </div>
    </>
  );
};

export default index;
