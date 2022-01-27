import Title from "components/common/Title";
import LatestFood from "components/LatestFoods/LatestFood";
import React from "react";
import { FaLongArrowAltRight } from "react-icons/fa";

const FeaturedFoods = ({ foods }) => {
  const prichardCurse = foods.filter((food) => food?.prichard === true);

  return (
    <div className="bg-gray-50">
      <div className="container mx-auto section-padding">
        <div className="text-center ">
          <Title title="Featured Food" subtitle="" description="" />
        </div>
        <div className="latest-food__wrapper__cart">
          {prichardCurse?.slice(0, 3).map((food) => (
            <LatestFood key={food._id} food={food} />
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
