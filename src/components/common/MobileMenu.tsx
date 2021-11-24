import Link from "next/link";
import React from "react";

const MobileMenu = () => {
  return (
    <div className="p-4">
      <Link href="/">
        <a className="text-xl">
          <h4 className="font-extrabold ">Cheesy_kitchen</h4>
        </a>
      </Link>

      <ul className="mobile-menu">
        <li>
          <Link href="/foods">
            <a>Foods</a>
          </Link>
        </li>
        <li>
          <Link href="/menu">
            <a>Menu</a>
          </Link>
        </li>
        <li>
          <Link href="/gallery">
            <a>Gallery</a>
          </Link>
        </li>
        <li>
          <Link href="/review">
            <a>Review</a>
          </Link>
        </li>
        <li>
          <Link href="/contact">
            <a>Contact</a>
          </Link>
        </li>
        <li>
          <Link href="#">
            <a>Free shipping on all orders</a>
          </Link>
        </li>
        <li>
          <Link href="#">
            <a>Hotline:(+1) 654 567 – 6789</a>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default MobileMenu;
