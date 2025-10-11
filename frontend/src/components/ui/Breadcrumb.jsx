import React from "react";
import { Link } from "react-router-dom";

export default function Breadcrumb({ category, subcategory, productName }) {
  return (
    <nav className="text-p text-black mb-[30px] custom-lg:mb-[50px]">
      <ol className="flex items-center flex-wrap">
        <li>
          <Link to="/">
            Home
          </Link>
        </li>

        <span className="mx-[15px] ">/</span>

        <li>
          <Link to={`#`} className="capitalize">
            kurti{category}
          </Link>
        </li>

        <span className="mx-[15px] ">/</span>

        <li> 
          <Link to={`#`} className="capitalize" >
            cotton kurti{subcategory}
          </Link>
        </li>

        <span className="mx-[15px] ">/</span>

        <li className="sec-text-color text-14 truncate capitalize">
          pink floral kurti{productName}
        </li>
      </ol>
    </nav>
  );
}
