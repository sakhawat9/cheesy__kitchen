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
      <div className="category-food">
        <Title title="Explore Category" subtitle="" description="" />
      </div>

      <div className="category-food__area">
        <div className="container">
          <div className="category-food__area__wrapper">
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
