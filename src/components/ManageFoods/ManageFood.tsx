import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useReducer } from "react";
import { AiFillEye } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin7Line } from "react-icons/ri";
import Swal from "sweetalert2";
import { IFood } from "type";
import { Store } from "utils/Store";

interface IProp {
  food: IFood;
}

function reducer(state: any, action: any) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, products: action.payload, error: "" };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    case "DELETE_REQUEST":
      return { ...state, loadingDelete: true };
    case "DELETE_SUCCESS":
      return { ...state, loadingDelete: false, successDelete: true };
    case "DELETE_FAIL":
      return { ...state, loadingDelete: false };
    case "DELETE_RESET":
      return { ...state, loadingDelete: false, successDelete: false };
    default:
      state;
  }
}

const ManageFood = ({ food }: IProp) => {
  const { image, name, slug, _id } = food;

  const { state } = useContext(Store);
  const { userInfo } = state;

  const [ dispatch] = useReducer(reducer, {
    loading: true,
    products: [],
    error: "",
  });

  const deleteHandler = async (productId: number) => {
    if (!window.confirm("Are you sure?")) {
      return;
    }

    try {
      dispatch({ type: "DELETE_REQUEST" });
      await axios.delete(`/api/admin/foods/${productId}`, {
        headers: { authorization: `Bearer ${userInfo.token}` },
      });
      dispatch({ type: "DELETE_SUCCESS" });
      Swal.fire({
        icon: "success",
        text: "Food deleted successfully",
      });

      window.location.reload();
    } catch (err: any) {
      dispatch({ type: "DELETE_FAIL" });
      Swal.fire({
        icon: "error",
        text: err.message,
      });
    }
  };
  return (
    <div className="w-1/2 w-full px-3 mb-6 overflow-hidden single__course lg:w-1/3 xl:w-1/4 md:w-1/2 sm:w-1/2">
      <div className="flex flex-col justify-between w-full p-3 border rounded">
        <div className="single__course__image">
          <Image className="rounded" width={500} height={500} src={image} />
          <h3 className="text-2xl py-2 text-center mt-3 mb-0">{name}</h3>
        </div>
        <div className="pt-4 flex gap-4 border-t border-gray-200 justify-center">
          <Link href={`/foods/${slug}`}>
            <a>
              <button className="px-4 py-2  text-white bg-green-600 hover:bg-green-700 border-0 rounded cursor-pointer focus:outline-none hover:bg-aquamarine-800">
                <AiFillEye className="text-2xl" />
              </button>
            </a>
          </Link>
          <Link href={`/dashboard/foods/${_id}`}>
            <a>
              <button className="px-4 py-2  text-white bg-green-600 hover:bg-green-700 border-0 rounded cursor-pointer focus:outline-none hover:bg-aquamarine-800">
                <FiEdit className="text-2xl" />
              </button>
            </a>
          </Link>
          <button
            onClick={() => deleteHandler(_id)}
            className="px-4 py-2  text-white bg-green-600 hover:bg-green-700 border-0 rounded cursor-pointer focus:outline-none hover:bg-aquamarine-800"
          >
            <RiDeleteBin7Line className="text-2xl" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManageFood;
