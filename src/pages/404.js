/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import Layout from "components/common/Layout";
import { CgArrowRight } from "react-icons/cg";

const Error = () => {
  return (
    <Layout title="404 page | ECommerce-Website.">
      <div className="bg-blue-900">
        <div className="absolute w-2 h-2 rounded-full left-80 top-44 bg-black-100"></div>
        <div className="absolute w-4 h-4 bg-yellow-600 rounded-full left-40 bottom-60"></div>
        <div className="absolute w-8 h-8 bg-blue-300 rounded-full top-96 right-56"></div>
        <div className="absolute w-2 h-2 bg-pink-400 rounded-full bottom-36 right-44"></div>
        <div className="container">
          <div
            style={{ maxWidth: "970px" }}
            className="pb-10 mx-auto mt-0 text-center"
          >
            <div className="relative z-10 pb-14">
              <img
                className="absolute"
                src="https://wordpress-theme.spider-themes.net/docy/wp-content/themes/docy/assets/img/404_bg.png"
                alt="404 page background shape."
              />
              <div className="relative inline-block">
                <img
                  src="https://wordpress-theme.spider-themes.net/docy/wp-content/themes/docy/assets/img/404_two.png"
                  alt="4 illustration"
                />
              </div>
              <div className="relative inline-block mx-4 my-0">
                <img
                  src="https://wordpress-theme.spider-themes.net/docy/wp-content/themes/docy/assets/img/404_three.png"
                  alt="0 illustration"
                />
              </div>
              <div className="relative inline-block -top-14">
                <img
                  style={{ animation: "customUp 2s infinite alternate" }}
                  className="img_three"
                  src="https://wordpress-theme.spider-themes.net/docy/wp-content/themes/docy/assets/img/404_one.png"
                  alt="4 illustration"
                />
              </div>
            </div>
            <h2 className="mb-4 text-white">
              Error. We can’t find the page you’re looking for.
            </h2>
            <p className="mb-5 text-lg text-gray-300">
              Sorry for the inconvenience. Go to our homepage or check out our
              latest collections for Fashion, Chair, Decoration...
            </p>
            <div className="flex justify-center">
              <Link href="/">
                <a className="flex items-center gap-2 px-8 py-2 font-semibold bg-white rounded hover:bg-blue-400 hover:text-white text-blue-500">
                  Back to Home Page <CgArrowRight />
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Error;
