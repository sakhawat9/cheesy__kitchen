import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useReducer } from "react";
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
  const router = useRouter();
  const { userInfo } = state;

  const [{ successDelete }, dispatch] = useReducer(reducer, {
    loading: true,
    products: [],
    error: "",
  });

  useEffect(() => {
    if (!userInfo) {
      router.push("/login");
    }
    const fetchData = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get(`/api/admin/admincourses`, {
          headers: { authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err: any) {}
    };
    if (successDelete) {
      dispatch({ type: "DELETE_RESET" });
    } else {
      fetchData();
    }
  }, [successDelete]);

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
        text: "Course deleted successfully",
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
          <Image width={500} height={500} src={image} />
          <h5 className="px-2 text-sm lg:px-4">{name}</h5>
        </div>
        <div className="mt-4">
          <Link href={`/foods/${slug}`}>
            <a>
              <button className="px-4 py-2 mb-3 text-white bg-green-600 border-0 rounded cursor-pointer focus:outline-none hover:bg-aquamarine-800">
                <AiFillEye className="text-2xl" />
              </button>
            </a>
          </Link>
          <Link href={`/dashboard/admin/${_id}`}>
            <a>
              <button className="px-4 py-2 mx-4 mb-3 text-white bg-green-600 border-0 rounded cursor-pointer focus:outline-none hover:bg-aquamarine-800">
                <FiEdit className="text-2xl" />
              </button>
            </a>
          </Link>
          <button
            onClick={() => deleteHandler(_id)}
            className="px-4 py-2 mb-3 text-white bg-green-600 border-0 rounded cursor-pointer focus:outline-none hover:bg-aquamarine-800"
          >
            <RiDeleteBin7Line className="text-2xl" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManageFood;
