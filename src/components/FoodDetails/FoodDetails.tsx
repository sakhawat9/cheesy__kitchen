import React from "react";
import { IFood } from "type";

interface IProp {
  singleFood: IFood;
}

const FoodDetails = ({ singleFood }) => {
  const { name } = singleFood;

  return (
    <div className="food-details">
      <h2>{name}</h2>
    </div>
  );
};

export default FoodDetails;
