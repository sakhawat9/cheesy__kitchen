import "animate.css/animate.min.css";
import axios, { AxiosRequestConfig } from "axios";
import Layout from "components/common/Layout";
import Title from "components/common/Title";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { cssTransition, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const zoomIn = cssTransition({
  enter: "animate__animated animate__zoomIn",
  exit: "animate__animated animate__zoomIn",
});

export default function Home() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const router = useRouter();
  async function onSubmitForm(values: any): Promise<void> {
    let config: AxiosRequestConfig = {
      method: "post",
      url: `/api/contact`,
      headers: {
        "Content-Type": "application/json",
      },
      data: values,
    };

    try {
      const response = await axios(config);

      if (response.status === 200) {
        toast.success("Your mail submitted!", {
          position: toast.POSITION.TOP_CENTER,
          transition: zoomIn,
        });
        reset();
      }
    } catch (err) {
      toast.error(err.message);
    }
  }

  return (
    <Layout>
      <ToastContainer />
      <div className="register">
        <div className="register__wrapper">
          <Title title="Contact Us" subtitle="" description="" />
        </div>
        <form onSubmit={handleSubmit(onSubmitForm)} className="register__form">
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
            <span className="register__form__title">Phone</span>
            <input
              type="text"
              name="phone"
              {...register("phone")}
              placeholder="Phone"
            />
          </label>

          <label>
            <span className="register__form__title">Message</span>

            <textarea
              name="message"
              {...register("message", {
                required: {
                  value: true,
                  message: "You need to enter your message",
                },
                maxLength: {
                  value: 1000,
                  message: "You message can't be more than 1000 characters",
                },
                minLength: {
                  value: 50,
                  message: "You message must be longer then this!",
                },
              })}
              className={`block w-full px-4 py-3 placeholder-gray-500 border-gray-300 rounded-md shadow focus:ring-blue-500 focus:border-blue-500 focus:outline-none focus:ring-2
               ${errors.message ? "ring-2 ring-red-500" : null}`}
              placeholder="Message"
            />
            <span className="py-2 text-sm text-red-400">
              {errors?.message?.message}
            </span>
          </label>
          <input
            type="submit"
            className="w-full mt-4 text-white rounded bg-saffron-600"
            value="Submit"
          />
        </form>
      </div>
    </Layout>
  );
}
