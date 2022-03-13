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

const coffee = ({ foods }) => {
  const coffees = foods.filter((food) => food.category === "coffee");

  return (
    <Layout
      title="Coffee Category | Restaurant Website."
      className="latest-food"
    >
      <div className="latest-food__wrapper  my-12">
        <Title
          subtitle="Our all coffee category food"
          title="Coffee Category Food"
          description=""
        />
        <div className="latest-food__wrapper__cart">
          {coffees.map((coffee) => (
            <Card key={coffee._id} coffee={coffee} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

const Card = ({ coffee }) => {
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
          <img src={coffee.image} alt={coffee.name} />
        </div>
        <div className="flex items-center justify-between">
          <h4>{coffee.name}</h4>
          <h4>${coffee.price}</h4>
        </div>
        <p>{coffee.shortDesc}</p>
      </div>

      <div className="flex add__icon">
        <div className="flex gap-4">
          <button onClick={addToCartHandler}>
            <Link href={`/foods/${coffee.slug}`}>
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

export default coffee;

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
