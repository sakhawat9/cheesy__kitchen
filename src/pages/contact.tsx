import "animate.css/animate.min.css";
import axios, { AxiosRequestConfig } from "axios";
import Layout from "components/common/Layout";
import ContactAvailable from "components/ContactAvailable";
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
      <div className="min-h-screen section-padding">
        <form
          onSubmit={handleSubmit(onSubmitForm)}
          className="w-full p-8 mx-auto md:p-0 md:w-3/5"
        >
          <h1 className="text-center">Contact Us</h1>
          <label>
            <span className="block py-1 text-lg tracking-wide text-gray-900">
              Name
            </span>
            <input
              type="text"
              name="name"
              {...register("name", {
                required: {
                  value: true,
                  message: "You most enter name",
                },
              })}
              className={`block w-full px-4 py-3 placeholder-gray-500 border-gray-300 rounded-md shadow focus:ring-amazon-400 focus:border-amazon-400 focus:outline-none focus:ring-1 mb-3 ${
                errors.name ? "ring-2 ring-red-500" : null
              }`}
              placeholder="Full name"
            />
            <span className="py-2 text-sm text-red-400">
              {errors?.name?.message}
            </span>
          </label>
          <label>
            <span className="block py-1 text-lg tracking-wide text-gray-900">
              Email
            </span>
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
              className={`block w-full px-4 py-3 placeholder-gray-500 border-gray-300 rounded-md shadow focus:ring-amazon-400 focus:border-amazon-400 focus:outline-none focus:ring-1 mb-3${
                errors.email ? "ring-2 ring-red-500" : null
              }`}
              placeholder="Email"
            />
            <span className="py-2 text-sm text-red-400">
              {errors?.email?.message}
            </span>
          </label>

          <label>
            <span className="block py-1 text-lg tracking-wide text-gray-900">
              Phone
            </span>
            <input
              className="block w-full px-4 py-3 mb-3 placeholder-gray-500 border-gray-300 rounded-md shadow focus:ring-amazon-400 focus:border-amazon-400 focus:outline-none focus:ring-1"
              type="text"
              name="phone"
              {...register("phone")}
              placeholder="Phone"
            />
          </label>

          <label>
            <span className="block py-1 text-lg tracking-wide text-gray-900">
              Message
            </span>

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
          <div className="flex justify-center">
            <input
              type="submit"
              className="w-full py-3 mt-4 font-bold text-white rounded md:w-3/5 bg-saffron-500 hover:bg-saffron-600"
              value="Submit"
            />
          </div>
        </form>
      </div>
      <ContactAvailable />
    </Layout>
  );
}
