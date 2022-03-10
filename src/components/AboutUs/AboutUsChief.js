

// import Title from "components/common/Title";
// import Image from "next/image";
// import React from "react";
// import { AiOutlineStar } from "react-icons/ai";
// import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick-theme.css";
// import "slick-carousel/slick/slick.css";

/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/img-redundant-alt */

import Link from "next/link";
import React from "react";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaLongArrowAltLeft,
  FaLongArrowAltRight,
  FaPinterestP,
  FaTwitter,
  FaWhatsapp,
} from "react-icons/fa";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

const data = [
    {
        name: "Khandokar Riyad",
        img: "https://res.cloudinary.com/medsy/image/upload/v1646842050/male-chief1_b6ih4w.webp",
        title: "Main cook",
        facebook: "https://www.facebook.com",
        twitter: "https://twitter.com",
        instagram: "https://www.instagram.com/",
        linkedIn: "https://www.linkedin.com/",
        pinterest: "https://www.pinterest.com/",
        whatsapp: "https://www.whatsapp.com/",
    },
    {
        name: "Female Chief-1",
        img: "https://res.cloudinary.com/medsy/image/upload/v1646842050/female-chief1_acriip.webp",
        title: "Main cook",
        facebook: "https://www.facebook.com",
        twitter: "https://twitter.com",
        instagram: "https://www.instagram.com/",
        linkedIn: "https://www.linkedin.com/",
        pinterest: "https://www.pinterest.com/",
        whatsapp: "https://www.whatsapp.com/",
    },
    {
        name: "Male Chief_2",
        img: "https://res.cloudinary.com/medsy/image/upload/v1646842051/male-chief2_oahjju.jpg",
        title: "Main cook",
        facebook: "https://www.facebook.com",
        twitter: "https://twitter.com",
        instagram: "https://www.instagram.com/",
        linkedIn: "https://www.linkedin.com/",
        pinterest: "https://www.pinterest.com/",
        whatsapp: "https://www.whatsapp.com/",
    },
    {
        name: "Female Chief_2",
        img: "https://res.cloudinary.com/medsy/image/upload/v1646842051/female-chief2_zdzsnc.png",
        title: "Main cook",
        facebook: "https://www.facebook.com",
        twitter: "https://twitter.com",
        instagram: "https://www.instagram.com/",
        linkedIn: "https://www.linkedin.com/",
        pinterest: "https://www.pinterest.com/",
        whatsapp: "https://www.whatsapp.com/",
    },
    {
        name: "Male Chief_3",
        img: "https://res.cloudinary.com/medsy/image/upload/v1646842051/male-chief3_okcbmu.jpg",
        title: "Main cook",
        facebook: "https://www.facebook.com",
        twitter: "https://twitter.com",
        instagram: "https://www.instagram.com/",
        linkedIn: "https://www.linkedin.com/",
        pinterest: "https://www.pinterest.com/",
        whatsapp: "https://www.whatsapp.com/",
    },
    {
        name: "Female Chief_3",
        img: "https://res.cloudinary.com/medsy/image/upload/v1646842052/female-chief3_fuh0sv.jpg",
        title: "Main cook",
        facebook: "https://www.facebook.com",
        twitter: "https://twitter.com",
        instagram: "https://www.instagram.com/",
        linkedIn: "https://www.linkedin.com/",
        pinterest: "https://www.pinterest.com/",
        whatsapp: "https://www.whatsapp.com/",
    },
]

 
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
          slidesToShow: 4,
          centerMode: false,
          slidesToScroll: 1,
        },
      },
    ],
  };
   
  const AboutUsChief = () => {
    return (
      <div className="our-chefs carousel">
        <div>
          <h2 className="our-chefs__title">OUR EXPERT CHEFS</h2>
          <span className="our-chefs__subtitle">PROFESSIONAL COOK TEAM</span>
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
      <div className="our-chefs__content">
        <div className="">
          <img src={item.img} className="h-64" alt="image" />
        </div>
        <h3>{item.name}</h3>
        <p>{item.title}</p>
        <ul className="flex justify-center gap-2 mt-4">
          <li className="flex items-center justify-center w-8 h-8 bg-blue-900 rounded-full hover:bg-blue-800">
            <Link href={item.facebook}>
              <a target="_blank">
                <FaFacebookF className="text-xl text-white" />
              </a>
            </Link>
          </li>
          <li className="flex items-center justify-center w-8 h-8 bg-blue-500 rounded-full hover:bg-blue-400">
            <Link href={item.twitter}>
              <a target="_blank">
                <FaTwitter className="text-xl text-white" />
              </a>
            </Link>
          </li>
          <li className="flex items-center justify-center w-8 h-8 bg-blue-600 rounded-full hover:bg-blue-700">
            <Link href={item.linkedIn}>
              <a target="_blank">
                <FaLinkedinIn className="text-xl text-white" />
              </a>
            </Link>
          </li>
          <li className="flex items-center justify-center w-8 h-8 bg-red-600 rounded-full hover:bg-red-500">
            <Link href={item.pinterest}>
              <a target="_blank">
                <FaPinterestP className="text-xl text-white" />
              </a>
            </Link>
          </li>
          <li className="flex items-center justify-center w-8 h-8 bg-green-600 rounded-full hover:bg-green-500">
            <Link href={item.pinterest}>
              <a target="_blank">
                <FaWhatsapp className="text-xl text-white" />
              </a>
            </Link>
          </li>
        </ul>
      </div>
    );
  };
   
  export default AboutUsChief;
   
  
