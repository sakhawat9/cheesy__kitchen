import Title from "components/common/Title";
import React from "react";
import LatestFood from "./LatestFood";

const LatestFoods = ({ foods }) => {
  return (
    <section className="latest-food">
      <div className="latest-food__wrapper">
        <Title
          subtitle="NEWLY ADDED FOOD AT CHEESY__KITCHEN"
          title="Latest food"
          description=""
        />
        <div className="latest-food__wrapper__cart">
          {foods.slice(0, 6).map((food) => (
            <LatestFood key={food._id} food={food} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestFoods;
