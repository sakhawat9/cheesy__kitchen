import React from "react";
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
];
console.log(images);

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
      autoPlaySpeed={3000}
    >
      {images.map((image, index) => {
        return (
          <div key={index} className="">
            <img
              draggable={false}
              alt="text"
              className="w-full h-screen"
              src={image}
            />
            <div
              //   className="flex items-center justify-center text-white left-1/2 bg-amazon-500"
              style={{
                position: "absolute",
                left: "50%",
                bottom: "50%",
                color: "white",
                transform: " translateX(-50%)",
              }}
            >
              <h2>Welcome</h2>
              <h2>Cheesy__kitchen</h2>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Velit,
                animi?
              </p>
            </div>
          </div>
        );
      })}
    </Carousel>
  );
};

export default Hero;
