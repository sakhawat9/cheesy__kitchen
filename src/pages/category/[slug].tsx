import Title from "components/common/Title";
import FeaturedFood from "components/FeaturedFoods/FeaturedFood";
import Food from "models/Food";
import db from "utils/db";

const FeaturedFoods = ({ categoryFood }) => {
  return (
    <div className="mb-24 bg-gray-50">
      <div className="container mx-auto section-padding">
        <div className="text-center ">
          <Title title="Featured Food" subtitle="" description="" />
        </div>
        <div className="grid grid-cols-2 gap-4 featuredFoods__wrapper md:grid-cols-3">
          {categoryFood?.map((food) => (
            <FeaturedFood key={food._id} food={food} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedFoods;

export async function getServerSideProps() {
  await db.connect();
  const foods = await Food.find({}).lean();

  await db.disconnect();
  return {
    props: {
      categoryFood: foods.map(db.convertDocToObj),
    },
  };
}
