import Link from "next/link";
import React from "react";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaPinterestP,
  FaTwitter,
  FaWhatsapp,
} from "react-icons/fa";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer__top">
        <div className="container">
          <div className=" footer-top__wrapper">
            <div>
              <div className="footer-top__title">
                <h4>Information</h4>
              </div>
              <div className="footer-top__content">
                <ul>
                  <li>
                    <a href="/foods">Foods</a>
                  </li>
                  <li>
                    <a href="/aboutUs">About us</a>
                  </li>
                  <li>
                    <a href="/shipping">Check out</a>
                  </li>
                  <li>
                    <a href="/contact">Contact</a>
                  </li>
                </ul>
              </div>
            </div>

            <div>
              <div className="footer-top__title">
                <h4>My Account</h4>
              </div>
              <div className="footer-top__content">
                <ul>
                  <li>
                    <a href="/login">Login</a>
                  </li>
                  <li>
                    <a href="/register">Register</a>
                  </li>
                  <li>
                    <a href="/profile">Account settings</a>
                  </li>
                  <li>
                    <a href="/cartFood">Shopping cart</a>
                  </li>
                </ul>
              </div>
            </div>

            <div>
              <div className="footer-top__title">
                <h4>Category</h4>
              </div>
              <div className="footer-top__content">
                <ul>
                  <li>
                    <a href="/barger">Bargar</a>
                  </li>
                  <li>
                    <a href="/pizza">Pizza</a>
                  </li>
                  <li>
                    <a href="/coffee">coffee</a>
                  </li>
                  <li>
                    <a href="/chicken">Chicken</a>
                  </li>
                </ul>
              </div>
            </div>

            <div>
              <div className="footer-top__title ">
                <h4>Contact us</h4>
              </div>
              <div className="footer-top__content">
                <p className="mb-3">
                  15/e Lake circus
                  <br /> Kalabagan, Dhaka.
                </p>
                <p className="text-xs">sakhawathossain7969@gmail.com</p>
                <ul className="footer-top__icons">
                  <li>
                    <Link href="https://www.facebook.com/sakawat.hossain.338211">
                      <a target="_blank">
                        <FaFacebookF />
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="https://www.linkedin.com/in/shjsdev">
                      <a target="_blank">
                        <FaLinkedinIn />
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="#">
                      <a target="_blank">
                        <FaTwitter />
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="#">
                      <a target="_blank">
                        <FaPinterestP />
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="#">
                      <a target="_blank">
                        <FaWhatsapp />
                      </a>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer__bottom">
        <div className="footer__bottom__wrapper">
          <p>
            &copy; 2021{" "}
            <a href="https://github.com/sakhawat9">Cheesy_kitchen</a> Designed
            by SH Shakib
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
