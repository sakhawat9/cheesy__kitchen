import React from "react";

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="flex justify-center gap-2">
        {pageNumbers.map((number) => (
          <li key={number} className="">
            <a onClick={() => paginate(number)} href="#" className="flex items-center justify-center w-10 h-10 font-bold text-white border border-gray-500 rounded-full hover:bg-amazon-700 bg-amazon-500">
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
