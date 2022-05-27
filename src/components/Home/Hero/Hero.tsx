import Link from "next/link";
import React from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
import Carousel from "react-multi-carousel";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
    paritialVisibilityGutter: 60,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
    paritialVisibilityGutter: 50,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    paritialVisibilityGutter: 30,
  },
};
const images = [
  "http://bunch.asiandevelopers.com/wp/radhuni/wp-content/uploads/2015/06/image-1.jpg",
  "http://bunch.asiandevelopers.com/wp/radhuni/wp-content/uploads/2015/06/image-3.jpg",
  "http://bunch.asiandevelopers.com/wp/radhuni/wp-content/uploads/2015/06/image-2.jpg",
  "https://cdn.pixabay.com/photo/2018/03/07/18/42/menu-3206748_960_720.jpg",
  "https://image.freepik.com/free-photo/club-sandwiches-with-fried-potatoes-wooden-board_114579-1910.jpg",
];

const Hero = ({ foods, deviceType, infinite, autoPlay }) => {
  const featuredFood = foods.filter((food) => food?.prichard === true);
  return (
    <Carousel
      ssr
      deviceType={deviceType}
      itemClass="image-item"
      responsive={responsive}
      showDots={true}
      arrows={false}
      slidesToSlide={0}
      infinite={infinite}
      containerClass="carousel-container"
      autoPlay={autoPlay}
      autoPlaySpeed={5000}
    >
      {featuredFood.map((foods) => {
        return (
          <div key={foods._id} className="hero">
            <img draggable={false} alt="text" src={foods.image} />
            <div className="hero__content"
            >
              <div
                className="p-8 rounded"
                style={{ backgroundColor: "#0610496f" }}
              >
                <h1 className="md:text-5xl text-3xl">
                  Welcome <br /> Cheesy__kitchen
                </h1>
                <p className="mb-3">{foods.shortDesc}</p>
                <button>
                  <Link href={`/foods/${foods.slug}`}>
                    <a className="flex items-center gap-2 p-2">
                      Read more <FaLongArrowAltRight />
                    </a>
                  </Link>
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </Carousel>
  );
};

export default Hero;
