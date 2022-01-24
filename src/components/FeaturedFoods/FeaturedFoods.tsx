import Title from "components/common/Title";
import React from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
import FeaturedFood from "./FeaturedFood";

const FeaturedFoods = ({ foods }) => {
  const prichardCurse = foods.filter((food) => food?.prichard === true);

  return (
    <div className="bg-gray-50">
      <div className="container mx-auto section-padding">
        <div className="text-center ">
          <Title title="Featured Food" subtitle="" description="" />
        </div>
        <div className="grid grid-cols-2 gap-4 featuredFoods__wrapper md:grid-cols-3">
          {prichardCurse?.slice(0, 3).map((food) => (
            <FeaturedFood key={food._id} food={food} />
          ))}
        </div>
        <button className="btn-brand">
          <a className="flex items-center" href="/foods">
            View All Food <FaLongArrowAltRight />
          </a>
        </button>
      </div>
    </div>
  );
};

export default FeaturedFoods;
