import axios from "axios";
import Layout from "components/common/Layout";
import Title from "components/common/Title";
import Food from "models/Food";
import Link from "next/link";
import React, { useContext } from "react";
import { BsPlusLg } from "react-icons/bs";
import { GrView } from "react-icons/gr";
import db from "utils/db";
import { Store } from "utils/Store";

const biryani = ({ foods }) => {
  const biryanis = foods.filter((food) => food.category === "biryani");

  return (
    <Layout
      title="Biryani Category | Restaurant Website."
      className="latest-food"
    >
      <div className="latest-food__wrapper  my-12">
        <Title
          subtitle="Our all biryani category food"
          title="Biryani Category Food"
          description=""
        />
        <div className="latest-food__wrapper__cart">
          {biryanis.map((biryani) => (
            <Card key={biryani._id} biryani={biryani} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

const Card = ({ biryani }) => {
  const { state, dispatch } = useContext(Store);
  const addToCartHandler = async () => {
    const { data } = await axios.get(`/api/foods/${food._id}`);
    if (data.countInStock <= 0) {
      window.alert("Sorry. Product is out of stock");
      return;
    }
    dispatch({
      type: "CART_ADD_ITEM",
      payload: { ...food, quantity: 1 },
    });
  };
  return (
    <div className="latest-food__wrapper__cart__items">
      <div className="latest-food__wrapper__cart__items__wrapper">
        <div className="images">
          <img src={biryani.image} alt={biryani.name} />
        </div>
        <div className="flex items-center justify-between">
          <h4>{biryani.name}</h4>
          <h4>${biryani.price}</h4>
        </div>
        <p>{biryani.shortDesc}</p>
      </div>

      <div className="flex add__icon">
        <div className="flex gap-4">
          <button onClick={addToCartHandler}>
            <Link href={`/foods/${biryani.slug}`}>
              <a>
                <GrView />
              </a>
            </Link>
          </button>
          <button onClick={addToCartHandler}>
            <BsPlusLg />
          </button>
        </div>
      </div>
    </div>
  );
};

export default biryani;

export async function getServerSideProps() {
  await db.connect();
  const foods = await Food.find({}).lean();
  await db.disconnect();
  return {
    props: {
      foods: foods.map(db.convertDocToObj),
    },
  };
}
