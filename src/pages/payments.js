import Payment from "components/Checkout/Checkout";
import Layout from "components/common/Layout";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { Store } from "utils/Store";

const Payments = () => {
  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;

  const router = useRouter();
  useEffect(() => {
    if (!userInfo) {
      return router.push("/login?redirect=/checkout");
    }
  }, []);
  return (
    <Layout>
      <div className="text-center cart-head">
        <div className="container">
          <h2>Payments</h2>
        </div>
      </div>
      <Payment></Payment>
    </Layout>
  );
};

export default Payments;
