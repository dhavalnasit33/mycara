// D:\mycara\frontend\src\components\Header.js

import React, { useState } from "react";
import {
  FaUser,

  FaBars,
  FaTimes, 
} from "react-icons/fa";
import ShopIcon from "../icons/shop";
import CollectionsIcon from "../icons/Collections";
import MoreIcon from "../icons/More"; 
import LoginIcon from "../icons/login"; 

import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faGift } from "@fortawesome/free-solid-svg-icons";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

import BagIcon from "../../assets/bag.png";
import OrdersIcon from "../../assets/orders.svg";

import WhiteLogin from "../../assets/white login.png";
import PayImg from "../../assets/pay.png";
import Logo from "../../assets/my_logo.png";
import bannerImg from "../../assets/banner.png";

import Notification from "../icons/notification";

import SvgComponent from "../icons/SvgComponent";
import Button from "../ui/Button";
import { ChevronDown, Contact, Ellipsis, HandCoins, Heart, Menu, SearchX, X } from "lucide-react";
import Row from "../ui/Row";

//  Menu List
const navItems = [
  {
    name: "Home",
    path: "/home",
    icon: <ShopIcon className="w-5 h-6 hidden lg:block" />,
  },
  { name: "Shop", path: "/shop", icon: <ShopIcon className="w-5 h-6" /> },
  {
    name: "Collections",
    path: "/collections",
    icon: <CollectionsIcon className="w-5 h-5" />,
    hasDropdown: true, // 👈 indicates dropdown
    dropdownIcon: <ChevronDown className="w-4 h-4 ml-1 inline-block" />, // arrow after text
  },
  // { name: "Blogs", path: "/blogs", icon: <BlogsIcon className="w-5 h-5" /> },
  // {
  //   name: "Features",
  //   path: "/features",
  //   icon: <FeaturesIcon className="w-5 h-5" />,
  //   hasDropdown: true,
  //   dropdownIcon: <ChevronDown className="w-4 h-4 ml-1 inline-block" />,
  // },
  // { name: "More", path: "/more", icon: <MoreIcon className="w-5 h-5" /> },
  { name: "Offers", path: "/offer", icon: <HandCoins className="w-5 h-5" /> },
  { name: "About", path: "", icon: <SearchX className="w-5 h-5" /> },
  { name: "Contact", path: "/contact-us", icon: <Contact className="w-5 h-5"  /> },

];

const Header = ({ hideOnMobileShopPage  }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // const headerClasses = `
  //   bg-primary-50 shadow-md 
  //   ${hideOnMobileShopPage ? 'hidden lg:block' : 'block'} 
  // `;

  
  return (
    <header className="{headerClasses}   w-full mb-[5px] md:mb-[10px] sec-theme  box-shadow ">
    
      <Row className=" md:h-[100px] gap-[10px] lg:h-[100px] hidden lg:flex justify-between items-center  ">
        {/* Logo */}
        <div className="hidden lg:flex items-center space-x-2">
          {/* <Link to="/home"> */}
          <Link to="/home"><img
            src={Logo}
            alt="Logo"
            className="w-[160px] md:w-[228px] h-auto"
          />
          </Link>
          {/* </Link> */}
        </div>

        {/* Desktop Nav */}
        <nav className="hidden lg:block">
          <ul className="flex gap-[26px] xl:gap-[32px] text-base font-normal">
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
                        className={`absolute left-1/2 -translate-x-1/2 -bottom-5 flex space-x-1 transition-opacity duration-300 ${
                          isActive
                            ? "opacity-100"
                            : "opacity-0 group-hover:opacity-100"
                        }`}
                      >
                         <span ><Ellipsis className="text-xl"/></span>
                      </span>
                      {item.hasDropdown && item.dropdownIcon} 
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-[20px] relative">
          {/* <div className="relative  sm:block"> */}
            <div className="relative group">
              <Link to="/login">
                <Button
                  variant="common"
                  className="!min-w-[113px] !py-[7px] !px-[8px] !rounded-[10px] flex items-center"
                >
                  <img src={WhiteLogin} alt="Login" className="w-[24px] h-[24px] mr-3" />
                  <span>Login</span>
                  <span className="ml-1 transition-transform duration-300 group-hover:rotate-180">
                    <ChevronDown size={18} />
                  </span>
                </Button>
              </Link>

              {/* Dropdown Menu */}
              <div className="absolute right-0 mt-2 w-[280px] bg-white rounded-[10px] form-shadow z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                <div className="p-[17px] text-light text-p flex justify-between border-b border-[#989696]">
                  <span>Welcome User !</span>
                  <span className="text-color cursor-pointer font-18 font-medium">
                    <Link to="/register">Sign Up</Link>
                  </span>
                </div>

                <ul className="text-light text-p p-[17px] cursor-pointer">
                  <li className="flex items-center space-x-[15px] py-[10px] hover:text-[#F43297]">
                    <LoginIcon />
                    <Link to="/my-account">My Profile</Link>
                  </li>
                  <li className="flex items-center space-x-[15px] py-[8px] hover:text-[#F43297]">
                    <img src={OrdersIcon} alt="Orders" className="w-[18px] h-[18px]" />
                    <Link to="/my-account/orders"><span>Orders</span></Link>
                  </li>
                  <li className="flex items-center space-x-[15px] py-[8px] hover:text-[#F43297]">
                    <FontAwesomeIcon icon={farHeart} />
                    <span>Wishlist</span>
                  </li>
                  <li className="flex items-center space-x-[15px] py-[8px] hover:text-[#F43297]">
                    <SvgComponent />
                    <span>Gift Cards</span>
                  </li>
                  <li className="flex items-center space-x-[15px] py-[8px] hover:text-[#F43297]">
                    <FontAwesomeIcon icon={faGift} />
                    <span>Coupons</span>
                  </li>
                </ul>
              </div>
            </div>
          {/* Icons */}
          
          <span className="text-light">
            <Heart size={22}/>
          </span>
            <span className="text-light">
              <Link to="/cart">
                <FontAwesomeIcon
                  icon={faCartShopping}
                  className="w-[20px] h-[20px] text-black/70 cursor-pointer hover:text-[var(--theme-color)] hidden lg:block"
                />
              </Link>
                <div className="absolute top-1.5 right-1 bg-[#D2AF9F] text-black text-[10px] rounded-full w-[16px] h-[16px] flex items-center justify-center -mt-2 -mr-2">
                  0
                </div>
            </span>
        </div>
      </Row>

      {!hideOnMobileShopPage && (
        <div className="flex items-center  gap-[10px] justify-between w-full h-[80px] px-4 lg:hidden">
            <button
                className="text-light transition-colors duration-300 border rounded-[3px] p-[5px] border-3 border-[#D2AF9F]"
                style={{ color: "var(--text-light)" }}
                onMouseEnter={(e) => e.currentTarget.style.color = "var(--text-light)"}
                onMouseLeave={(e) => e.currentTarget.style.color = "var(--text-light)"}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
            {isMenuOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
            <img src={Logo} alt="Logo" className="h-10 w-[120px] mx-auto" />
            
            <div className="flex items-center gap-[10px]">
            <span className="text-light">
              <Link to="/login">
                <LoginIcon />
              </Link>
            </span>
              <span className="text-light">
                <Heart size={22}/>
              </span>
            <span className="text-light">
              <Link to="/cart">
                <FontAwesomeIcon
                  icon={faCartShopping}
                  className="w-[24px] h-[24px] text-black/70 cursor-pointer hover:text-[var(--theme-color)]"
                />
              </Link>
                <div className="absolute top-7 right-4 bg-[#D2AF9F] text-black text-[10px] rounded-full w-[16px] h-[16px] flex items-center justify-center -mt-2 -mr-2">
                  0
                </div>
            </span>
            </div>
        </div>
      )}
         


             
        {/* Sidebar Header */}
        <div
          className={`fixed top-0 left-0 w-full h-screen bg-white shadow-lg z-50 transform transition-transform duration-300 ${
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
        <div className="flex justify-between bg-theme items-center px-4 py-3 border-b ">
          <button
              className="text-gray-600 transition-colors duration-300 border border-3 rounded-[3px] p-[5px] border-[#D2AF9F]"
              style={{ color: "var(--text-light)" }}
              onMouseEnter={(e) => e.currentTarget.style.color = "var(--text-light)"} 
              onMouseLeave={(e) => e.currentTarget.style.color = "var(--text-light)"} 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
            {isMenuOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
            <img src={Logo} alt="Logo" className="mx-auto h-10" />
          <img src={BagIcon} alt="Bag" className="w-5 h-5 cursor-pointer  lg:block" />
        </div>
      <div className="flex h-full overflow-y-auto no-scrollbar">
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
            return null; 
            const isMobileHighlight = ["Shop", "Offers", "Contact"].includes(item.name);
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
          <div className="text-light">
              <div className="flex items-center space-x-2 py-4 px-4  cursor-pointer bg-theme sm:bg-transparent ">
                <FaUser /><Link to="/my-account"><span>My Profile</span></Link>
              </div>
            <div className="flex items-center space-x-2 py-4 px-4  cursor-pointer  ">
              <img src={OrdersIcon} alt="Orders" className="w-5 h-5 " />
              <Link to="/my-account/orders"><span>Orders</span></Link>
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

   {/* --- 2D. Bottom App Banner Section (Image Matched) --- */}
      <div className="mt-auto px-4 py-4 border-t border-gray-200">
          <div className="flex items-center gap-4">
              <img src={PayImg} alt="App Promo" className="w-[80px] h-auto object-contain" /> 
              <div className="flex-1">
                  <p className="text-sm font-medium mb-2 text-gray-700">
                      Enjoy The Best Shopping Experience !
                  </p>
                  <button 
                      className="w-full text-white bg-pink-600 hover:bg-pink-700 font-semibold py-2 rounded-lg transition-colors shadow-md"
                      style={{ backgroundColor: '#DB447C' }} 
                  >
                      Get MYcra App
                  </button>
              </div>
          </div>
      </div>
      <div className="flex justify-end px-4 py-3 border-t">
          <button
            className="text-gray-600 transition-colors duration-300 rounded-[3px] p-[5px] border border-3 border-[#D2AF9F]"
            style={{ color: "var(--text-light)" }}
            onMouseEnter={(e) => e.currentTarget.style.color = "var(--text-light)"}
            onMouseLeave={(e) => e.currentTarget.style.color = "var(--text-light)"}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
          </div>
    </div>
        
        </div>
     
    </header>
    
  );
};

export default Header;
