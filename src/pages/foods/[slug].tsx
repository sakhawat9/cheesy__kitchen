import Layout from "components/common/Layout";
import FoodDetails from "components/FoodDetails/FoodDetails";
import FoodDetailsBottom from "components/FoodDetails/FoodDetailsBottom";
import Food from "models/Food";
import { IFood } from "type";
import db from "../../utils/db";

interface IProps {
  course: IFood;
}

const foodDetails = (props: IProps) => {
  const { singleFoods }: any = props;

  if (!singleFoods) {
    return (
      <Layout>
        <div className="container py-20 text-center">Loading...</div>
      </Layout>
    );
  }

  return (
    <Layout title={singleFoods.name}>
      <FoodDetails singleFood={singleFoods} />
      <FoodDetailsBottom singleFood={singleFoods} />
    </Layout>
  );
};

export default foodDetails;

export async function getServerSideProps(context: { params: any }) {
  const { params } = context;
  const { slug } = params;
  await db.connect();
  const food = await Food.findOne({ slug }).lean();
  const singleFoods = JSON.parse(JSON.stringify(food));
  await db.disconnect();
  return {
    props: {
      singleFoods,
    },
  };
}
