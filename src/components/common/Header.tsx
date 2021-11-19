import Link from "next/link";
import React, { useContext } from "react";
import { AiOutlineCloseSquare, AiOutlineShoppingCart } from "react-icons/ai";
import { BsCheck } from "react-icons/bs";
import { FiMenu } from "react-icons/fi";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import { Store } from "utils/Store";
import MobileMenu from "./MobileMenu";

const Header = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { state } = useContext(Store);
  const { cart } = state;

  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <header className="header body-font">
      <div className="header__top">
        <div className="header__top__wrapper">
          <div className="flex items-center">
            <BsCheck />
            <span>Free shipping on all orders</span>
          </div>
          <div>
            <span>
              <Link href="tel:654567678">
                <a>Hotline:(+1) 654 567 – 6789</a>
              </Link>
            </span>
          </div>
        </div>
      </div>
      <div className="header__wrapper">
        <span className="flex items-center hidden mb-4 font-medium lg:block title-font md:mb-0">
          <Link href="/">
            <a>
              <h4 className="font-extrabold">Cheesy_kitchen</h4>
            </a>
          </Link>
        </span>
        <button className="header__wrapper__drawer" onClick={toggleDrawer}>
          <FiMenu />
        </button>
        <Drawer open={isOpen} onClose={toggleDrawer} direction="left">
          <div className="h-full text-gray-900">
            <div
              onClick={toggleDrawer}
              className="header__wrapper__drawer__menu close "
            >
              <AiOutlineCloseSquare className="float-right" />
            </div>
            <MobileMenu />
          </div>
        </Drawer>

        <nav className="header__wrapper__menu">
          <Link href="/">
            <a>Home</a>
          </Link>

          <Link href="#">
            <a>Foods</a>
          </Link>

          <Link href="#">
            <a>Menu</a>
          </Link>
          <Link href="#">
            <a>Gallery</a>
          </Link>
          <Link href="#">
            <a>Review</a>
          </Link>

          <Link href="#">
            <a>Contact</a>
          </Link>
        </nav>

        <span className="header__wrapper__cart">
          <Link href="/cartFood">
            <a>
              <span className="text-xl cart__ico">
                <AiOutlineShoppingCart />
              </span>
            </a>
          </Link>
          <span className="header__wrapper__cart__number">
            {cart.cartItems.length}
          </span>
        </span>
        {/* {userInfo ? (
          <Usermenu userInfo={userInfo} />
        ) : ( */}
        <Link href="#">
          <a>
            <button className="font-bold header__wrapper__login-btn text-amazon">
              Login/Registation
            </button>
          </a>
        </Link>
        {/* )} */}
      </div>
    </header>
  );
};

export default Header;
