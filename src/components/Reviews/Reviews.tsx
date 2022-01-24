import c2 from "assets/images/c2.jpg";
import Image from "next/image";
import React from "react";
import { BiDislike, BiLike } from "react-icons/bi";
import { FaStar } from "react-icons/fa";

const Reviews = () => {
  return (
    <div className="p-2 my-10 md:p-5 tab1">
      <h5>Item Reviews</h5>
      <div className="flex border-b-2 grid-4 persion">
        <div className="">
          <Image
            src={c2}
            alt=""
            className="rounded-full"
            width="200"
            height="200"
          />
        </div>
        <div className="col-span-10 mx-4 desSection">
          <h6>Josaph Manrty</h6>
          <div className="flex star">
            <h6 className="px-1">
              <FaStar />
            </h6>
            <h6 className="px-1">
              <FaStar />
            </h6>
            <h6 className="px-1">
              <FaStar />
            </h6>
            <h6 className="px-1">
              <FaStar />
            </h6>
            <h6 className="px-1">
              {" "}
              <FaStar />
            </h6>
          </div>
          <p>
            " Commodo est luctus eget. Proin in nunc laoreet justo volutpat
            blandit enim. Sem felis, ullamcorper vel aliquam non, varius eget
            justo. Duis quis nunc tellus sollicitudin mauris. "
          </p>
          <div className="flex mt-4">
            <div className="flex mr-4">
              <p>12</p>
              <h6 className="px-1">
                {" "}
                <BiLike />
              </h6>
            </div>
            <div className="flex">
              <p>14</p>
              <h6 className="px-1">
                <BiDislike />
              </h6>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-4 mt-4 border-b-2 persion">
        <div className="">
          <Image
            src={c2}
            alt=""
            className="rounded-full"
            width="200"
            height="200"
          />
        </div>
        <div className="mx-4 desSection">
          <h6>Josaph Manrty</h6>
          <div className="flex star">
            <h6 className="px-1">
              <FaStar />
            </h6>
            <h6 className="px-1">
              <FaStar />
            </h6>
            <h6 className="px-1">
              <FaStar />
            </h6>
            <h6 className="px-1">
              <FaStar />
            </h6>
            <h6 className="px-1">
              <FaStar />
            </h6>
          </div>
          <p>
            " Commodo est luctus eget. Proin in nunc laoreet justo volutpat
            blandit enim. Sem felis, ullamcorper vel aliquam non, varius eget
            justo. Duis quis nunc tellus sollicitudin mauris. "
          </p>
          <div className="flex mt-4">
            <div className="flex mr-4">
              <p>12</p>
              <h6 className="px-1">
                {" "}
                <BiLike />
              </h6>
            </div>
            <div className="flex">
              <p>14</p>
              <h6 className="px-1">
                <BiDislike />
              </h6>
            </div>
          </div>
        </div>
      </div>
      <div className="p-2 my-10 md:p-5 tab1">
        <h5>Your Reviews</h5>
        <div className="giveReview">
          <form action="">
            <div className="flex gap-5">
              <div className="w-full div1">
                <p className="mb-3">Your name</p>
                <input type="text" placeholder="Your Name" name="name" />
              </div>
              <div className="w-full div1">
                <p className="mb-3">Your Email</p>
                <input type="email" placeholder="Your Email" name="email" />
              </div>
            </div>
            <p className="mt-5">Your Review</p>
            <textarea placeholder="Review"></textarea>
            <br />
            <button className="btn-brand" type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
