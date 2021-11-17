import Title from "components/common/Title";
import React from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { BsFillSuitHeartFill } from "react-icons/bs";
import { FaLongArrowAltRight } from "react-icons/fa";

const FeaturedFoods = () => {
  return (
    <div className="bg-gray-50">
      <div className="container mx-auto section-padding">
        <div className="text-center ">
          <Title title="Featured Food" subtitle="" description="" />
        </div>
        <div className="grid grid-cols-2 gap-4 featuredFoods__wrapper md:grid-cols-3">
          <div className="p-6 transition duration-300 ease-in-out transform bg-white rounded shadow featuredFoods__cart hover:scale-105">
            <div className="relative">
              <img
                className="object-cover object-center w-full h-40 mb-6 rounded"
                src="https://cdn.pixabay.com/photo/2019/04/24/12/11/burger-4152013_960_720.jpg"
                alt=""
              />
              <AiOutlineHeart className="absolute text-2xl top-3 right-3" />
            </div>
            <h3 className="pt-4 mt-0 text-2xl">Chicken</h3>
            <div className="flex justify-between">
              <div className="flex items-center gap-2">
                3.5 <BsFillSuitHeartFill className="text-base gray-900" />
              </div>
              <p>1.2 Comments</p>
            </div>
          </div>
          <div className="p-6 transition duration-300 ease-in-out transform bg-white rounded shadow featuredFoods__cart hover:scale-105">
            <div className="relative">
              <img
                className="object-cover object-center w-full h-40 mb-6 rounded"
                src="https://cdn.pixabay.com/photo/2019/04/24/12/11/burger-4152013_960_720.jpg"
                alt=""
              />
              <AiOutlineHeart className="absolute text-2xl top-3 right-3" />
            </div>
            <h3 className="pt-4 mt-0 text-2xl">Chicken</h3>
            <div className="flex justify-between">
              <div className="flex items-center gap-2">
                3.5 <BsFillSuitHeartFill className="text-base gray-900" />
              </div>
              <p>1.2 Comments</p>
            </div>
          </div>
          <div className="p-6 transition duration-300 ease-in-out transform bg-white rounded shadow featuredFoods__cart hover:scale-105">
            <div className="relative">
              <img
                className="object-cover object-center w-full h-40 mb-6 rounded"
                src="https://cdn.pixabay.com/photo/2017/12/09/08/18/pizza-3007395_960_720.jpg"
                alt=""
              />
              <AiOutlineHeart className="absolute text-2xl top-3 right-3" />
            </div>
            <h3 className="pt-4 mt-0 text-2xl">Chicken</h3>
            <div className="flex justify-between">
              <div className="flex items-center gap-2">
                3.5 <BsFillSuitHeartFill className="text-base gray-900" />
              </div>
              <p>1.2 Comments</p>
            </div>
          </div>
        </div>
        <button className="inline-flex items-center gap-2 px-3 py-1 mt-6 text-white border-0 rounded bg-saffron-500 focus:outline-none hover:bg-saffron-600">
          More Featured Foods <FaLongArrowAltRight />
        </button>
      </div>
    </div>
  );
};

export default FeaturedFoods;
