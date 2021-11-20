import Layout from "components/common/Layout";
import Login from "components/Login/Login";
import type { NextPage } from "next";

const login: NextPage = () => {
  return (
    <Layout>
      <Login />
    </Layout>
  );
};

export default login;
