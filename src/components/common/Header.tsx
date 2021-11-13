import Link from "next/link";
import React from "react";
import { AiOutlineCloseSquare, AiOutlineShoppingCart } from "react-icons/ai";
import { FiMenu } from "react-icons/fi";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import MobileMenu from "./MobileMenu";

const Header = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <header className="header body-font">
      <div className="header__wrapper">
        <span className="flex items-center hidden mb-4 font-medium lg:block title-font md:mb-0">
          <Link href="/">
            <h4 className="font-extrabold">Cheesy_kitchen</h4>
          </Link>
        </span>
        <button className="header__wrapper__drawer" onClick={toggleDrawer}>
          <FiMenu />
        </button>
        <Drawer open={isOpen} onClose={toggleDrawer} direction="left">
          <div
            onClick={toggleDrawer}
            className="header__wrapper__drawer__menu close"
          >
            <AiOutlineCloseSquare className="float-right" />
          </div>
          <MobileMenu />
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
          <Link href="#">
            <a>
              <span className="text-xl cart__ico">
                <AiOutlineShoppingCart />
              </span>
            </a>
          </Link>
          <span className="header__wrapper__cart__number">
            {/* {cart.cartItems.length} */}0
          </span>
        </span>
        {/* {userInfo ? (
          <Usermenu userInfo={userInfo} />
        ) : ( */}
        <Link href="/login">
          <a>
            <button className="header__wrapper__login-btn ">
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
