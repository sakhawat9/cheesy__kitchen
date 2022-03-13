import Title from "components/common/Title";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import data from "./CategoriesData";

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

const Categories = ({ foods }: any) => {
  return (
    <div className="bg-gray-200">
      <div className="container mx-auto carousel section-padding">
        <div>
          <Title
            title="Choice by Category"
            subtitle="Our all Categories"
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
    <>
      <Link href={`/category/${item.link}`}>
        <a>
          <div className="p-2 m-3 text-center bg-white shadow-lg">
            <div className="inline-flex p-2 align-middle rounded-full shadow-lg">
              <Image
                width="100"
                height="100"
                className="object-cover rounded-full"
                src={item.img}
                alt={item.name}
              />
            </div>
            <h3 className="pt-3 text-2xl">{item.name}</h3>
          </div>
        </a>
      </Link>
    </>
  );
};

export default Categories;
