import Link from "next/link";
import React from "react";
import { IFood } from "type";

interface IProp {
  food: IFood;
}

const AllFood = ({ food }: IProp) => {
  const { slug, image, name, price } = food;

  return (
    <div className="all-food__wrapper__cart__items">
      <Link href={`/foods/${slug}`}>
        <a>
          <div className="all-food__wrapper__cart__items__wrapper">
            <div className="images">
              <img src={image} alt={name} />
            </div>
            <div className="flex items-center justify-between">
              <h4>{name}</h4>
              <h4>${price}</h4>
            </div>
          </div>
        </a>
      </Link>
    </div>
  );
};

export default AllFood;
