// eslint-disable-next-line react/jsx-props-no-spreading
import axios from "axios";
import Layout from "components/common/Layout";
import Title from "components/common/Title";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { Store } from "utils/Store";

const ReviewForm = () => {
  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;

  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm();

  useEffect(() => {
    if (!userInfo) {
      return router.push("/login");
    }
    setValue("name", userInfo?.name);
    setValue("email", userInfo?.email);
    setValue("img", userInfo?.img);
    setValue("description", userInfo?.description);
  }, []);

  const router = useRouter();

  const submitHandler = async ({ name, email, img, description }) => {
    try {
      const { data } = await axios.post("/api/review", {
        name,
        email,
        img,
        description,
      });

      dispatch({ type: "USER_LOGIN", payload: data });
      Swal.fire({
        icon: "success",
        text: "Your Email successfully",
      });
      router.push("/");
    } catch (err) {
      Swal.fire({
        icon: "error",
        text: err.message,
      });
    }
  };

  return (
    <Layout>
      <div className="register">
        <div className="register__wrapper">
          <Title title="Add Review" subtitle="" description="" />
        </div>
        <form className="register__form" onSubmit={handleSubmit(submitHandler)}>
          <label>
            <span className="register__form__title">Name</span>
            <input
              type="text"
              name="name"
              {...register("name", {
                required: {
                  value: true,
                  message: "You most enter name",
                },
              })}
              className={`${errors.name ? "ring-2 ring-red-500" : null}`}
              placeholder="Full name"
            />
            <span className="py-2 text-sm text-red-400">
              {errors?.name?.message}
            </span>
          </label>
          <label>
            <span className="register__form__title">Email</span>
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
              className={`${errors.email ? "ring-2 ring-red-500" : null}`}
              placeholder="Email"
            />
            <span className="py-2 text-sm text-red-400">
              {errors?.email?.message}
            </span>
          </label>
          <label>
            <span className="login__form__title">Image</span>
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
            <span className="register__form__title">Description</span>
            <input
              type="text"
              name="description"
              {...register("description", {
                required: {
                  value: true,
                  message: "You most enter description",
                },
              })}
              className={`${errors.description ? "ring-2 ring-red-500" : null}`}
              placeholder="Your Description"
            />
            <span className="py-2 text-sm text-red-400">
              {errors?.description?.message}
            </span>
          </label>
          <span className="w-full">
            <input
              type="submit"
              className="w-full text-white rounded bg-saffron-600"
              value="Add Review"
            />
          </span>
        </form>
      </div>
    </Layout>
  );
};

export default ReviewForm;
