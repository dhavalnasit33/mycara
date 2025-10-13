import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  FaUser,
  FaBars,
} from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faGift } from "@fortawesome/free-solid-svg-icons";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
import { ChevronDown, Contact,  HandCoins, Heart, Menu, SearchX, XCircleIcon } from "lucide-react";

import ShopIcon from "../icons/shop";
import CollectionsIcon from "../icons/Collections";

import HeaderLogo from "../../assets/logo.png";
import bannerImg from "../../assets/banner.png";
import banner1 from "../../assets/banner1.png";
import OrdersIcon from "../../assets/orders.svg";
import WhiteLogin from "../../assets/white login.png";

import Button from "../ui/Button";
import Row from "../ui/Row";
import LoginForm from "../../pages/Login";
import LoginIcon from "../icons/login"; 

const navItems = [
  {
    name: "Home",
    path: "/home",
    icon: <ShopIcon className="w-5 h-6 hidden custom-lg:block" />,
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

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <header className="{headerClasses}   w-full mb-[5px] md:mb-[10px] sec-theme  box-shadow">
<Row className="h-[70px] custom-lg:h-[100px] flex items-center justify-between">
     <button
          className=" custom-lg:hidden text-light transition-colors duration-300 border rounded-[3px] p-[5px] border-[#D2AF9F]"
          onClick={() => setIsMenuOpen(true)}
        >
          <Menu size={20} />
    </button>

  <div className="flex items-center">
    <Link to="/home">
      <img src={HeaderLogo} alt="Logo" className="h-10 custom-lg:h-14" />
    </Link>
  </div>

  <div className="hidden custom-lg:flex items-center gap-6">
    <nav>
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
              {item.name}
              {item.hasDropdown && item.dropdownIcon}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  </div>

  <div className="flex items-center gap-4">
      <div className="relative hidden custom-lg:block group">
        <Button
          variant="common"
          className="!min-w-[113px] !py-[7px] !px-[8px] flex items-center"
          onClick={() => setIsLoginOpen(true)}
        >
          <img src={WhiteLogin} alt="Login" className="w-5 h-5 mr-2" />
          Login
          <ChevronDown
            size={16}
            className="ml-1 transition-transform duration-300 group-hover:rotate-180"
          />
        </Button>
        <div className="absolute right-0 mt-2 w-[280px] bg-white rounded-[10px] form-shadow z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">

          <div className="p-[17px] text-light text-p flex justify-between border-b border-[#989696]">
            <span>Welcome User!</span>
            <span className="text-color cursor-pointer font-18 font-medium">
              <Link to="/register">Sign Up</Link>
            </span>
          </div>

          <ul className="text-light text-p p-[17px]">
            <li className="py-[10px] hover:text-[#F43297]">
              <Link to="/my-account" className="flex items-center gap-[15px] w-full">
                <LoginIcon />
                <span>My Profile</span>
              </Link>
            </li>

            <li className="py-[8px] hover:text-[#F43297]">
              <Link
                to="/my-account/orders"
                className="flex items-center gap-[15px] w-full"
              >
                <img src={OrdersIcon} alt="Orders" className="w-[18px] h-[18px]" />
                <span>Orders</span>
              </Link>
            </li>

            <li className="py-[8px] hover:text-[#F43297]">
              <Link to="/wishlist" className="flex items-center gap-[15px] w-full">
                <FontAwesomeIcon icon={farHeart} />
                <span>Wishlist</span>
              </Link>
            </li>

            <li className="py-[8px] hover:text-[#F43297]">
              <Link to="/cart" className="flex items-center gap-[15px] w-full">
                <FontAwesomeIcon icon={faGift} />
                <span>Coupons</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>


    <Link to="/wishlist" className="text-light hover:text-pink-500 ">
      <Heart className="w-5 h-5" />
    </Link>

    <Link to="/cart" className="relative text-light hover:text-pink-500">
      <FontAwesomeIcon icon={faCartShopping} className="w-5 h-5" />
      <span className="absolute -top-2 -right-2 bg-[#D2AF9F] text-black text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
        0
      </span>
    </Link>
    
  </div>
</Row>
        {isMenuOpen && (
          <div
            className="fixed inset-0 bg-black/60 z-40"
            onClick={() => setIsMenuOpen(false)}
          />
        )}

        <div
          className={`fixed top-0 left-0 w-3/4 max-w-[430px] h-screen bg-white box-shadow z-50 transform transition-transform duration-300 ${
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <button
            className="absolute top-4 right-2 transition-colors text-light transition-colors duration-300 border rounded-[3px] p-[5px] border-[#D2AF9F] "
            onClick={() => setIsMenuOpen(false)}
          >
            <XCircleIcon size={22} />
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
                  <Link to="/cart" className="flex items-center gap-[15px]">
                    <FontAwesomeIcon icon={faGift} />Coupons
                  </Link>
                </div>
              </div>
            </nav>

            <div>
              <img src={banner1} className="w-full" alt="Bottom Banner" />
            </div>
          </div>
          </div>
      {isLoginOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center px-4">
          <div className="relative bg-white w-full max-w-[1062px] rounded-md overflow-hidden">
            <LoginForm onClose={() => setIsLoginOpen(false)} />
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
