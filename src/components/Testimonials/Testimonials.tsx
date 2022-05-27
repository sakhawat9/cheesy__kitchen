import Title from "components/common/Title";
import Image from "next/image";
import React from "react";
import { AiOutlineStar } from "react-icons/ai";
import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

const PreviousBtn = (props) => {
  const { className, onClick } = props;
  return (
    <div className={className} onClick={onClick}>
      <FaLongArrowAltLeft className="p-2 text-4xl font-extrabold text-white rounded-full shadow-lg" />
    </div>
  );
};
const NextBtn = (props) => {
  const { className, onClick } = props;
  return (
    <div className={className} onClick={onClick}>
      <FaLongArrowAltRight className="p-2 text-4xl text-white rounded-full shadow-lg" />
    </div>
  );
};

const carouselProperties = {
  prevArrow: <PreviousBtn />,
  nextArrow: <NextBtn />,
  slidesToShow: 3,
  centerMode: true,
  centerPadding: "200px",
  responsive: [
    {
      breakpoint: 500,
      settings: {
        slidesToShow: 1,
        centerMode: false,
      },
    },
    {
      breakpoint: 769,
      settings: {
        slidesToShow: 2,
        centerMode: false,
      },
    },
    {
      breakpoint: 1025,
      settings: {
        slidesToShow: 3,
        centerMode: false,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 2000,
      settings: {
        slidesToShow: 3,
        centerMode: false,
        slidesToScroll: 1,
      },
    },
  ],
};

const Testimonials = ({ data }) => {
  return (
    <div className="section-padding bg-gray-50">
      <div className="container mx-auto carousel">
        <div>
          <Title
            title="Testimonials"
            subtitle="Our all testimonials"
            description=""
          />
        </div>
        <Slider {...carouselProperties}>
          {data.map((item, index) => (
            <Card key={index} item={item} />
          ))}
        </Slider>
      </div>
    </div>
  );
};

const Card = ({ item }) => {
  return (
    <div className="p-6 m-3 shadow-lg">
      <div className="grid items-center grid-cols-12 gap-4 mb-4">
        <div className="col-span-8">
          <h3 className="pt-3 text-2xl">{item.name}</h3>
          <ul className="flex mt-3">
            <li>
              <AiOutlineStar className="text-2xl text-yellow-400" />
            </li>
            <li>
              <AiOutlineStar className="text-2xl text-yellow-400" />
            </li>
            <li>
              <AiOutlineStar className="text-2xl text-yellow-400" />
            </li>
            <li>
              <AiOutlineStar className="text-2xl text-yellow-400" />
            </li>
            <li>
              <AiOutlineStar className="text-2xl text-yellow-400" />
            </li>
          </ul>
        </div>
        <div className="col-span-4">
          <div className="inline-flex p-2 align-middle bg-white rounded-full shadow">
            <Image
              width="70"
              height="70"
              className="object-cover rounded-full"
              src={item.img}
              alt={item.name}
            />
          </div>
        </div>
      </div>

      <p className="text-sm text-justify">{item.description}</p>
    </div>
  );
};

export default Testimonials;
