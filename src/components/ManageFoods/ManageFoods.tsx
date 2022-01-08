import React from "react";
import { IFood } from "type";
import ManageFood from "./ManageFood";

interface IProp {
  foods: IFood;
}

const ManageFoods = ({ foods }: IProp) => {
  // console.log(foods);

  return (
    <div className="manageCourse">
      <div className="title">
        <h2 className="title__subtitle"></h2>
        <h2 className="mb-4">Manage Course</h2>
        <p>
          Dear Admin, Welcome to your manage courses page. You can manage your
          existing courses below.
        </p>
      </div>
      <div className="flex flex-wrap overflow-hidden">
        {foods.map((food: IFood) => (
          <ManageFood key={food._id} food={food}></ManageFood>
        ))}
      </div>
    </div>
  );
};

export default ManageFoods;
