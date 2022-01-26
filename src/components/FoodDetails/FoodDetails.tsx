import axios from "axios";
import Title from "components/common/Title";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import {
  AiOutlineCheckCircle,
  AiOutlineDollar,
  AiOutlineStar,
} from "react-icons/ai";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaLongArrowAltRight,
  FaPinterestP,
  FaTwitter,
  FaWhatsapp,
} from "react-icons/fa";
import { MdOutlineDeliveryDining } from "react-icons/md";
import { IFood } from "type";
import { Store } from "utils/Store";

interface IProp {
  singleFood: IFood;
}

const FoodDetails = ({ singleFood }: IProp) => {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);

  const { name, image, price, shortDesc } = singleFood;
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
    router.push("/shipping");
  };

  return (
    <>
      <div className="container mx-auto section-padding">
        <div className="text-center">
          <Title title={name} subtitle="" description="" />
        </div>
        <div className="grid items-center gap-4 featuredFoods__wrapper md:grid-cols-12">
          <div className="col-span-12 p-6 lg:col-span-5">
            <img src={image} alt={name} />
          </div>
          <div className="col-span-12 lg:col-span-7">
            <div className="row">
              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-12 md:col-span-7">
                  <div className="p-6">
                    <div className="flex items-center justify-between">
                      <h2 className="text-2xl">{name}</h2>
                      <h2 className="text-2xl">${price}</h2>
                    </div>
                    <div className="flex items-center justify-between">
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
                      <p>10 Review</p>
                    </div>
                    <p>{shortDesc}</p>
                    <button className="btn-brand" onClick={addToCartHandler}>
                      Add To Cart <FaLongArrowAltRight />
                    </button>
                    <ul className="flex gap-2 mt-4">
                      <li className="flex items-center justify-center w-8 h-8 bg-blue-900 rounded-full hover:bg-blue-800">
                        <Link href="https://www.facebook.com/sakawat.hossain.338211">
                          <a target="_blank">
                            <FaFacebookF className="text-xl text-white" />
                          </a>
                        </Link>
                      </li>
                      <li className="flex items-center justify-center w-8 h-8 bg-blue-500 rounded-full hover:bg-blue-400">
                        <Link href="#">
                          <a target="_blank">
                            <FaTwitter className="text-xl text-white" />
                          </a>
                        </Link>
                      </li>
                      <li className="flex items-center justify-center w-8 h-8 bg-blue-600 rounded-full hover:bg-blue-700">
                        <Link href="www.linkedin.com/in/shjsdev">
                          <a target="_blank">
                            <FaLinkedinIn className="text-xl text-white" />
                          </a>
                        </Link>
                      </li>
                      <li className="flex items-center justify-center w-8 h-8 bg-red-600 rounded-full hover:bg-red-500">
                        <Link href="#">
                          <a target="_blank">
                            <FaPinterestP className="text-xl text-white" />
                          </a>
                        </Link>
                      </li>
                      <li className="flex items-center justify-center w-8 h-8 bg-green-600 rounded-full hover:bg-green-500">
                        <Link href="#">
                          <a target="_blank">
                            <FaWhatsapp className="text-xl text-white" />
                          </a>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-span-12 md:col-span-5">
                  <div className="rounded p-7 row bg-blue-50">
                    <div className="grid grid-cols-12 gap-4">
                      <div className="flex items-center justify-center col-span-2">
                        <MdOutlineDeliveryDining className="text-2xl text-gray-500" />
                      </div>
                      <div className="col-span-10 text-sm">
                        <p>Delivery search $15 any where in Bangladesh</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-12 gap-4 pt-7">
                      <div className="flex items-center justify-center col-span-2">
                        <AiOutlineCheckCircle className="text-2xl text-gray-500" />
                      </div>
                      <div className="col-span-10 text-sm">
                        <p>Guranteed 100% Organic from natural farmas</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-12 gap-4 pt-7">
                      <div className="flex items-center justify-center col-span-2">
                        <AiOutlineDollar className="text-2xl text-gray-500" />
                      </div>
                      <div className="col-span-10 text-sm">
                        <p>1 Day Returns if you change your mind</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FoodDetails;
