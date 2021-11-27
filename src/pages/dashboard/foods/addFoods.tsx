// import AddNewCourse from 'components/AddNewCourse/AddNewCourse';
// import Sidebar from 'components/Dashboard/Sidebar';
// import Layout from 'components/utilities/Layout';
import AddNewFood from "components/AddNewFood/AddNewFood";
import Title from "components/common/Title";
import Sidebar from "components/Dashboard/Sidebar";
import React from "react";

const addFood = () => {
  return (
    <>
      <div className="flex items-stretch w-full bg-gray-200">
        <Sidebar />
        <div className="w-full min-h-screen p-5 transition-all bg-white section-padding">
          <Title
            title="Add new food"
            subtitle=""
            description="Dear Admin, Welcome to your Add food page. You may add new food by filling below form and start your earning instantly."
          ></Title>
          <AddNewFood />
        </div>
      </div>
    </>
  );
};

export default addFood;
