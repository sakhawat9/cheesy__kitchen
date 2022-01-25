import Layout from "components/common/Layout";
import Title from "components/common/Title";
import SearchCourse from "components/SearchCourse/SearchCourse";
import Food from "models/Food";
import { useRouter } from "next/router";
import db from "utils/db";

const prices = [
  {
    name: "$1 to $50",
    value: "1-50",
  },
  {
    name: "$51 to $200",
    value: "51-200",
  },
  {
    name: "$201 to $1000",
    value: "201-1000",
  },
];

const search = (props) => {
  const router = useRouter();
  const {
    query = "all",
    name = "all",
    category = "all",
    level = "all",
    price = "all",
  } = router.query;
  const { foods, countFoods } = props;

  const filterSearch = ({
    name,
    category,
    searchQuery,
    price,
    level,
    min,
    max,
  }) => {
    const path = router.pathname;
    const { query } = router;
    if (searchQuery) query.searchQuery = searchQuery;
    if (name) query.name = name;
    if (category) query.category = category;
    if (price) query.price = price;
    if (level) query.level = level;
    if (min) query.min ? query.min : query.min === 0 ? 0 : min;
    if (max) query.max ? query.max : query.max === 0 ? 0 : max;

    router.push({
      pathname: path,
      query: query,
    });
  };

  return (
    <Layout>
      <Title background="bg-gray-50" title="Your search result" subtitle="" />
      <div className="py-20">
        <div className="container">
          <div className="flex flex-wrap">
            {foods.map((cr) => (
              <SearchCourse key={cr._id} cr={cr} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default search;

export async function getServerSideProps({ query }) {
  await db.connect();
  const name = query.name || "";
  const category = query.category || "";
  const level = query.level || "";
  const price = query.price || "";
  const searchQuery = query.query || "";

  const queryFilter =
    searchQuery && searchQuery !== "all"
      ? {
          name: {
            $regex: searchQuery,
            $options: "i",
          },
        }
      : {};

  const nameFilter = name && name !== "all" ? { name } : {};
  const categoryFilter =
  category && category !== "all" ? { category } : {};
  const levelFilter = level && level !== "all" ? { level } : {};

  const priceFilter =
    price && price !== "all"
      ? {
          price: {
            $gte: Number(price.split("-")[0]),
            $lte: Number(price.split("-")[1]),
          },
        }
      : {};

  const foodsDoce = await Food.find(
    {
      ...queryFilter,
      ...categoryFilter,
      ...priceFilter,
      ...nameFilter,
      ...levelFilter,
    },
    "-reviews"
  ).lean();

  const countFoods = await Food.countDocuments({
    ...queryFilter,
    ...categoryFilter,
    ...priceFilter,
    ...nameFilter,
    ...levelFilter,
  });
  await db.disconnect();
  const foods = JSON.parse(JSON.stringify(foodsDoce));
  return {
    props: {
      foods,
      countFoods,
      category,
    },
  };
}
