// eslint-disable-next-line react/jsx-props-no-spreading
// import img from "assets/images/cycle.png";
import Layout from "components/common/Layout";
import Title from "components/common/Title";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Store } from "utils/Store";

const Shipping = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm();
  const router = useRouter();
  const { redirect } = router.query;
  const { state, dispatch } = useContext(Store);
  const {
    userInfo,
    cart: { shippingAddress },
  } = state;
  useEffect(() => {
    if (!userInfo) {
      return router.push("/login?redirect=/shipping");
    }
    setValue("fullName", shippingAddress?.fullName);
    setValue("address", shippingAddress?.address);
    setValue("city", shippingAddress?.city);
    setValue("postalCode", shippingAddress?.postalCode);
    setValue("country", shippingAddress?.country);
  }, []);

  const submitHandler = ({ fullName, address, city, postalCode, country }) => {
    dispatch({
      type: "SAVE_SHIPPING_ADDRESS",
      payload: { fullName, address, city, postalCode, country },
    });
    Cookies.set(
      "shippingAddress",
      JSON.stringify({
        fullName,
        address,
        city,
        postalCode,
        country,
      })
    );
    router.push(redirect || "/payment");
  };

  return (
    <Layout>
      <div className="shipping">
        <div className="shipping__wrapper">
          <Title
            title="Shipping Address"
            subtitle="select your shipping address"
            description=""
          />
          <form
            className="shipping__form"
            onSubmit={handleSubmit(submitHandler)}
          >
            <label>
              <span className="shipping__form__title">Name</span>
              <span className="block">
                <input
                  type="text"
                  name="name"
                  {...register("name", {
                    required: {
                      value: true,
                      message: "You most enter name",
                    },
                  })}
                  className={`${errors.name ? "ring-1 ring-red-500" : null}`}
                  placeholder="Full name"
                />
                <span className="py-2 text-sm text-red-400">
                  {errors?.name?.message}
                </span>
              </span>
            </label>
            <label>
              <span className="shipping__form__title">Address</span>
              <span className="block">
                <input
                  type="text"
                  name="address"
                  {...register("address", {
                    required: {
                      value: true,
                      message: "You most enter address",
                    },
                  })}
                  className={`${errors.name ? "ring-1 ring-red-500" : null}`}
                  placeholder="Address"
                />
                <span className="py-2 text-sm text-red-400">
                  {errors?.name?.message}
                </span>
              </span>
            </label>
            <label>
              <span className="shipping__form__title">City</span>
              <span className="block">
                <input
                  type="text"
                  name="city"
                  {...register("city", {
                    required: {
                      value: true,
                      message: "You most enter city",
                    },
                  })}
                  className={`${errors.name ? "ring-1 ring-red-500" : null}`}
                  placeholder="City"
                />
                <span className="py-2 text-sm text-red-400">
                  {errors?.name?.message}
                </span>
              </span>
            </label>
            <label>
              <span className="shipping__form__title">Postal Code</span>
              <span className="block">
                <input
                  type="text"
                  name="postalCode"
                  {...register("postalCode", {
                    required: {
                      value: true,
                      message: "You most enter postal code",
                    },
                  })}
                  className={`${errors.name ? "ring-1 ring-red-500" : null}`}
                  placeholder="Postal Code"
                />
                <span className="py-2 text-sm text-red-400">
                  {errors?.name?.message}
                </span>
              </span>
            </label>
            <label>
              <span className="shipping__form__title">Country</span>
              <span className="block">
                <input
                  type="text"
                  name="country"
                  {...register("country", {
                    required: {
                      value: true,
                      message: "You most enter country",
                    },
                  })}
                  className={`${errors.name ? "ring-1 ring-red-500" : null}`}
                  placeholder="Country"
                />
                <span className="py-2 text-sm text-red-400">
                  {errors?.name?.message}
                </span>
              </span>
            </label>

            <div className="mt-4 form-element ">
              <span className="block w-full mx-auto ">
                <input type="submit" className="btn-brand" value="Continue" />
              </span>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Shipping;
