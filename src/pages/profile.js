// eslint-disable-next-line react/jsx-props-no-spreading
import axios from "axios";
import Layout from "components/common/Layout";
import Title from "components/common/Title";
import Cookies from "js-cookie";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { Store } from "utils/Store";

function Profile() {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm();
  const router = useRouter();
  const { redirect } = router.query;
  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;

  useEffect(() => {
    if (!userInfo) {
      return router.push("/login");
    }
    setValue("name", userInfo?.name);
    setValue("email", userInfo?.email);
    setValue("img", userInfo?.img);
    setValue("facebook", userInfo?.facebook);
    setValue("linkedIn", userInfo?.linkedIn);
    setValue("twitter", userInfo?.twitter);
  }, []);

  const submitHandler = async ({
    name,
    email,
    img,
    facebook,
    twitter,
    linkedIn,
    password,
    confirmPassword,
  }) => {
    if (password !== confirmPassword) {
      Swal.fire({
        icon: "error",
        text: "Password don't match",
      });
      return;
    }
    try {
      const { data } = await axios.put(
        "/api/users/profile",
        {
          name,
          email,
          password,
          img,
          facebook,
          linkedIn,
          twitter,
        },
        { headers: { authorization: `Bearer ${userInfo.token}` } }
      );

      dispatch({ type: "USER_LOGIN", payload: data });
      Cookies.set("userInfo", JSON.stringify(data));
      Swal.fire({
        icon: "success",
        text: "Profile updated successfully",
      });
      router.push("/");
    } catch (err) {
      Swal.fire({
        icon: "error",
        text: err.message ? "Profile updated failed" : "",
      });
    }
  };

  return (
    <Layout>
      <div className="register">
        <div className="register__wrapper">
          <Title title="Create an account" subtitle="" description="" />
        </div>
        <form className="login__form" onSubmit={handleSubmit(submitHandler)}>
          <label>
            <span className="login__form__title">
              Name<span className="text-red-600"> *</span>
            </span>
            <span className="block">
              <input
                onChange={() => {}}
                type="text"
                name="name"
                {...register("name", {
                  required: {
                    value: true,
                    message: "You most enter name",
                  },
                })}
                className={` ${errors.name ? "ring-2 ring-red-500" : null}`}
                placeholder="Full name"
              />
              <span className="py-2 text-sm text-red-400">
                {errors?.name?.message}
              </span>
            </span>
          </label>
          <label>
            <span className="login__form__title">
              Email<span className="text-red-600"> *</span>
            </span>
            <span className="block">
              <input
                onChange={() => {}}
                type="email"
                name="Email"
                {...register("email", {
                  required: {
                    value: true,
                    message: "You most enter email address",
                  },
                  minLength: {
                    value: 8,
                    message: "This is not long enough to be an email",
                  },
                  maxLength: {
                    value: 120,
                    message: "This is too long",
                  },
                  pattern: {
                    value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                    message: "invalid email address",
                  },
                })}
                className={`${errors.email ? "ring-2 ring-red-500" : null}`}
                placeholder="Email"
              />
              <span className="py-2 text-sm text-red-400">
                {errors?.email?.message}
              </span>
            </span>
          </label>
          <label>
            <span className="login__form__title">
              Password<span className="text-red-600"> *</span>
            </span>
            <span className="block">
              <input
                type="password"
                name="password"
                {...register("password", {
                  required: {
                    value: true,
                    message: "You most enter password",
                  },
                  minLength: {
                    value: 6,
                    message: "Password lenth is more then 5",
                  },
                })}
                className={`${errors.password ? "ring-2 ring-red-500" : null}`}
                placeholder="Password"
              />
              <span className="py-2 text-sm text-red-400">
                {errors?.password?.message}
              </span>
            </span>
          </label>
          <label>
            <span className="login__form__title">
              Conform Password<span className="text-red-600"> *</span>
            </span>
            <span className="block">
              <input
                type="password"
                name="confirmPassword"
                {...register("confirmPassword", {
                  required: {
                    value: true,
                    message: "You most enter confirm Password",
                  },
                  minLength: {
                    value: 6,
                    message: "confirm Password lenth is more then 5",
                  },
                })}
                className={`${errors.confirmPassword ? "ring-2 ring-red-500" : null}`}
                placeholder="Confirm Password"
              />
              <span className="py-2 text-sm text-red-400">
                {errors?.confirmPassword?.message}
              </span>
            </span>
          </label>
          <label>
            <span className="login__form__title">
              Image
            </span>
            <span className="block">
              <input
                onChange={() => {}}
                type="text"
                name="img"
                {...register("img", {})}
                placeholder="Image URL"
              />
              <span className="py-2 text-sm text-red-400"></span>
            </span>
          </label>
          <label>
            <span className="login__form__title">
              Facebook
            </span>
            <span className="block">
              <input
                onChange={() => {}}
                type="text"
                name="facebook"
                {...register("facebook", {})}
                placeholder="Facebook URL"
              />
              <span className="py-2 text-sm text-red-400"></span>
            </span>
          </label>
          <label>
            <span className="login__form__title">
              LinkedIn
            </span>
            <span className="block">
              <input
                onChange={() => {}}
                type="text"
                name="linkedIn"
                {...register("linkedIn", {})}
                placeholder="LinkedIn URL"
              />
              <span className="py-2 text-sm text-red-400"></span>
            </span>
          </label>
          <label>
            <span className="login__form__title">
              Twitter
            </span>
            <span className="block">
              <input
                onChange={() => {}}
                type="text"
                name="twitter"
                {...register("twitter", {})}

                placeholder="Twitter URL"
              />
              <span className="py-2 text-sm text-red-400"></span>
            </span>
          </label>
          <span className="block w-full mx-auto lg:w-4/5 ">
            <input
              type="submit"
              className="flex w-full px-6 py-3 text-lg text-white bg-indigo-600 border-0 rounded cursor-pointer focus:outline-none hover:bg-aquamarine-800"
              value="Update Account"
            />
          </span>
        </form>
      </div>
    </Layout>
  );
}

export default dynamic(() => Promise.resolve(Profile), { ssr: false });
