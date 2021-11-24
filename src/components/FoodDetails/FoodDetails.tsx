import axios from "axios";
import Title from "components/common/Title";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import { AiOutlineStar } from "react-icons/ai";
import { FaLongArrowAltRight } from "react-icons/fa";
import { IFood } from "type";
import { Store } from "utils/Store";

interface IProp {
  singleFood: IFood;
}

const FoodDetails = ({ singleFood }: IProp) => {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);

  const { name, image, price, description } = singleFood;
  const addToCartHandler = async () => {
    const { data } = await axios.get(`/api/foods/${singleFood._id}`);
    if (data.countInStock <= 0) {
      window.alert("Sorry. Product is out of stock");
      return;
    }
    dispatch({
      type: "CART_ADD_ITEM",
      payload: { ...singleFood, quantity: 1 },
    });
    router.push("/cartFood");
  };

  return (
    <>
      <div className="container mx-auto section-padding">
        <div className="text-center">
          <Title title={name} subtitle="" description="" />
        </div>
        <div className="grid items-center gap-4 featuredFoods__wrapper md:grid-cols-2">
          <div className="p-6">
            <img src={image} alt={name} />
          </div>
          <div className="p-6">
            <h2 className="text-2xl">{name}</h2>
            <ul className="flex my-3">
              <li>
                <AiOutlineStar className="text-2xl text-yellow-400" />
              </li>
              <li>
                <AiOutlineStar className="text-2xl text-yellow-400" />
              </li>
              <li>
                <AiOutlineStar className="text-2xl text-yellow-400" />
              </li>
              <li>
                <AiOutlineStar className="text-2xl text-yellow-400" />
              </li>
              <li>
                <AiOutlineStar className="text-2xl text-yellow-400" />
              </li>
            </ul>
            <p>${price}</p>
            <p>{description}</p>
            <button className="btn-brand" onClick={addToCartHandler}>
              Add To Cart <FaLongArrowAltRight />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FoodDetails;
