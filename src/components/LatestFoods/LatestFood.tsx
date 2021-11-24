import Link from "next/link";
import React from "react";
import { IFood } from "type";

interface IProp {
  food: IFood;
}

const LatestFood = ({ food }: IProp) => {
  const { slug, image, name, shortDesc } = food;

  return (
    <div className="latest-food__wrapper__cart__items">
      <Link href={`/foods/${slug}`}>
        <a>
          <div className="latest-food__wrapper__cart__items__wrapper">
            <div className="images">
              <img src={image} alt={name} />
            </div>
            <h4>{name}</h4>
            <p>{shortDesc}</p>
          </div>
        </a>
      </Link>
    </div>
  );
};

export default LatestFood;
