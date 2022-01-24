import axios from "axios";
// import Layout from "components/utilities/Layout";
import Layout from "components/common/Layout";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useContext, useEffect, useReducer } from "react";
import { useForm } from "react-hook-form";
import { Store } from "utils/Store";

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, error: "" };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    case "UPLOAD_REQUEST":
      return { ...state, loadingUpload: true, errorUpload: "" };
    case "UPLOAD_SUCCESS":
      return {
        ...state,
        loadingUpload: false,
        errorUpload: "",
      };
    case "UPLOAD_FAIL":
      return { ...state, loadingUpload: false, errorUpload: action.payload };
    default:
      return state;
  }
}

function FoodEdit({ params }) {
  const productId = params.id;
  const { state } = useContext(Store);
  const [{ loading, error, loadingUpdate, loadingUpload }, dispatch] =
    useReducer(reducer, {
      loading: true,
      error: "",
    });

  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
    setValue,
  } = useForm();
  const router = useRouter();
  const { userInfo } = state;
  useEffect(() => {
    if (!userInfo) {
      return router.push("/login");
    } else {
      const fetchData = async () => {
        try {
          dispatch({ type: "FETCH_REQUEST" });
          const { data } = await axios.get(`/api/admin/foods/${productId}`, {
            headers: { authorization: `Bearer ${userInfo.token}` },
          });
          dispatch({ type: "FETCH_SUCCESS" });
          setValue("title", data.title);
          setValue("slug", data.slug);
          setValue("shortDesc", data.shortDesc);
          setValue("categories", data.categories);
          setValue("level", data.level);
          setValue("price", data.price);
          setValue("foodProvider", data.foodProvider);
          setValue("videoUrl", data.videoUrl);
          setValue("img", data.img);
          setValue("description", data.description);
        } catch (err) {
          Swal.fire({
            icon: "error",
            text: err.message,
          });
        }
      };
      fetchData();
    }
  }, []);

  const submitHandler = async ({
    title,
    slug,
    shortDesc,
    categories,
    level,
    price,
    foodProvider,
    videoUrl,
    img,
    description,
  }) => {
    try {
      dispatch({ type: "UPDATE_REQUEST" });
      const { data } = await axios.put(
        `/api/admin/foods/${productId}`,
        {
          title,
          slug,
          shortDesc,
          categories,
          level,
          price,
          foodProvider,
          videoUrl,
          img,
          description,
        },
        { headers: { authorization: `Bearer ${userInfo.token}` } }
      );
      dispatch({ type: "UPDATE_SUCCESS" });
      alert("Foods updated successfully");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <Layout title="Food Update">
      <div className="flex items-center justify-center min-h-screen overflow-x-hidden lg:overflow-x-auto lg:overflow-hidden">
        <div className="flex flex-col flex-wrap justify-between w-full login-container lg:w-4/5 lg:flex-nowrap lg:flex-row group">
          <div className="order-1 w-full min-h-screen lg:order-2">
            <div className="relative flex items-center min-h-screen px-10 pt-16 form-wrapper lg:pt-0">
              <div className="w-full space-y-2">
                <div className="flex items-end justify-center mb-8 space-x-3 text-center form-caption">
                  <span className="text-3xl font-semibold text-royal-blue">
                    Food Update
                  </span>
                </div>
                <form onSubmit={handleSubmit(submitHandler)}>
                  <div className="form-element">
                    <label className="space-y-0.5 w-full lg:w-4/5 block mx-auto">
                      <span className="block text-lg tracking-wide text-gray-800">
                        Title
                      </span>
                      <span className="block">
                        <input
                          type="text"
                          name="title"
                          // eslint-disable-next-line react/jsx-props-no-spreading
                          {...register("title", {
                            required: {
                              value: true,
                              message: "You most enter title",
                            },
                          })}
                          className={`block w-full px-4 py-3 placeholder-gray-500 border-gray-300 rounded-md shadow focus:ring-blue-500 focus:border-blue-500 focus:outline-none focus:ring-2
               ${errors.name ? "ring-2 ring-red-500" : null}`}
                        />
                        <span className="py-2 text-sm text-red-400">
                          {errors?.name?.message}
                        </span>
                      </span>
                    </label>
                  </div>
                  <div className="form-element">
                    <label className="space-y-0.5 w-full lg:w-4/5 block mx-auto">
                      <span className="block text-lg tracking-wide text-gray-800">
                        Slug
                      </span>
                      <span className="block">
                        <input
                          type="text"
                          name="slug"
                          // eslint-disable-next-line react/jsx-props-no-spreading
                          {...register("slug", {
                            required: {
                              value: true,
                              message: "You most enter slug",
                            },
                          })}
                          className={`block w-full px-4 py-3 placeholder-gray-500 border-gray-300 rounded-md shadow focus:ring-blue-500 focus:border-blue-500 focus:outline-none focus:ring-2
               ${errors.name ? "ring-2 ring-red-500" : null}`}
                        />
                        <span className="py-2 text-sm text-red-400">
                          {errors?.name?.message}
                        </span>
                      </span>
                    </label>
                  </div>
                  <div className="form-element">
                    <label className="space-y-0.5 w-full lg:w-4/5 block mx-auto">
                      <span className="block text-lg tracking-wide text-gray-800">
                        ShortDesc
                      </span>
                      <span className="block">
                        <input
                          type="text"
                          name="shortDesc"
                          // eslint-disable-next-line react/jsx-props-no-spreading
                          {...register("shortDesc", {
                            required: {
                              value: true,
                              message: "You most enter shortDesc",
                            },
                          })}
                          className={`block w-full px-4 py-3 placeholder-gray-500 border-gray-300 rounded-md shadow focus:ring-blue-500 focus:border-blue-500 focus:outline-none focus:ring-2
               ${errors.name ? "ring-2 ring-red-500" : null}`}
                        />
                        <span className="py-2 text-sm text-red-400">
                          {errors?.name?.message}
                        </span>
                      </span>
                    </label>
                  </div>
                  <div className="form-element">
                    <label className="space-y-0.5 w-full lg:w-4/5 block mx-auto">
                      <span className="block text-lg tracking-wide text-gray-800">
                        Categories
                      </span>
                      <span className="block">
                        <input
                          type="text"
                          name="categories"
                          // eslint-disable-next-line react/jsx-props-no-spreading
                          {...register("categories", {
                            required: {
                              value: true,
                              message: "You most enter categories",
                            },
                          })}
                          className={`block w-full px-4 py-3 placeholder-gray-500 border-gray-300 rounded-md shadow focus:ring-blue-500 focus:border-blue-500 focus:outline-none focus:ring-2
               ${errors.name ? "ring-2 ring-red-500" : null}`}
                        />
                        <span className="py-2 text-sm text-red-400">
                          {errors?.name?.message}
                        </span>
                      </span>
                    </label>
                  </div>
                  <div className="form-element">
                    <label className="space-y-0.5 w-full lg:w-4/5 block mx-auto">
                      <span className="block text-lg tracking-wide text-gray-800">
                        Level
                      </span>
                      <span className="block">
                        <input
                          type="text"
                          name="level"
                          // eslint-disable-next-line react/jsx-props-no-spreading
                          {...register("level", {
                            required: {
                              value: true,
                              message: "You most enter level",
                            },
                          })}
                          className={`block w-full px-4 py-3 placeholder-gray-500 border-gray-300 rounded-md shadow focus:ring-blue-500 focus:border-blue-500 focus:outline-none focus:ring-2
               ${errors.name ? "ring-2 ring-red-500" : null}`}
                        />
                        <span className="py-2 text-sm text-red-400">
                          {errors?.name?.message}
                        </span>
                      </span>
                    </label>
                  </div>
                  <div className="form-element">
                    <label className="space-y-0.5 w-full lg:w-4/5 block mx-auto">
                      <span className="block text-lg tracking-wide text-gray-800">
                        Price
                      </span>
                      <span className="block">
                        <input
                          type="text"
                          name="price"
                          // eslint-disable-next-line react/jsx-props-no-spreading
                          {...register("price", {
                            required: {
                              value: true,
                              message: "You most enter price",
                            },
                          })}
                          className={`block w-full px-4 py-3 placeholder-gray-500 border-gray-300 rounded-md shadow focus:ring-blue-500 focus:border-blue-500 focus:outline-none focus:ring-2
               ${errors.name ? "ring-2 ring-red-500" : null}`}
                        />
                        <span className="py-2 text-sm text-red-400">
                          {errors?.name?.message}
                        </span>
                      </span>
                    </label>
                  </div>
                  <div className="form-element">
                    <label className="space-y-0.5 w-full lg:w-4/5 block mx-auto">
                      <span className="block text-lg tracking-wide text-gray-800">
                        FoodProvider
                      </span>
                      <span className="block">
                        <input
                          type="text"
                          name="foodProvider"
                          // eslint-disable-next-line react/jsx-props-no-spreading
                          {...register("foodProvider", {
                            required: {
                              value: true,
                              message: "You most enter foodProvider",
                            },
                          })}
                          className={`block w-full px-4 py-3 placeholder-gray-500 border-gray-300 rounded-md shadow focus:ring-blue-500 focus:border-blue-500 focus:outline-none focus:ring-2
               ${errors.name ? "ring-2 ring-red-500" : null}`}
                        />
                        <span className="py-2 text-sm text-red-400">
                          {errors?.name?.message}
                        </span>
                      </span>
                    </label>
                  </div>
                  <div className="form-element">
                    <label className="space-y-0.5 w-full lg:w-4/5 block mx-auto">
                      <span className="block text-lg tracking-wide text-gray-800">
                        VideoUrl
                      </span>
                      <span className="block">
                        <input
                          type="text"
                          name="videoUrl"
                          // eslint-disable-next-line react/jsx-props-no-spreading
                          {...register("videoUrl", {
                            required: {
                              value: true,
                              message: "You most enter videoUrl",
                            },
                          })}
                          className={`block w-full px-4 py-3 placeholder-gray-500 border-gray-300 rounded-md shadow focus:ring-blue-500 focus:border-blue-500 focus:outline-none focus:ring-2
               ${errors.name ? "ring-2 ring-red-500" : null}`}
                        />
                        <span className="py-2 text-sm text-red-400">
                          {errors?.name?.message}
                        </span>
                      </span>
                    </label>
                  </div>
                  <div className="form-element">
                    <label className="space-y-0.5 w-full lg:w-4/5 block mx-auto">
                      <span className="block text-lg tracking-wide text-gray-800">
                        Img
                      </span>
                      <span className="block">
                        <input
                          type="text"
                          name="img"
                          // eslint-disable-next-line react/jsx-props-no-spreading
                          {...register("img", {
                            required: {
                              value: true,
                              message: "You most enter img",
                            },
                          })}
                          className={`block w-full px-4 py-3 placeholder-gray-500 border-gray-300 rounded-md shadow focus:ring-blue-500 focus:border-blue-500 focus:outline-none focus:ring-2
               ${errors.name ? "ring-2 ring-red-500" : null}`}
                        />
                        <span className="py-2 text-sm text-red-400">
                          {errors?.name?.message}
                        </span>
                      </span>
                    </label>
                  </div>
                  <button>
                    Upload File
                    <input type="file" onChange={uploadHandler} hidden />
                  </button>
                  <div className="form-element">
                    <label className="space-y-0.5 w-full lg:w-4/5 block mx-auto">
                      <span className="block text-lg tracking-wide text-gray-800">
                        description
                      </span>
                      <span className="block">
                        <input
                          type="text"
                          name="description"
                          // eslint-disable-next-line react/jsx-props-no-spreading
                          {...register("description", {
                            required: {
                              value: true,
                              message: "You most enter description",
                            },
                          })}
                          className={`block w-full px-4 py-3 placeholder-gray-500 border-gray-300 rounded-md shadow focus:ring-blue-500 focus:border-blue-500 focus:outline-none focus:ring-2
               ${errors.name ? "ring-2 ring-red-500" : null}`}
                        />
                        <span className="py-2 text-sm text-red-400">
                          {errors?.name?.message}
                        </span>
                      </span>
                    </label>
                  </div>

                  <div className="form-element">
                    <span className="block w-full mx-auto my-4 lg:w-4/5 ">
                      <input
                        type="submit"
                        className="flex w-full px-6 py-3 text-lg text-white bg-indigo-600 border-0 rounded cursor-pointer focus:outline-none hover:bg-aquamarine-800"
                        value="Update Account"
                      />
                    </span>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ params }) {
  return {
    props: { params },
  };
}

export default dynamic(() => Promise.resolve(FoodEdit), { ssr: false });
