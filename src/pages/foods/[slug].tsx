import Layout from "components/common/Layout";
import FoodDetails from "components/FoodDetails/FoodDetails";
import Food from "models/Food";
import { IFood } from "type";
import db from "../../utils/db";

interface IProps {
  course: IFood;
}

const courseDetails = (props: IProps) => {
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
    </Layout>
  );
};

export default courseDetails;

export async function getServerSideProps(context: { params: any }) {
  const { params } = context;
  const { slug } = params;
  await db.connect();
  const course = await Food.findOne({ slug }).lean();
  const singleFoods = JSON.parse(JSON.stringify(course));
  await db.disconnect();
  return {
    props: {
      singleFoods,
    },
  };
}
