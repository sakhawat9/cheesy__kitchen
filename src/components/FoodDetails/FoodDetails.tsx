import axios from "axios";
import Title from "components/common/Title";
import React, { useContext } from "react";
import { AiOutlineStar } from "react-icons/ai";
import { FaLongArrowAltRight } from "react-icons/fa";
import { IFood } from "type";
import { Store } from "utils/Store";

interface IProp {
  singleFood: IFood;
}

const FoodDetails = ({ singleFood }: IProp) => {
  const { state, dispatch } = useContext(Store);
  console.log(state);

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
  };

  // const addToCartHandler = async () => {
  //   const existItem = state.cart.cartItems.find(
  //     (x) => x._id === singleFood._id
  //   );
  //   const quantity = existItem ? existItem.quantity + 1 : 1;
  //   const { data } = await axios.get(`/api/foods/${singleFood._id}`);
  //   if (data.countInStock < quantity) {
  //     window.alert("Sorry. Product is out of stock");
  //     return;
  //   }
  //   dispatch({ type: "CART_ADD_ITEM", payload: { ...singleFood, quantity } });
  //   // router.push("/cart");
  // };

  return (
    <div className="bg-gray-50">
      <div className="container mx-auto section-padding">
        <div className="text-center ">
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
            <button
              className="inline-flex items-center gap-2 px-3 py-1 mt-6 text-white border-0 rounded bg-saffron-500 focus:outline-none hover:bg-saffron-600"
              onClick={addToCartHandler}
            >
              Add To Card <FaLongArrowAltRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodDetails;
