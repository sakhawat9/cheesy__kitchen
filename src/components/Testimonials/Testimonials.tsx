import React from "react";
import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

const PreviousBtn = (props) => {
  const { className, onClick } = props;
  return (
    <div className={className} onClick={onClick}>
      <FaLongArrowAltLeft className="p-2 text-4xl font-extrabold text-black rounded-full shadow-lg" />
    </div>
  );
};
const NextBtn = (props) => {
  const { className, onClick } = props;
  return (
    <div className={className} onClick={onClick}>
      <FaLongArrowAltRight className="p-2 text-4xl text-black rounded-full shadow-lg" />
    </div>
  );
};

const carouselProperties = {
  prevArrow: <PreviousBtn />,
  nextArrow: <NextBtn />,
  slidesToShow: 3,
  // infinite={false}
  //   slidesToScroll={3},
  centerMode: true,
  centerPadding: "200px",
  responsive: [
    {
      breakpoint: 426,
      settings: {
        slidesToShow: 1,
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
  ],
};

const data = [
  {
    img: "http://bunch.asiandevelopers.com/wp/radhuni/wp-content/uploads/2015/06/image-1.jpg",
    name: "Image 1",
    desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Porro rerum voluptas praesentium maxime quibusdam deserunt.",
  },
  {
    img: "http://bunch.asiandevelopers.com/wp/radhuni/wp-content/uploads/2015/06/image-1.jpg",
    name: "Image 2",
    desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Porro rerum voluptas praesentium maxime quibusdam deserunt.",
  },
  {
    img: "http://bunch.asiandevelopers.com/wp/radhuni/wp-content/uploads/2015/06/image-1.jpg",
    name: "Image 3",
    desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Porro rerum voluptas praesentium maxime quibusdam deserunt.",
  },
  {
    img: "http://bunch.asiandevelopers.com/wp/radhuni/wp-content/uploads/2015/06/image-1.jpg",
    name: "Image 4",
    desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Porro rerum voluptas praesentium maxime quibusdam deserunt.",
  },
  {
    img: "http://bunch.asiandevelopers.com/wp/radhuni/wp-content/uploads/2015/06/image-1.jpg",
    name: "Image 5",
    desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Porro rerum voluptas praesentium maxime quibusdam deserunt.",
  },
  {
    img: "http://bunch.asiandevelopers.com/wp/radhuni/wp-content/uploads/2015/06/image-1.jpg",
    name: "Image 6",
    desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Porro rerum voluptas praesentium maxime quibusdam deserunt.",
  },
  {
    img: "http://bunch.asiandevelopers.com/wp/radhuni/wp-content/uploads/2015/06/image-1.jpg",
    name: "Image 7",
    desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Porro rerum voluptas praesentium maxime quibusdam deserunt.",
  },
];

const Testimonials = () => {
  return (
    <div className="container mx-auto carousel">
      <h1>Basic carousel</h1>
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
    <div className="text-center">
      <img
        src={item.img}
        alt={item.name}
        className="object-contain w-full h-44"
      />
      <p className="text-sm">{item.name}</p>
    </div>
  );
};

export default Testimonials;
