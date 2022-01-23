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
        slidesToShow: 2,
        centerMode: false,
      },
    },
    {
      breakpoint: 769,
      settings: {
        slidesToShow: 3,
        centerMode: false,
      },
    },
    {
      breakpoint: 1025,
      settings: {
        slidesToShow: 4,
        centerMode: false,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 2000,
      settings: {
        slidesToShow: 5,
        centerMode: false,
        slidesToScroll: 2,
      },
    },
  ],
};

const Testimonials = ({ data }) => {
  return (
    <div className="container mx-auto carousel section-padding">
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
  );
};

const Card = ({ item }) => {
  return (
    <div className="p-2 m-3 text-center shadow-lg">
      <div className="inline-flex p-2 align-middle bg-white rounded-full shadow">
        <Image
          width="100"
          height="100"
          className="object-cover rounded-full"
          src={item.img}
          alt={item.name}
        />
      </div>
      <h3 className="pt-3 text-2xl">{item.name}</h3>
      <p className="text-sm text-justify">{item.description}</p>
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
  );
};

export default Testimonials;
