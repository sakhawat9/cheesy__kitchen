import axios from "axios";
import Title from "components/common/Title";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { Store } from "utils/Store";

const Login = () => {
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

  const submitHandler = async ({ email, password }) => {
    try {
      const { data } = await axios.post("/api/users/login", {
        email,
        password,
      });

      dispatch({ type: "USER_LOGIN", payload: data });
      Cookies.set("userInfo", JSON.stringify(data));
      Swal.fire(`Welcome`, "You logged in successfully!", "success");
      router.push(redirect || "/");
    } catch (err) {
      Swal.fire({
        icon: "error",
        text: err.message ? "Your email or password is not valid." : "",
      });
    }
  };

  return (
    <div className="login">
      <div className="login__wrapper">
        <Title title="Log in now" subtitle="" description="" />
        <form className="login__form" onSubmit={handleSubmit(submitHandler)}>
          <label>
            <span className="login__form__title">Email</span>
            <input
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
              className={`
           ${errors.email ? "ring-2 ring-red-500" : null}`}
              placeholder="Email"
            />
            <span className="py-2 text-sm text-red-400">{errors?.email?.message}</span>
          </label>

          <label>
            <span className="login__form__title">Password</span>
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
              className={`
               ${errors.password ? "ring-2 ring-red-500" : null}`}
              placeholder="password"
            />
            <span className="py-2 text-sm text-red-400">
              {errors?.password?.message}
            </span>
          </label>
          <div className="tracking-wide text-gray-900">
            <Link href="#">
              <a className="border-b border-saffron-600">Forgot Password?</a>
            </Link>
          </div>
          <span className="w-full">
            <input type="submit" className="btn-brand" value="Log in now" />
          </span>
        </form>
        <p className="text-center d-block">
          Don't have an account?{" "}
          <Link href="/register">
            <a className="border-b border-saffron-600 text-amazon-600">
              Create an account
            </a>
          </Link>
        </p>
        <ul className="pt-8">
          <li className="block w-full mx-auto mb-4 text-xl ">
            <strong>Login Infos</strong>
          </li>
          <div className="gap-2 md:flex">
            <li className="block w-full p-3 mx-auto mb-4 border-2 md:w-1/2 md:mb-0 ">
              <strong>Admin: </strong>
              admin@gmail.com <span>(123456)</span>
            </li>
            <li className="block w-full p-3 mx-auto border-2 md:w-1/2 ">
              <strong>User: </strong>
              user@gmail.com <span>(123456)</span>
            </li>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default Login;
