import Link from "next/link";
import React from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { BsFillSuitHeartFill } from "react-icons/bs";

const FeaturedFood = ({ food }) => {
  const { name, image, price, slug } = food;

  return (
    <Link href={`/foods/${slug}`}>
      <div className="p-6 transition duration-300 ease-in-out transform bg-white rounded shadow cursor-pointer featuredFoods__cart hover:scale-105">
        <div className="relative">
          <img
            className="object-cover object-center w-full h-40 mb-6 rounded"
            src={image}
            alt=""
          />
          <AiOutlineHeart className="absolute text-2xl top-3 right-3" />
        </div>
        <h3 className="pt-4 mt-0 text-2xl">{name}</h3>
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            {price} <BsFillSuitHeartFill className="text-base gray-900" />
          </div>
          <p>1.2 Comments</p>
        </div>
      </div>
    </Link>
  );
};

export default FeaturedFood;
