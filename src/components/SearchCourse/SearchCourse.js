import Link from "next/link";
import React from "react";
import {
    AiFillEye,
    AiFillVideoCamera,
    AiOutlineHeart,
    AiOutlineStar
} from "react-icons/ai";

const SearchCourse = ({ cr }) => {
  const { slug, image, name } = cr;
  return (
    <>
      <div className="w-full p-4 transition duration-100 ease-in-out transform xl:w-1/3 md:w-1/2 hover:scale-105">
        <Link href={`/courses/${slug}`}>
          <a>
            <div className="p-6 bg-gray-100 rounded-lg">
              <div className="relative">
                <img className="w-full mb-4" src={image} alt="" />
                <AiOutlineHeart className="absolute text-2xl top-3 right-3" />
              </div>
              <div className="flex justify-between gap-3 pb-3 mb-3 border-b border-gray-300">
                <div className="flex items-center justify-center gap-1">
                  <AiOutlineStar className="text-2xl text-yellow-400" />
                  4.5
                </div>
                <div className="flex items-center justify-center gap-1">
                  <AiFillEye className="text-2xl text-red-400" /> 2300
                </div>
                <div className="flex items-center justify-center gap-1">
                  <AiFillVideoCamera className="text-2xl text-green-400" />
                  15
                </div>
              </div>
              <h4 className="mb-2 text-base">{name}</h4>
            </div>
          </a>
        </Link>
      </div>
    </>
  );
};

export default SearchCourse;
