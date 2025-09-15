
import React, { useState } from "react";
import {
  FaUser,
  FaSearch,
  FaHeart,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons"; // Regular heart
import { faRupeeSign } from '@fortawesome/free-solid-svg-icons';
import { faGift } from '@fortawesome/free-solid-svg-icons'; // solid/free version
import { FaBriefcase, FaRegBell } from 'react-icons/fa';


import Logo from "../assets/logo.png";
import bannerImg from "../assets/banner.png"; 




// ✅ Menu List
const navItems = [
 { name: "Home", path: "/Home" },
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
<header className="bg-pink-50 shadow-md h-[100px]">
  {/* 🔝 Topbar */}
  <div className="flex justify-between items-center px-4 py-3 max-w-[1279.42px] h-[100px] mx-auto">
    {/* Logo */}
<div className="flex items-center space-x-2">
  <img src={Logo} alt="Logo" className="w-[228px] h-[56px]" />
</div>

{/* Desktop Nav */}
<nav className="hidden lg:block">
  <ul className="flex space-x-6 text-base font-normal">
    {navItems.map((item, i) => (
      <li key={i} className="relative group">
<NavLink
  to={item.path}
  className={({ isActive }) =>
    `relative cursor-pointer transition-colors duration-300 ${
      isActive
        ? "text-[#F43297] font-medium"
        : "text-black opacity-70 hover:text-[#F43297] hover:opacity-100"
    }`
  }
>
  {({ isActive }) => (
    <>
      {item.name}

      {/* 3 dots indicator */}
      <span
        className={`absolute left-1/2 -translate-x-1/2 -bottom-2 flex space-x-1 transition-opacity duration-300 ${
          isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
        }`}
      >
        <span className="w-1 h-1 bg-[#F43297] rounded-full"></span>
        <span className="w-1 h-1 bg-[#F43297] rounded-full"></span>
        <span className="w-1 h-1 bg-[#F43297] rounded-full"></span>
      </span>
    </>
  )}
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
          className="flex items-center space-x-1 bg-[#F43297] text-white px-3 py-1 rounded-md text-sm transition-colors duration-300 hover:bg-pink-600"
        >
          <FaUser />
          <span>Login</span>
        </button>

        {isLoginOpen && (
          <div className="absolute mt-2 w-60 bg-white rounded-[10px] shadow-lg z-50">
            <div className="px-4 py-2 text-sm text-gray-600 flex justify-between border-b">
              <span>Welcome User !</span>
              <span className="text-[#F43297] cursor-pointer font-medium hover:text-pink-600">
                Sign Up
              </span>
            </div>
            <ul className="text-gray-700 text-sm">
              <li className="px-4 py-2 hover:bg-gray-100 flex items-center space-x-2 cursor-pointer transition-colors duration-300">
                <FaUser /> <span>My Profile</span>
              </li>
<li className="px-4 py-2 hover:bg-gray-100 flex items-center space-x-2 cursor-pointer transition-colors duration-300">
  <FaBriefcase />
  <span>Orders</span>
</li>


<li className="px-4 py-2 hover:bg-gray-100 flex items-center space-x-2 cursor-pointer transition-colors duration-300">
 <FontAwesomeIcon icon={farHeart} />

  <span>Wishlist</span>
</li>


              <li className="px-4 py-2 hover:bg-gray-100 flex items-center space-x-2 cursor-pointer transition-colors duration-300">
                <FontAwesomeIcon icon={faRupeeSign} />

                <span>Gift Cards</span>
              </li>

<li className="px-4 py-2 hover:bg-gray-100 flex items-center space-x-2 cursor-pointer transition-colors duration-300">
  <FontAwesomeIcon icon={faGift} />
  <span>Coupons</span>
</li>



            </ul>
          </div>
        )}
      </div>

          {/* Icons */}
          <FaSearch className="cursor-pointer text-gray-600 hover:text-pink-600 hidden sm:block" />
          <FontAwesomeIcon
            icon={faCartShopping}
            className="text-gray-600 hover:text-pink-600 w-5 h-5"
          />
          <FaHeart className="text-gray-600 hover:text-pink-600 w-5 h-5" />

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-gray-600 hover:text-pink-600"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>
        </div>
      </div>

      {/* ✅ Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-white shadow-lg z-50 transform transition-transform duration-300 ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex justify-between items-center px-4 py-3 border-b">
          <img src={Logo} alt="Logo" className="h-10" />
          <button
            onClick={() => setIsMenuOpen(false)}
            className="text-gray-600"
          >
            <FaTimes size={22} />
          </button>
        </div>

        {/* 📌 Banner with Gradient + Image */}
<div
  className="w-full h-[180px] lg:hidden relative flex items-center justify-center"
  style={{
    background:
      "linear-gradient(90deg, #F43297 0%, #FF74B4 31%, #FFBADA 85%)",
  }}
>
  {/* 📌 Banner Image (Right Side) */}
  <img
    src={bannerImg}
    alt="Banner"
    className="h-[180px] object-contain absolute right-6 bottom-0"
  />

  {/* 📌 Text Centered on Image */}
    <h1
    className="absolute text-[70px] uppercase font-extrabold tracking-widest text-transparent"
    style={{
      WebkitTextStroke: "1px white", // Border text
    }}
  >
    FASHION
  </h1>
</div>



        {/* Menu Items */}
        <nav className="px-4 py-4 space-y-2">
          {navItems.map((item, i) => (
            <NavLink
              key={i}
              to={item.path}
              onClick={() => setIsMenuOpen(false)}
              className="flex justify-between items-center py-3 px-3 rounded-md bg-pink-50 hover:bg-pink-100 text-gray-700"
            >
              <span>{item.name}</span> <span>›</span>
            </NavLink>
          ))}

          {/* Divider */}
          <hr className="my-3" />

          {/* Extra Menu */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2 py-2 px-3 hover:bg-gray-100 rounded-md cursor-pointer">
              <FaUser /> <span>My Profile</span>
            </div>
            <div className="flex items-center space-x-2 py-2 px-3 hover:bg-gray-100 rounded-md cursor-pointer">
              📦 <span>Orders</span>
            </div>
            <div className="flex items-center space-x-2 py-2 px-3 hover:bg-gray-100 rounded-md cursor-pointer">
              <FaHeart /> <span>Wishlist</span>
            </div>
            <div className="flex items-center space-x-2 py-2 px-3 hover:bg-gray-100 rounded-md cursor-pointer">
              🎁 <span>Gift Card</span>
            </div>
            <div className="flex items-center space-x-2 py-2 px-3 hover:bg-gray-100 rounded-md cursor-pointer">
              💳 <span>Coupons</span>
            </div>
            <div className="flex items-center space-x-2 py-2 px-3 hover:bg-gray-100 rounded-md cursor-pointer">
              🔔 <span>Notifications</span>
            </div>
          </div>
        </nav>

        {/* Bottom Banner */}
        <div className="mt-auto px-4 py-4 border-t">
          <div className="bg-pink-100 p-3 rounded-lg text-center">
            <p className="text-sm font-medium mb-2">
              Enjoy The Best shopping Experience !
            </p>
            <button className="bg-pink-500 text-white px-4 py-2 rounded-md text-sm">
              Get MYcra App
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
