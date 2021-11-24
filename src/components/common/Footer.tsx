import React from "react";
import { FaFacebookF, FaLinkedinIn, FaTwitter } from "react-icons/fa";

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
                    <a href="https://academist.vercel.app/">About us</a>
                  </li>
                  <li>
                    <a href="#">Blog</a>
                  </li>
                  <li>
                    <a href="#">Check out</a>
                  </li>
                  <li>
                    <a href="#">Contact</a>
                  </li>
                  <li>
                    <a href="#">Service</a>
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
                    <a href="#">Login</a>
                  </li>
                  <li>
                    <a href="#">Register</a>
                  </li>
                  <li>
                    <a href="#">Account settings</a>
                  </li>
                  <li>
                    <a href="#">Shopping cart</a>
                  </li>
                  <li>
                    <a href="#">Shop</a>
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
                    <a href="#">Bargar</a>
                  </li>
                  <li>
                    <a href="#">Pizza</a>
                  </li>
                  <li>
                    <a href="#">Copy</a>
                  </li>
                  <li>
                    <a href="#">Chicken</a>
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
                <p>sakhawathossain7969@gmail.com</p>
                <ul className="footer-top__icons">
                  <li>
                    <FaFacebookF />
                  </li>
                  <li>
                    <FaLinkedinIn />
                  </li>
                  <li>
                    <FaTwitter />
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
