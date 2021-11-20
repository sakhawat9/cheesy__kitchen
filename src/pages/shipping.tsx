// eslint-disable-next-line react/jsx-props-no-spreading
// import img from "assets/images/cycle.png";
import axios from "axios";
import Layout from "components/common/Layout";
import Title from "components/common/Title";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { Store } from "utils/Store";

const Shipping = () => {
  const [user, setUser] = useState(false);
  const [instructor, setInstructor] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const { redirect } = router.query;
  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;

  useEffect(() => {
    if (userInfo) {
      router.push("/");
    }
  }, []);

  const submitHandler = async ({ name, email, password, confirmPassword }) => {
    if (password !== confirmPassword) {
      Swal.fire({
        icon: "error",
        text: "Password don't match",
      });
      return;
    }
    try {
      const { data } = await axios.post("/api/users/register", {
        name,
        email,
        password,
        user,
        instructor,
      });

      dispatch({ type: "USER_LOGIN", payload: data });
      Cookies.set("userInfo", JSON.stringify(data));
      // router.push(redirect || "/");
    } catch (err) {
      Swal.fire({
        icon: "error",
        text: err.message ? "Your email already added" : "",
      });
    }
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
