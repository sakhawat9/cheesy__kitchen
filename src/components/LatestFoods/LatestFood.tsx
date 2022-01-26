import axios from "axios";
import Link from "next/link";
import React, { useContext } from "react";
import { BsPlusLg } from "react-icons/bs";
import { GrView } from "react-icons/gr";
import { IFood } from "type";
import { Store } from "utils/Store";

interface IProp {
  food: IFood;
}

const LatestFood = ({ food }: IProp) => {
  const { slug, image, name, shortDesc, price } = food;
  const { state, dispatch } = useContext(Store);
  const addToCartHandler = async () => {
    const { data } = await axios.get(`/api/foods/${food._id}`);
    if (data.countInStock <= 0) {
      window.alert("Sorry. Product is out of stock");
      return;
    }
    dispatch({
      type: "CART_ADD_ITEM",
      payload: { ...food, quantity: 1 },
    });
  };

  return (
    <div className="latest-food__wrapper__cart__items">
      <div className="latest-food__wrapper__cart__items__wrapper">
        <div className="images">
          <img src={image} alt={name} />
        </div>
        <div className="flex items-center justify-between">
          <h4>{name}</h4>
          <h4>${price}</h4>
        </div>
        <p>{shortDesc}</p>
      </div>

      <div className="flex add__icon">
        <div className="flex gap-4">
          <button onClick={addToCartHandler}>
            <Link href={`/foods/${slug}`}>
              <a>
                <GrView className="text-white" />
              </a>
            </Link>
          </button>
          <button onClick={addToCartHandler}>
            <BsPlusLg />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LatestFood;
