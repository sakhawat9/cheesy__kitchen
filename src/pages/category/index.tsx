import CategoryFood from "components/Categories/CategoryFood";
import Layout from "components/common/Layout";
import { NextPage } from "next";

const category: NextPage = () => {
  return (
    <Layout>
      <CategoryFood />
    </Layout>
  );
};

export default category;
