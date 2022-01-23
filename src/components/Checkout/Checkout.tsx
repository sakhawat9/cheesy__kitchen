import axios from "axios";
import CartItemTwo from "components/CartItem/CartItemTwo";
import Payment from "components/Payment/Payment";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import Swal from "sweetalert2";
import { IFood } from "type";
import { Store } from "utils/Store";

const Checkout = () => {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const {
    cart: { cartItems },
    userInfo,
  } = state;
  const [error, setError] = useState();
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [show, setShow] = useState(true);
  const handlePaymentSuccess = async (paymentInfo: any) => {
    try {
      const { data } = await axios.post(
        "/api/orders/orders",
        {
          phone: phone,
          address: address,
          paymentInfo,
          userInfo,
          cartItems,
        },
        {
          headers: {
            authorization: `Bearer ${userInfo.token}`,
          },
        }
      );

      Swal.fire({
        icon: "success",
        text: "Order successfully",
      });
      dispatch({ type: "CART_CLEAR" });
      Cookies.remove("cartItems");
      // router.push("/enrollcourse");
    } catch (err: any) {
      setError(err);
    }
  };

  return (
    <div className="container section-padding">
      <div className=" cart-content">
        <div className="card-content__checkout lg:w-3/5">
          <div className="p-5 bg-royal-blue-200">
            <div className="flex gap-3 p-3 mb-3 bg-white rounded shadow color-white">
              <h6 className="m-0 text-lg ">
                Total (
                {cartItems.reduce(
                  (a: any, c: { quantity: any }) => a + c.quantity,
                  0
                )}{" "}
                items):
              </h6>{" "}
              <h6 className="m-0 text-lg ">
                <sup>$</sup>
                {cartItems.reduce(
                  (a: number, c: { quantity: number; price: number }) =>
                    a + c.quantity * c.price,
                  0
                )}{" "}
              </h6>
            </div>
            <div className="p-3 mb-3 bg-white rounded shadow color-white">
              <h6>Billing Address</h6>
              <label>Name:</label>
              <input
                className="w-full px-4 py-3 mb-2 rounded focus:border-royal-blue"
                type="text"
                value={userInfo?.name}
              />

              <label>Email:</label>
              <input
                className="w-full px-4 py-3 mb-2 rounded focus:border-royal-blue"
                type="text"
                value={userInfo?.email}
              />

              <label>Phone:</label>
              <input
                className="w-full px-4 py-3 mb-2 rounded focus:border-royal-blue"
                onBlur={(e) => setPhone(e.target.value)}
                type="text"
                placeholder="Enter your Phone"
              />

              <label>Address:</label>
              <textarea
                className="w-full px-4 py-3 mb-2 rounded focus:border-royal-blue"
                onBlur={(e) => setAddress(e.target.value)}
                placeholder="Enter your Address"
              ></textarea>
            </div>
          </div>
        </div>
        <div className="cart-content__item">
          <h5>Select payment method</h5>
          <div
            onClick={() => setShow(true)}
            className="flex items-center gap-3 mb-3"
          >
            <input type="radio" id="stripe" name="method" value="CSS" />{" "}
            <label htmlFor="stripe">New Payment Card</label>
          </div>
          <div
            onClick={() => setShow(false)}
            className="flex items-center gap-3"
          >
            <input type="radio" id="paypal" name="method" value="Paypal" />{" "}
            <label htmlFor="paypal">Paypal</label>
          </div>
          {show ? (
            <Payment
              handlePaymentSuccess={handlePaymentSuccess}
              error={error}
            ></Payment>
          ) : (
            <button className="px-16 py-4 mt-8 text-white uppercase bg-yellow-500 rounded">
              Pay now
            </button>
          )}
        </div>
      </div>
      <ul className="mt-10 cart-course-list">
        <h5>Order details</h5>
        {cartItems.length == 0 ? (
          <div className="py-20 text-xl ">
            Cart is empty.{" "}
            <Link href="/foods">
              <a className="btn-brand">Go Courses Page</a>
            </Link>
          </div>
        ) : (
          cartItems.map((item: IFood) => (
            <CartItemTwo item={item} key={item._id} />
          ))
        )}
      </ul>
    </div>
  );
};

export default Checkout;
