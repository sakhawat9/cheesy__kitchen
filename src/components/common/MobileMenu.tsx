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
          <Link href="/courses">
            <a>Foods</a>
          </Link>
        </li>
        <li>
          <Link href="/instractors">
            <a>Menu</a>
          </Link>
        </li>
        <li>
          <Link href="/categories">
            <a>Gallery</a>
          </Link>
        </li>
        <li>
          <Link href="/categories">
            <a>Review</a>
          </Link>
        </li>
        <li>
          <Link href="/categories">
            <a>Contact</a>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default MobileMenu;
