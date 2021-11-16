import Title from "components/common/Title";
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
  ],
};

const data = [
  {
    img: "https://cdn.pixabay.com/photo/2017/12/09/08/18/pizza-3007395_960_720.jpg",
    name: "Image 1",
    desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Porro rerum voluptas praesentium maxime quibusdam deserunt.",
  },
  {
    img: "https://cdn.pixabay.com/photo/2021/07/19/16/04/pizza-6478478_960_720.jpg",
    name: "Image 2",
    desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Porro rerum voluptas praesentium maxime quibusdam deserunt.",
  },
  {
    img: "https://cdn.pixabay.com/photo/2020/10/05/19/55/hamburger-5630646_960_720.jpg",
    name: "Image 3",
    desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Porro rerum voluptas praesentium maxime quibusdam deserunt.",
  },
  {
    img: "https://cdn.pixabay.com/photo/2020/03/21/11/17/burger-4953465_960_720.jpg",
    name: "Image 4",
    desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Porro rerum voluptas praesentium maxime quibusdam deserunt.",
  },
  {
    img: "https://cdn.pixabay.com/photo/2013/08/11/19/46/coffee-171653_960_720.jpg",
    name: "Image 5",
    desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Porro rerum voluptas praesentium maxime quibusdam deserunt.",
  },
  {
    img: "https://cdn.pixabay.com/photo/2016/03/05/19/02/hamburger-1238246_960_720.jpg",
    name: "Image 6",
    desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Porro rerum voluptas praesentium maxime quibusdam deserunt.",
  },
  {
    img: "https://cdn.pixabay.com/photo/2015/05/07/13/46/cappuccino-756490_960_720.jpg",
    name: "Image 7",
    desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Porro rerum voluptas praesentium maxime quibusdam deserunt.",
  },
];

const Testimonials = () => {
  return (
    <div className="container mx-auto carousel section-padding">
      <div>
        <Title
          title="Shop by Category"
          subtitle="Our all category"
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
    <div className="m-3">
      <img
        src={item.img}
        alt={item.name}
        className="object-contain w-full max-h-40"
      />
      <h3 className="pt-3 text-2xl">{item.name}</h3>
      <p className="text-sm text-justify">{item.desc}</p>
    </div>
  );
};

export default Testimonials;
