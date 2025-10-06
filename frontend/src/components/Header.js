// D:\mycara\frontend\src\components\Header.js

import React, { useState, useEffect } from "react";
import {
  FaUser,

  FaBars,
  FaTimes, 
} from "react-icons/fa";
import ShopIcon from "./icons/shop";
import CollectionsIcon from "./icons/Collections";
import BlogsIcon from "./icons/Blogs"; // 👈 tamaru Blogs.jsx import karo
import FeaturesIcon from "./icons/Features";
import MoreIcon from "./icons/More"; 
import LoginIcon from "./icons/login"; 

import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faGift } from "@fortawesome/free-solid-svg-icons";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

import BagIcon from "../assets/bag.png";
import OrdersIcon from "../assets/orders.svg";

import WhiteLogin from "../assets/white login.png";
import MenuIcon from "../assets/menu.png";
import PayImg from "../assets/pay.png";
import Logo from "../assets/logo.png";
import bannerImg from "../assets/banner.png";

import Notification from "./icons/notification";

import SvgComponent from "./icons/SvgComponent";
import Button from "./ui/Button";
//  Menu List
const navItems = [
 {
    name: "Home",
    path: "/Home",
    // 👇 Home icon + text only desktop ma show thase
    icon: <ShopIcon className="w-5 h-6 hidden lg:block" />,
  },
  { name: "Shop", path: "/shop", icon: <ShopIcon className="w-5 h-6" /> },
   { name: "Collections", path: "/collections", icon: <CollectionsIcon className="w-5 h-5" /> },
   { name: "Blogs", path: "/blogs", icon: <BlogsIcon className="w-5 h-5" /> },
  { name: "Features", path: "/features", icon: <FeaturesIcon className="w-5 h-5" /> },
{ name: "More", path: "/more", icon: <MoreIcon className="w-5 h-5" /> },
];


const Header = ({ hideOnMobileShopPage }) => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const headerClasses = `
    bg-primary-50 shadow-md 
    ${hideOnMobileShopPage ? 'hidden lg:block' : 'block'} 
  `;

  
  return (
    <header className="{headerClasses}   w-full mb-[5px] md:mb-[10px] sm:mb-[0px] sec-theme  box-shadow ">
    
      <div className=" container-1440  mx-auto md:h-[100px] lg:h-[100px] hidden lg:flex justify-between items-center  ">
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

        <div className="flex items-center space-x-4 relative">
          {/* <div className="relative  sm:block"> */}
            <div className="relative group ">
              <Link to="/login">
                <Button  variant="common" className="!min-w-[113px] !py-[7px] !px-[10px] !rounded-[10px] flex items-center">
                  <img src={WhiteLogin} alt="Login" className="w-[24px] h-[24px] mr-3" />
                  <span>Login</span>
                </Button>
              </Link>
              <div className="absolute right-0 mt-2 w-[280px] bg-white rounded-[10px] form-shadow z-50 opacity-0 group-hover:opacity-100   transition-all duration-300">
                <div className="p-[17px] text-light text-p flex justify-between border-b border-[#989696]">
                  <span>Welcome User !</span>
                  <span className="text-color cursor-pointer font-medium">
                    <Link to="/register">Sign Up</Link>
                  </span>
                </div>

                <ul className="text-light text-p p-[17px] space-x-[2px] cursor-pointer">
                  <li className="hover:bg-[var(--theme-bg-rgba)] flex items-center space-x-[15px] py-[10px] ">
                    {/* <img src={LoginIcon} alt="My Profile" className="w-[18px] h-[18px]" /> */}
                    <img src={LoginIcon} alt="My Profile" className="w-[18px] h-[18px]" /> 

                    <Link to="/my-account">My Profile</Link>
                  </li>
                  <li className="hover:bg-[var(--theme-bg-rgba)] py-[10px] flex items-center space-x-[15px] ">
                    <img src={OrdersIcon} alt="Orders" className="w-[18px] h-[18px]" />
                    <span>Orders</span>
                  </li>
                  <li className=" hover:bg-[var(--theme-bg-rgba)] flex  py-[10px] items-center space-x-[15px] ">
                    <FontAwesomeIcon icon={farHeart} />
                    <span>Wishlist</span>
                  </li>
                  <li className=" hover:bg-[var(--theme-bg-rgba)] flex py-[10px] items-center space-x-[15px]">
                    <SvgComponent />
                    <span>Gift Cards</span>
                  </li>
                  <li className=" hover:bg-[var(--theme-bg-rgba)] flex  py-[10px] items-center space-x-[15px] ">
                    <FontAwesomeIcon icon={faGift} />
                    <span>Coupons</span>
                  </li>
                </ul>
              </div>
            </div>

          {/* </div> */}

          {/* Icons */}
          <MagnifyingGlassIcon 
              className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-black/70 stroke-[2] cursor-pointer hover:text-[var(--theme-color)] " 
            />

            <Link to="/cart"><FontAwesomeIcon
              icon={faCartShopping}
              className="w-6 h-6 text-black/70 cursor-pointer hover:text-[var(--theme-color)] hidden lg:block"
            /></Link>

          <img src={BagIcon} alt="Bag" className="w-5 h-5 cursor-pointer hidden lg:block" />
          <img src={MenuIcon} alt="Menu" className="w-5 h-5 cursor-pointer hidden lg:block" />
        </div>
      </div>

            {/* Mobile Menu Button */}
      {!hideOnMobileShopPage && (
        <div className="flex items-center justify-between w-full h-[80px] px-4 lg:hidden">
            {/* Left: Hamburger */}
            <button
                className="text-gray-600 transition-colors duration-300"
                style={{ color: "var(--theme-color)" }}
                onMouseEnter={(e) => e.currentTarget.style.color = "var(--theme-color)"}
                onMouseLeave={(e) => e.currentTarget.style.color = "var(--theme-color)"}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
            {isMenuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
            </button>

            {/* Center: Logo */}
            <img src={Logo} alt="Logo" className="h-10 mx-auto" />
            
            {/* Right: Optional icons */}
            <div className="flex items-center space-x-3">
              <MagnifyingGlassIcon 
                  className="w-6 h-6 sm:w-6 sm:h-6 md:w-7 md:h-7 text-black/70 stroke-[2] cursor-pointer hover:text-[var(--theme-color)] block" 
              />
              <FontAwesomeIcon
                  icon={faCartShopping}
                  className="w-6 h-6 text-black/70 cursor-pointer hover:text-[var(--theme-color)] lg:block"
              />
              <img src={BagIcon} alt="Bag" className="w-5 h-5 cursor-pointer" />
            </div>
        </div>
      )}
          {/*  */}
          {/*  */}
             {/*  */} 
             {/*  */}


             
        {/* Sidebar Header */}
          <div
            className={`fixed top-0 left-0 w-full h-screen bg-white shadow-lg z-50 transform transition-transform duration-300 ${
              isMenuOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >

        
        <div className="flex justify-between bg-theme items-center px-4 py-3 border-b ">
           <button
              className="text-gray-600 transition-colors duration-300"
              style={{ color: "var(--theme-color)" }} // icon default color
              onMouseEnter={(e) => e.currentTarget.style.color = "var(--theme-color)"} // optional hover same color
              onMouseLeave={(e) => e.currentTarget.style.color = "var(--theme-color)"} // same color back
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
          {isMenuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
        </button>
          <img src={Logo} alt="Logo" className="mx-auto h-10" />
         <img src={BagIcon} alt="Bag" className="w-5 h-5 cursor-pointer  lg:block" />
        </div>




      <div className="flex h-full overflow-y-auto no-scrollbar">

        {/* Mobile Wrapper - Max width 450px & White background */}
        <div className=" w-[430px]  mx-left bg-white relative flex-1 flex-col  "
        style={{
            boxShadow: "0px 0px 4px rgba(0,0,0,0.25)",
          }}>

            
        {/* Banner */}
        <div
          className="relative w-full h-[154px]  overflow-hidden flex items-center justify-center"
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
              WebkitTextStroke: "2px white",
            }}
          >
            FASHION
          </h1>
        </div>




        {/* Menu Items */}
        <nav className=" py-3">
          {navItems.map((item, i) => {
          if (item.name === "Home") 
            return null; // mobile ma render nai thase

          // Mobile only background for specific items
            const isMobileHighlight = ["Shop", "Blogs", "More"].includes(item.name);

            return (
            <NavLink
              key={i}
              to={item.path}
              onClick={() => setIsMenuOpen(false)}
            
                  className={`
                  flex items-center gap-3 py-4 px-4 text-gray-700
                  ${isMobileHighlight ? "bg-theme sm:bg-transparent" : "bg-white "}
                `}
            >
              {item.icon}
              <span>{item.name}</span>
              <span className="ml-auto">›</span>
            </NavLink>
          );
        })}

        <div className="flex items-center justify-center h-[60px]">
          <hr className="w-full border-t border-dashed border-gray-400" />
        </div>


          {/* Extra Menu */}
          <div className="">
              <div className="flex items-center space-x-2 py-4 px-4  cursor-pointer bg-theme sm:bg-transparent ">
                <FaUser /> <span>My Profile</span>
              </div>
            <div className="flex items-center space-x-2 py-4 px-4  cursor-pointer  ">
              <img src={OrdersIcon} alt="Orders" className="w-5 h-5 " />
              <span>Orders</span>
            </div>
            <div className="flex items-center space-x-2 py-4 px-4  cursor-pointer bg-theme sm:bg-transparent ">
              
              <FontAwesomeIcon icon={farHeart} />
                    <span>Wishlist</span>
            </div>
            <div className="flex items-center space-x-2 py-4 px-4  cursor-pointer  ">
              <SvgComponent />
                  <span>Gift Cards</span>
            </div>
            <div className="flex items-center space-x-2 py-4 px-4  cursor-pointer bg-theme sm:bg-transparent ">
              <FontAwesomeIcon icon={faGift} />
                    <span>Coupons</span>
            </div>
            <div className="flex items-center space-x-2 py-4 px-4  cursor-pointer  ">
              <Notification className="w-5 h-5" /> 
               <span>Notifications</span>
            </div>
          </div>
        </nav>


        {/* Bottom Banner */}

   {/* --- 2D. Bottom App Banner Section (Image Matched) --- */}
        <div className="mt-auto px-4 py-4 border-t border-gray-200">
            <div className="flex items-center gap-4">
                {/* Left: Image */}
                <img src={PayImg} alt="App Promo" className="w-[80px] h-auto object-contain" /> 

                {/* Right: Text + Button */}
                <div className="flex-1">
                    <p className="text-sm font-medium mb-2 text-gray-700">
                        Enjoy The Best Shopping Experience !
                    </p>
                    {/* Button: Pink background, white text, full width */}
                    <button 
                        className="w-full text-white bg-pink-600 hover:bg-pink-700 font-semibold py-2 rounded-lg transition-colors shadow-md"
                        // Using inline style for the specific pink shade if needed
                        style={{ backgroundColor: '#DB447C' }} 
                    >
                        Get MYcra App
                    </button>
                </div>
            </div>
        </div>
      <div className="flex justify-end px-4 py-3 border-t">
          <button
            className="text-gray-600 transition-colors duration-300"
            style={{ color: "var(--theme-color)" }}
            onMouseEnter={(e) => e.currentTarget.style.color = "var(--theme-color)"}
            onMouseLeave={(e) => e.currentTarget.style.color = "var(--theme-color)"}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>
        </div>
          </div>
    </div>
        
        </div>
     
    </header>
    
  );
};

export default Header;
