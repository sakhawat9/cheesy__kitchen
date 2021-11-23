// eslint-disable-next-line react/jsx-props-no-spreading
import axios from "axios";
import Title from "components/common/Title";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { Store } from "utils/Store";

const Comments = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const { dispatch } = useContext(Store);

  const submitHandler = async ({ name, email }) => {
    try {
      const { data } = await axios.post("/api/comments", {
        name,
        email,
      });

      dispatch({ type: "USER_LOGIN", payload: data });
    } catch (err) {
      Swal.fire({
        icon: "error",
        text: err.message,
      });
    }
  };

  return (
    <>
      <div className="comments">
        <div className="container comments__wrapper">
          <Title title="Add Your Comments" subtitle="" description="" />
        </div>
        <form className="comments__form" onSubmit={handleSubmit(submitHandler)}>
          <label>
            <span className="comments__form__title">Name</span>

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
              className={`${errors.email ? "ring-2 ring-red-500" : null}`}
              placeholder="Email"
            />
            <span className="py-2 text-sm text-red-400">
              {errors?.email?.message}
            </span>
          </label>

          <span className="w-full">
            <input
              type="submit"
              className="w-full text-white rounded bg-saffron-600"
              value="Upload"
            />
          </span>
        </form>
      </div>
    </>
  );
};

export default Comments;
