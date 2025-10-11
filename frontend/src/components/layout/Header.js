// D:\mycara\frontend\src\components\Header.js

import React, { useState } from "react";
import {
  FaUser,
} from "react-icons/fa";
import ShopIcon from "../icons/shop";
import CollectionsIcon from "../icons/Collections";

import MoreIcon from "../icons/More"; 

import LoginIcon from "../icons/login"; 

import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faGift } from "@fortawesome/free-solid-svg-icons";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
import OrdersIcon from "../../assets/orders.svg";

import WhiteLogin from "../../assets/white login.png";

import PayImg from "../../assets/pay.png";

import HeaderLogo from "../../assets/logo.png";
import Logo from "../../assets/my_logo.png";
import bannerImg from "../../assets/banner.png";
import banner1 from "../../assets/banner1.png";
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
    hasDropdown: true, 
    dropdownIcon: <ChevronDown className="w-4 h-4 ml-1 inline-block" />, 
  },
  { name: "Offers", path: "/offer", icon: <HandCoins className="w-5 h-5" /> },
  { name: "About", path: "", icon: <SearchX className="w-5 h-5" /> },
  { name: "Contact", path: "/contact-us", icon: <Contact className="w-5 h-5"  /> },

];

const Header = ({ hideOnMobileShopPage  }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);


  return (
    <header className="{headerClasses}   w-full mb-[5px] md:mb-[10px] sec-theme  box-shadow ">
      <Row className=" md:h-[100px] gap-[10px] lg:h-[100px] hidden lg:flex justify-between items-center  ">
        <div className="hidden lg:flex items-center space-x-2">
          <Link to="/home"><img
            src={HeaderLogo}
            alt="Logo"
            className="w-[160px] md:w-[228px] h-auto"
          />
          </Link>
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

                <ul className="text-light text-p p-[17px]">
                  <li className=" py-[10px] hover:text-[#F43297]">
                    <Link to="/my-account" className="flex items-center gap-[15px] w-full">
                      <LoginIcon />
                      <span>My Profile</span>
                    </Link>
                  </li>
                  <li className=" py-[8px] hover:text-[#F43297]">
                    <Link to="/my-account/orders" className="flex items-center  gap-[15px] w-full">
                      <img src={OrdersIcon} alt="Orders" className="w-[18px] h-[18px] " />
                      <span>Orders</span>
                    </Link>
                  </li>
                  <li className=" py-[8px] hover:text-[#F43297]">
                    <Link to="/wishlist" className="flex items-center gap-[15px] w-full">
                      <FontAwesomeIcon icon={farHeart} />
                      <span>Wishlist</span>
                    </Link>
                  </li>
                  <li className=" py-[8px] hover:text-[#F43297]">
                    <Link to="/gift-cards" className="flex items-center gap-[15px] w-full">
                      <SvgComponent />
                      <span>Gift Cards</span>
                    </Link>
                  </li>
                  <li className="py-[8px] hover:text-[#F43297]">
                    <Link to="/coupons" className="flex items-center gap-[15px] w-full">
                      <FontAwesomeIcon icon={faGift} />
                      <span>Coupons</span>
                    </Link>
                  </li>
                </ul>

              </div>
            </div>
          {/* Icons */}
            <span className="text-light">
              <Link to="/wishlist">
                <Heart size={22}/>
              </Link>            
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
        {!isMenuOpen && (
          <button
            className="text-light transition-colors duration-300 border rounded-[3px] p-[5px] border-[#D2AF9F]"
            onClick={() => setIsMenuOpen(true)}
          >
            <Menu size={20} />
          </button>
        )}

        <img src={Logo} alt="Logo" className="h-10 w-[120px] mx-auto" />
        
        <div className="flex items-center gap-[10px]">
          <span className="text-light">
            <Link to="/login">
              <LoginIcon />
            </Link>
          </span>
            <span className="text-light">
              <Link to="/wishlist">
                <Heart size={22}/>
              </Link>
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
         
    
        {/* ==================== mobile ==================== */}
        {isMenuOpen && (
          <div
            className="fixed inset-0 bg-black/60 z-40"
            onClick={() => setIsMenuOpen(false)}
          />
        )}

        <div
          className={`fixed top-0 left-0 w-3/4 max-w-[430px] h-screen bg-white shadow-lg z-50 transform transition-transform duration-300 ${
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <button
            className="absolute top-4 right-2 transition-colors text-light transition-colors duration-300 border rounded-[3px] p-[5px] border-[#D2AF9F] "
            onClick={() => setIsMenuOpen(false)}
          >
            <X size={22} />
          </button>

          <div className="flex h-full flex-col overflow-y-auto no-scrollbar">
            <div>
              <img src={bannerImg} className="w-full" alt="Banner" />
            </div>

            <nav className="py-3">
              {navItems.map((item, i) => {
                if (item.name === "Home") return null;
                const isMobileHighlight = ["Shop", "Offers", "Contact"].includes(item.name);
                return (
                  <NavLink
                    key={item.id || i}
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center gap-3 py-4 px-4 text-gray-700 ${
                      isMobileHighlight ? "bg-theme sm:bg-transparent" : "bg-white"
                    }`}
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

              <div className="text-light">
                <div className="py-4 px-4 cursor-pointer bg-theme sm:bg-transparent">
                  <Link to="/my-account" className="flex items-center gap-[15px]">
                    <FaUser />My Profile
                  </Link>
                </div>
                <div className="py-4 px-4 cursor-pointer">
                  <Link to="/my-account/orders" className="flex items-center gap-[15px]">
                    <img src={OrdersIcon} alt="Orders" className="w-5 h-5" />Orders
                  </Link>
                </div>
                <div className="py-4 px-4 cursor-pointer bg-theme sm:bg-transparent">
                  <Link to="/wishlist" className="flex items-center gap-[15px]">
                    <FontAwesomeIcon icon={farHeart} />Wishlist
                  </Link>
                </div>
                <div className="py-4 px-4 cursor-pointer">
                  <Link to="#" className="flex items-center gap-[15px]">
                    <SvgComponent />Gift Cards
                  </Link>
                </div>
                <div className="py-4 px-4 cursor-pointer bg-theme sm:bg-transparent">
                  <Link to="#" className="flex items-center gap-[15px]">
                    <FontAwesomeIcon icon={faGift} />Coupons
                  </Link>
                </div>
                <div className="py-4 px-4 cursor-pointer">
                  <Link to="#" className="flex items-center gap-[15px]">
                    <Notification className="w-5 h-5" />Notifications
                  </Link>
                </div>
              </div>
            </nav>

            <div>
              <img src={banner1} className="w-full" alt="Bottom Banner" />
            </div>
          </div>
        </div>
    </header>   
  );
};

export default Header;
