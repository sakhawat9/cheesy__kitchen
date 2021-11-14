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

const Hero = ({ deviceType, infinite, autoPlay }) => {
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
      autoPlaySpeed={2500}
    >
      {images.map((image, index) => {
        return (
          <div key={index} className="hero">
            <img draggable={false} alt="text" src={image} />
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                bottom: "50%",
                color: "white",
                transform: " translateX(-50%)",
              }}
            >
              <h1 className="text-5xl">
                Welcome <br /> Cheesy__kitchen
              </h1>
              <h6>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Velit,
                animi?
              </h6>
              <button>
                Read more <FaLongArrowAltRight />
              </button>
            </div>
          </div>
        );
      })}
    </Carousel>
  );
};

export default Hero;
