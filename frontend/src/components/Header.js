import React, { useState } from "react";
import {
  FaUser,
  FaSearch,
  
  FaHeart,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'; // or free-regular-svg-icons if it exists


import { faList, faListAlt, faListSquares, faListCheck } from '@fortawesome/free-solid-svg-icons';



import { faHeart } from '@fortawesome/free-regular-svg-icons'; // note 'free-regular'

import Logo from "../assets/logo.png";

 const navItems = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "Collections", path: "/collections" },
    { name: "Blogs", path: "/blogs" },
    { name: "Features", path: "/features" },
    { name: "More", path: "/more" },
  ];

  
const Header = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-pink-50 shadow-md">
      {/* container with 100px padding (desktop) & smaller padding (mobile) */}
      <div className="flex justify-between items-center px-4 md:px-[100px] py-3">
        {/* Left Logo */}
        <div className="flex items-center space-x-2">
          <img src={Logo} alt="Logo" className="h-10" />
        </div>

        {/* Desktop Nav */}
        <nav className="hidden lg:block">
          <ul className="flex space-x-6 text-base font-normal">
            {navItems.map((item, i) => (
              <li key={i} className="relative">
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `cursor-pointer transition-colors duration-300 hover:text-pink-600 ${
                      isActive ? "text-pink-600 font-medium" : "text-black"
                    } after:content-['...'] after:absolute after:left-1/2 after:-translate-x-1/2 after:bottom-[-10px] after:text-pink-600 after:opacity-0 transition-all duration-300 ${
                      isActive ? "after:opacity-100" : "hover:after:opacity-100"
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>


        {/* Right Side */}
        <div className="flex items-center space-x-4 relative">
          {/* Login Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsLoginOpen(!isLoginOpen)}
              className="flex items-center space-x-1 bg-pink-500 text-white px-3 py-1 rounded-md text-sm"
            >
              <FaUser />
              <span>Login</span>
            </button>

            {isLoginOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50">
                {/* Header */}
                <div className="p-2 text-sm text-gray-600 flex justify-between border-b">
                  <span>Welcome User !</span>
                  <span className="text-pink-500 cursor-pointer font-medium">Sign Up</span>
                </div>

                {/* Menu Items */}
                <ul className="text-gray-700 text-sm">
                  <li className="px-4 py-2 hover:bg-gray-100 flex items-center space-x-2 cursor-pointer">
                    <FaUser /> <span>My Profile</span>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100 flex items-center space-x-2 cursor-pointer">
                    📦 <span>Orders</span>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100 flex items-center space-x-2 cursor-pointer">
                    <FaHeart /> <span>Wishlist</span>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100 flex items-center space-x-2 cursor-pointer">
                    🎁 <span>Gift Cards</span>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100 flex items-center space-x-2 cursor-pointer">
                    💳 <span>Coupons</span>
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* Icons */}
          <FaSearch className="cursor-pointer text-gray-600 hover:text-pink-600 hidden sm:block" />
                  
          <FontAwesomeIcon icon={faCartShopping} className="text-gray-600 hover:text-pink-600 w-5 h-5"  />

          <FontAwesomeIcon icon={faHeart} className="text-gray-600 hover:text-pink-600 w-5 h-5"/>

          <FontAwesomeIcon icon={faList} className="text-gray-600 hover:text-pink-600 w-5 h-5" />




          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-gray-600 hover:text-pink-600"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu (slide dropdown) */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white shadow-md px-6 py-4 space-y-3 text-black text-base font-normal">
          {["Home", "Shop", "Collections", "Blogs", "Features", "More"].map(
            (item, i) => (
              <div
                key={i}
                className="cursor-pointer hover:text-[#F43297] hover:font-medium"
              >
                {item}
              </div>
            )
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
