import axios from "axios";
import { useRouter } from "next/router";
import React, { useContext, useReducer, useState } from "react";
import Swal from "sweetalert2";
import { Store } from "utils/Store";

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, error: "" };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    case "UPDATE_REQUEST":
      return { ...state, loadingUpdate: true, errorUpdate: "" };
    case "UPDATE_SUCCESS":
      return { ...state, loadingUpdate: false, errorUpdate: "" };
    case "UPDATE_FAIL":
      return { ...state, loadingUpdate: false, errorUpdate: action.payload };
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

const AddNewFood = () => {
  const router = useRouter();

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [img, setImg] = useState("");
  const { state } = useContext(Store);
  const { userInfo } = state;
  const [{ loading, error, loadingUpdate, loadingUpload }, dispatch] =
    useReducer(reducer, {
      loading: true,
      error: "",
    });


  const uploadHandler = async (e) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append("file", file);
    try {
      dispatch({ type: "UPLOAD_REQUEST" });
      const { data } = await axios.post("/api/admin/upload", bodyFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: `Bearer ${userInfo.token}`,
        },
      });

      dispatch({ type: "UPLOAD_SUCCESS" });
      setImg(data.secure_url);

      Swal.fire({
        icon: "success",
        title: "Image",
        text: "Image uploaded successfully",
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        text: err.message,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post("/api/addFood/addFood", {
        name,
        slug,
        shortDesc,
        category,
        price,
        description,
        img,
      });
      Swal.fire({
        icon: "success",
        text: "Food uploaded successfully",
      });

      router.push("/foods");
    } catch (error) {
      Swal.fire({
        icon: "error",
        text: error.message,
      });
    }
  };

  return (
    <div>
      <form action="" onSubmit={handleSubmit}>
          <div className="flex flex-col px-4 ">
            <div className="mb-4">
              <label htmlFor="name">Name</label>
              <input
                onChange={(e) => setName(e.target.value)}
                id="name"
                className="w-full px-4 py-3 rounded focus:border-royal-blue"
                type="text"
                name="name"
                placeholder="Write your food name here..."
              />
            </div>
            <div className="mb-4">
              <label htmlFor="slug">Slug</label>
              <input
                onChange={(e) => setSlug(e.target.value)}
                id="slug"
                className="w-full px-4 py-3 rounded focus:border-royal-blue"
                type="text"
                name="slug"
                placeholder="Write your food name here..."
              />
            </div>

            <div className="mb-4">
              <label htmlFor="shortDesc">Short Description</label>
              <textarea
                onChange={(e) => setShortDesc(e.target.value)}
                className="w-full px-4 py-3 rounded focus:border-royal-blue"
                name="shortDesc"
                placeholder="Write short description"
                id="shortDesc"
              ></textarea>
            </div>

            <div className="mb-4">
              <label htmlFor="category">Food Category</label>
              <select
                onChange={(e) => setCategory(e.target.value)}
                id="category"
                name="category"
                className="w-full px-4 py-3 rounded form-select focus:border-royal-blue"
              >
                <option value="javascript">Select Category</option>
                <option value="copy">Copy</option>
                <option value="pizza">Pizza</option>
                <option value="bargar">Bargar</option>
                <option value="chicken">Chicken</option>
              </select>
            </div>

            <div className="mb-4">
              <label htmlFor="price">Food Price</label>
              <input
                onChange={(e) => setPrice(e.target.value)}
                id="price"
                className="w-full px-4 py-3 rounded focus:border-royal-blue"
                type="number"
                name="price"
                placeholder="Write your food price here..."
              />
            </div>

            <div className="mb-4">
              <label htmlFor="description">Food Overview</label>
              <textarea
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-3 rounded focus:border-royal-blue"
                placeholder="Write your food overview..."
                id="description"
                name="description"
              ></textarea>
            </div>
          </div>
          <div className="flex flex-col px-4">
            <div>
              <div className="flex mt-6 mb-8">
                <div className="max-w-2xl rounded-lg shadow-xl bg-gray-50">
                  <div className="m-4 ">
                    <label className="inline-block mb-2 text-gray-500">
                      Upload thumbnail
                    </label>
                    <div className="flex items-center justify-center w-full">
                      <label className="flex flex-col w-full h-32 border-4 border-blue-200 border-dashed hover:bg-gray-100 hover:border-gray-300">
                        <div className="flex flex-col items-center justify-center cursor-pointer pt-7">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-8 h-8 text-gray-400 group-hover:text-gray-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                            />
                          </svg>
                          <p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                            Attach a file
                          </p>
                        </div>
                        <input
                          disabled={!setImg}
                          onChange={uploadHandler}
                          accept=".jpg, .jpeg, .png"
                          type="file"
                          className="opacity-0"
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <input className="w-20 text-center btn-brand" type="submit" />
          </div>
      </form>
    </div>
  );
};

export default AddNewFood;
