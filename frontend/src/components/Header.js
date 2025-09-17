import React, { useState, useEffect } from "react";
import {
  FaUser,
  FaHeart,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faGift } from "@fortawesome/free-solid-svg-icons";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

import BagIcon from "../assets/bag.png";
import OrdersIcon from "../assets/orders.svg";
import LoginIcon from "../assets/login.svg";
import WhiteLogin from "../assets/white login.png";
import MenuIcon from "../assets/menu.png";
import PayImg from "../assets/pay.png";
import Logo from "../assets/logo.png";
import bannerImg from "../assets/banner.png";
import SvgComponent from "./SvgComponent";

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
    <header className="bg-primary-50 shadow-md">
      {/* 🔝 Topbar */}
      <div className="hidden lg:flex justify-between items-center max-w-[1440px] w-full h-[80px] md:h-[100px] mx-auto">
        {/* Logo */}
        <div className="hidden lg:flex items-center space-x-2">
          <img
            src={Logo}
            alt="Logo"
            className="w-[160px] md:w-[228px] h-auto"
          />
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
                        ? "text-[var(--theme-color)] font-medium"
                        : "text-black hover:text-[var(--theme-color)] hover:font-medium"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {item.name}
                      <span
                        className={`absolute left-1/2 -translate-x-1/2 -bottom-2 flex space-x-1 transition-opacity duration-300 ${
                          isActive
                            ? "opacity-100"
                            : "opacity-0 group-hover:opacity-100"
                        }`}
                      >
                        <span className="w-1 h-1 bg-[var(--theme-color)] rounded-full"></span>
                        <span className="w-1 h-1 bg-[var(--theme-color)] rounded-full"></span>
                        <span className="w-1 h-1 bg-[var(--theme-color)] rounded-full"></span>
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
          <div className="relative hidden sm:block">
            <button
              onClick={() => setIsLoginOpen(!isLoginOpen)}
              className="flex items-center space-x-1 text-white px-3 py-1 rounded-md text-sm  duration-300 bg-color"
            >
              <img src={WhiteLogin} alt="Login" className="w-4 h-4" />
              <span>Login</span>
            </button>

            {isLoginOpen && (
              <div className="absolute right-0 mt-2 w-60 bg-white rounded-[10px] shadow-lg z-50">
                <div className="px-4 py-2 text-sm text-gray-600 flex justify-between border-b">
                  <span>Welcome User !</span>
                  <span className="text-color cursor-pointer font-medium">
                    Sign Up
                  </span>
                </div>

                <ul className="text-gray-700 text-sm">
                  <li className="px-4 py-2 hover:bg-gray-100 flex items-center space-x-2 cursor-pointer">
                    <img src={LoginIcon} alt="My Profile" className="w-5 h-5" />
                    <span>My Profile</span>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100 flex items-center space-x-2 cursor-pointer">
                    <img src={OrdersIcon} alt="Orders" className="w-5 h-5" />
                    <span>Orders</span>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100 flex items-center space-x-2 cursor-pointer">
                    <FontAwesomeIcon icon={farHeart} />
                    <span>Wishlist</span>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100 flex items-center space-x-2 cursor-pointer">
                    <SvgComponent />
                    <span>Gift Cards</span>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100 flex items-center space-x-2 cursor-pointer">
                    <FontAwesomeIcon icon={faGift} />
                    <span>Coupons</span>
                  </li>
                </ul>

                
              </div>
            )}
          </div>

          {/* Icons */}
          <MagnifyingGlassIcon className="w-6 h-6 text-black/70 stroke-[2] cursor-pointer hover:text-[var(--theme-color)] hidden sm:block" />
          <FontAwesomeIcon
            icon={faCartShopping}
            className="w-6 h-6 text-black/70 cursor-pointer hover:text-[var(--theme-color)] hidden lg:block"
          />
          <img src={BagIcon} alt="Bag" className="w-5 h-5 cursor-pointer hidden lg:block" />
          <img src={MenuIcon} alt="Menu" className="w-5 h-5 cursor-pointer hidden lg:block" />
        </div>
      </div>

 {/* Mobile Menu Button */}



<div className="flex items-center justify-between w-full h-[80px] px-4 lg:hidden">
  {/* Left: Hamburger */}
        <button
          className="text-gray-600 transition-colors duration-300"
          style={{ color: "var(--theme-color)" }} // icon default color
          onMouseEnter={(e) => e.currentTarget.style.color = "var(--theme-color)"} // optional hover same color
          onMouseLeave={(e) => e.currentTarget.style.color = "var(--theme-color)"} // same color back
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
        </button>

   {/* Center: Logo */}
  <img src={Logo} alt="Logo" className="h-10 mx-auto" />

  {/* Right: Optional icons */}
  <div className="flex items-center space-x-3">
    <img src={BagIcon} alt="Bag" className="w-5 h-5 cursor-pointer" />
    {/* Notification icon */}
    
  </div>
</div>
      {/* ✅ Mobile Sidebar */}
<div
  className={`fixed top-0 left-0 h-full w-full bg-white shadow-lg z-50 transform transition-transform duration-300 ${
    isMenuOpen ? "translate-x-0" : "-translate-x-full"
  }`}
>

        {/* Sidebar Header */}
        <div className="flex justify-between items-center px-4 py-3 border-b">
          <img src={Logo} alt="Logo" className="h-10" />
          <button onClick={() => setIsMenuOpen(false)} className="text-gray-600">
            <FaTimes size={22} />
          </button>
        </div>

        {/* Banner */}
<div
  className="relative w-full h-[154px]  bg-black overflow-hidden flex items-center justify-center"
  style={{
    background: "linear-gradient(90deg, #F43297 0%, #FF74B4 31%, #FFBADA 85%)",
  }}
>
  {/* Banner Image */}
  <img
    src={bannerImg}
    alt="Banner"
    className="h-full object-contain absolute right-4 bottom-0 z-10"
  />

  {/* FASHION Text */}
<h1
  className="absolute text-[70px] sm:text-[100px] uppercase font-extrabold tracking-widest text-white"
  style={{
    WebkitTextStroke: "2px white", // border mota
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

          <hr className="my-3" />

          {/* Extra Menu */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2 py-2 px-3 hover:bg-gray-100 rounded-md cursor-pointer">
              <FaUser /> <span>My Profile</span>
            </div>
            <div className="flex items-center space-x-2 py-2 px-3 hover:bg-gray-100 rounded-md cursor-pointer">
              <img src={OrdersIcon} alt="Orders" className="w-5 h-5" />
              <span>Orders</span>
            </div>
            <div className="flex items-center space-x-2 py-2 px-3 hover:bg-gray-100 rounded-md cursor-pointer">
              
              <FontAwesomeIcon icon={farHeart} />
                    <span>Wishlist</span>
            </div>
            <div className="flex items-center space-x-2 py-2 px-3 hover:bg-gray-100 rounded-md cursor-pointer">
              <SvgComponent />
                  <span>Gift Cards</span>
            </div>
            <div className="flex items-center space-x-2 py-2 px-3 hover:bg-gray-100 rounded-md cursor-pointer">
              <FontAwesomeIcon icon={faGift} />
                    <span>Coupons</span>
            </div>
            <div className="flex items-center space-x-2 py-2 px-3 hover:bg-gray-100 rounded-md cursor-pointer">
              🔔 <span>Notifications</span>
            </div>
          </div>
        </nav>


{/* Bottom Banner */}
        <div className="mt-auto px-4 py-4 border-t">
          <div className="bg-pink-100 p-4 rounded-lg flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Left: Image */}
            <img src={PayImg} alt="Pay" className="h-16 sm:h-20 object-contain" />

            {/* Right: Text + Button */}
            <div className="text-center sm:text-left">
              <p className="text-sm font-medium mb-2">
                Enjoy The Best Shopping Experience !
              </p>
        <button className="bg-primary-500 text-white px-4 py-2 rounded-md hover:bg-primary-600">
          Get MYcra App
        </button>

    </div>
  </div>
</div>



      </div>


     
    </header>
    
  );
};

export default Header;
