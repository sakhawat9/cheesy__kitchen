import Title from "components/common/Title";
import Link from "next/link";
import React from "react";
import { AiOutlineHeart } from "react-icons/ai";

const LatestFoods = () => {
  return (
    <section className="latest__courses section-padding">
      <div className="container">
        <Title
          subtitle="NEWLY ADDED FOOD AT CHEESY__KITCHEN"
          title="Latest food"
          description=""
        />
      </div>
      <div className="container">
        <div className="flex flex-wrap">
          <div className="px-2 pb-4 transition duration-300 ease-in-out transform sm:w-1/2 xl:w-1/3 hover:scale-105">
            <Link href="#">
              <a>
                <div className="p-6 bg-gray-100 rounded-lg">
                  <div className="relative">
                    <img
                      className="object-cover object-center w-full h-40 mb-6 rounded"
                      src="https://cdn.pixabay.com/photo/2019/04/24/12/11/burger-4152013_960_720.jpg"
                      alt=""
                    />
                    <AiOutlineHeart className="absolute text-2xl top-3 right-3" />
                  </div>

                  <h4 className="mb-2 text-2xl">Food title</h4>
                  <p className="text-base leading-relaxed">
                    Food description Lorem ipsum dolor sit amet consectetur,
                    adipisicing elit. Deserunt, asperiores culpa recusandae
                    architecto dolores earum!
                  </p>
                </div>
              </a>
            </Link>
          </div>
          <div className="px-2 pb-4 transition duration-300 ease-in-out transform sm:w-1/2 xl:w-1/3 hover:scale-105">
            <Link href="#">
              <a>
                <div className="p-6 bg-gray-100 rounded-lg">
                  <div className="relative">
                    <img
                      className="object-cover object-center w-full h-40 mb-6 rounded"
                      src="https://cdn.pixabay.com/photo/2019/04/24/12/11/burger-4152013_960_720.jpg"
                      alt=""
                    />
                    <AiOutlineHeart className="absolute text-2xl top-3 right-3" />
                  </div>

                  <h4 className="mb-2 text-2xl">Food title</h4>
                  <p className="text-base leading-relaxed">
                    Food description Lorem ipsum dolor sit amet consectetur,
                    adipisicing elit. Deserunt, asperiores culpa recusandae
                    architecto dolores earum!
                  </p>
                </div>
              </a>
            </Link>
          </div>
          <div className="px-2 pb-4 transition duration-300 ease-in-out transform sm:w-1/2 xl:w-1/3 hover:scale-105">
            <Link href="#">
              <a>
                <div className="p-6 bg-gray-100 rounded-lg">
                  <div className="relative">
                    <img
                      className="object-cover object-center w-full h-40 mb-6 rounded"
                      src="https://cdn.pixabay.com/photo/2019/04/24/12/11/burger-4152013_960_720.jpg"
                      alt=""
                    />
                    <AiOutlineHeart className="absolute text-2xl top-3 right-3" />
                  </div>

                  <h4 className="mb-2 text-2xl">Food title</h4>
                  <p className="text-base leading-relaxed">
                    Food description Lorem ipsum dolor sit amet consectetur,
                    adipisicing elit. Deserunt, asperiores culpa recusandae
                    architecto dolores earum!
                  </p>
                </div>
              </a>
            </Link>
          </div>
          <div className="px-2 pb-4 transition duration-300 ease-in-out transform sm:w-1/2 xl:w-1/3 hover:scale-105">
            <Link href="#">
              <a>
                <div className="p-6 bg-gray-100 rounded-lg">
                  <div className="relative">
                    <img
                      className="object-cover object-center w-full h-40 mb-6 rounded"
                      src="https://cdn.pixabay.com/photo/2019/04/24/12/11/burger-4152013_960_720.jpg"
                      alt=""
                    />
                    <AiOutlineHeart className="absolute text-2xl top-3 right-3" />
                  </div>

                  <h4 className="mb-2 text-2xl">Food title</h4>
                  <p className="text-base leading-relaxed">
                    Food description Lorem ipsum dolor sit amet consectetur,
                    adipisicing elit. Deserunt, asperiores culpa recusandae
                    architecto dolores earum!
                  </p>
                </div>
              </a>
            </Link>
          </div>
          <div className="px-2 pb-4 transition duration-300 ease-in-out transform sm:w-1/2 xl:w-1/3 hover:scale-105">
            <Link href="#">
              <a>
                <div className="p-6 bg-gray-100 rounded-lg">
                  <div className="relative">
                    <img
                      className="object-cover object-center w-full h-40 mb-6 rounded"
                      src="https://cdn.pixabay.com/photo/2019/04/24/12/11/burger-4152013_960_720.jpg"
                      alt=""
                    />
                    <AiOutlineHeart className="absolute text-2xl top-3 right-3" />
                  </div>

                  <h4 className="mb-2 text-2xl">Food title</h4>
                  <p className="text-base leading-relaxed">
                    Food description Lorem ipsum dolor sit amet consectetur,
                    adipisicing elit. Deserunt, asperiores culpa recusandae
                    architecto dolores earum!
                  </p>
                </div>
              </a>
            </Link>
          </div>
          <div className="px-2 pb-4 transition duration-300 ease-in-out transform sm:w-1/2 xl:w-1/3 hover:scale-105">
            <Link href="#">
              <a>
                <div className="p-6 bg-gray-100 rounded-lg">
                  <div className="relative">
                    <img
                      className="object-cover object-center w-full h-40 mb-6 rounded"
                      src="https://cdn.pixabay.com/photo/2019/04/24/12/11/burger-4152013_960_720.jpg"
                      alt=""
                    />
                    <AiOutlineHeart className="absolute text-2xl top-3 right-3" />
                  </div>

                  <h4 className="mb-2 text-2xl">Food title</h4>
                  <p className="text-base leading-relaxed">
                    Food description Lorem ipsum dolor sit amet consectetur,
                    adipisicing elit. Deserunt, asperiores culpa recusandae
                    architecto dolores earum!
                  </p>
                </div>
              </a>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LatestFoods;
