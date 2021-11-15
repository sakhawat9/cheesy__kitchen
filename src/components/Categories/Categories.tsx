import Title from "components/common/Title";
import Image from "next/image";
import React from "react";

const Categories = () => {
  return (
    <div className="category">
      <div className="categories">
        <div className="text-center ">
          <Title
            title="Shop by Category"
            subtitle="Our all category"
            description=""
          />
        </div>
        <div className="categories__wrapper">
          <div className="categories__cart hover:scale-105">
            <div className="categories__cart__image">
              <Image
                width="150"
                height="150"
                src="https://cdn.pixabay.com/photo/2015/03/11/00/31/chicken-667935_960_720.jpg"
                alt=""
              />
            </div>
            <h3>Chicken</h3>
          </div>
          <div className="categories__cart">
            <div className="categories__cart__image">
              <Image
                width="150"
                height="150"
                src="https://cdn.pixabay.com/photo/2019/04/24/12/11/burger-4152013_960_720.jpg"
                alt=""
              />
            </div>
            <h3>Bargar</h3>
          </div>
          <div className="categories__cart">
            <div className="categories__cart__image">
              <Image
                width="150"
                height="150"
                src="https://cdn.pixabay.com/photo/2017/12/09/08/18/pizza-3007395_960_720.jpg"
                alt=""
              />
            </div>
            <h3>Pizza</h3>
          </div>
          <div className="categories__cart">
            <div className="categories__cart__image">
              <Image
                width="150"
                height="150"
                src="https://cdn.pixabay.com/photo/2015/05/07/13/46/cappuccino-756490_960_720.jpg"
                alt=""
              />
            </div>
            <h3>Copy</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
