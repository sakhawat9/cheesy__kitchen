import Title from "components/common/Title";
import React from "react";
import data from "./CategoriesData";
import CategoryCart from "./CategoryCart";

const CategoryFood = () => {
  interface ICategory {
    id: number;
    name: string;
    img: string;
    link: string;
  }

  return (
    <>
      <div className="py-20 text-center bg-gray-50">
        <Title title="Explore Category" subtitle="" description="" />
      </div>

      <div className="py-20 bg-white-100">
        <div className="container">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
            {data?.map((fd: ICategory) => (
              <CategoryCart key={fd.id} fd={fd} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryFood;
