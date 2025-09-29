import React from "react";

import { FiFacebook } from "react-icons/fi";
import { TfiTwitter } from "react-icons/tfi";
import { FaInstagram, FaYoutube } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { TfiEmail } from "react-icons/tfi";
import { BsTelephone } from "react-icons/bs";

import { IoIosSend } from "react-icons/io";

import visaImg from "../assets/visa.png";
import mastercardImg from "../assets/mastercard.png";
import discoverImg from "../assets/discover.png";
import paypalImg from "../assets/paypal.png";
import googlePlay from "../assets/googlePlay.png";
import appleStore from "../assets/appleStore.png";

const Footer = () => {
  return (
    <footer className=" text-gray-700" style={{ backgroundColor: "rgba(210, 175, 159, 0.3)" }}>
      <div className="max-w-[1440px] mx-auto w-full py-12 px-4 sm:px-2 lg:px-0 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo & Contact */}
        <div className="space-y-4">
          <h1>
            <img
              src={require("../assets/my_logo.png")}
              alt="MYcra Logo"
              className="w-[190px] h-[58.52px]  md:mx-0"
            />
          </h1>
          <p className="flex py-[5px] gap-2 text-sm items-start md:items-center">
            <IoLocationOutline className="text-gray-600 w-[30px] h-[30px]" />
            215, Dhara Arcade near Lajamani Chowk, Surat
          </p>
          <p className="flex py-[5px] items-center gap-2 text-sm">
            <TfiEmail className="text-gray w-[25px] h-[20px]" />
            <a href="mailto:info@gmail.com" className="hover:underline break-words">
              Info@gmail.com
            </a>
          </p>
          <p className="flex py-[5px] items-center gap-2 text-sm">
            <BsTelephone className="text-gray w-[25px] h-[20px]" /> +1[155]000-01000
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h2 className="font-regular text-black mb-4 tracking-[3%]">
            NAVIGATION LINKS
            <span className="theme-border-block w-[45px]"></span>
          </h2>
          <ul className="space-y-2 text-sm list-disc list-inside marker:text-[rgba(0,0,0,0.7)]">
            <li>
              <a href="#" className="text-[rgba(0,0,0,0.7)] text-[15px]">About</a>
            </li>
            <li>
              <a href="#" className="text-[rgba(0,0,0,0.7)] text-[15px]">Contact Us</a>
            </li>
            <li>
              <a href="#" className="text-[rgba(0,0,0,0.7)] text-[15px]">Offers</a>
            </li>
            <li>
              <a href="#" className="text-[rgba(0,0,0,0.7)] text-[15px]">Women</a>
            </li>
          </ul>
        </div>

        {/* Customer Support */}
        <div>
          <h2 className="font-regular text-black mb-4 tracking-[3%]">
            CUSTOMER SUPPORT
            <span className="theme-border-block w-[45px]"></span>
          </h2>
          <ul className="space-y-2 text-sm list-disc list-inside marker:text-[rgba(0,0,0,0.7)]">
            <li>
              <a href="#" className="text-[rgba(0,0,0,0.7)] text-[15px]">Return Policy</a>
            </li>
            <li>
              <a href="#" className="text-[rgba(0,0,0,0.7)] text-[15px]">FAQ</a>
            </li>
            <li>
              <a href="#" className="text-[rgba(0,0,0,0.7)] text-[15px]">Terms & Conditions</a>
            </li>
            <li>
              <a href="#" className="text-[rgba(0,0,0,0.7)] text-[15px]">Privacy Policy</a>
            </li>
            <li>
              <a href="#" className="text-[rgba(0,0,0,0.7)] text-[15px]">Payment Methods</a>
            </li>
          </ul>
        </div>

        {/* Join Now */}
        <div>
          <h2 className="font-regular text-black mb-4 tracking-[3%]">
            JOIN NOW !
            <span className="theme-border-block w-[45px]"></span>
          </h2>
          <p className="text-sm mb-3">
            Become a MYcra member and get 10% off your next purchase!
          </p>

              <div className="flex flex-col sm:flex-row mb-4 gap-2">
                <div className="relative w-full">
                  <input
                    type="email"
                    placeholder="Enter Your E-mail Address"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none pr-12"
                  />
                  <IoIosSend 
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-pink-500 text-6xl cursor-pointer"
                  />
                </div>
              </div>

<div className="flex flex-wrap gap-3  sm:justify-start items-center">
  <img src={visaImg} alt="Visa" className="w-[100px] sm:w-[70px] h-[54px] sm:h-[72px] object-contain" />
  <img src={mastercardImg} alt="Mastercard" className="w-[100px] sm:w-[70px] h-[54px] sm:h-[72px] object-contain" />
  <img src={discoverImg} alt="Discover" className="w-[100px] sm:w-[70px] h-[54px] sm:h-[72px] object-contain" />
  <img src={paypalImg} alt="Paypal" className="w-[100px] sm:w-[70px] h-[54px] sm:h-[72px] object-contain" />
</div>

        </div>
      </div>

      {/* Bottom Section */}
      <div
        className="text-white text-sm"
        style={{ backgroundColor: "rgba(210, 175, 159, 0.5)" }}
      >
        <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Download Our App */}
          <div className="flex flex-col items-center md:items-end gap-6 ml-auto">
            <h3 className="font-medium text-black tracking-wide text-[22px]">
              DOWNLOAD OUR APP
            </h3>
            <div className="flex flex-wrap gap-3 justify-center md:justify-end">
              <img
                src={googlePlay}
                alt="Google Play"
                className="w-[178px] h-[50px] cursor-pointer"
              />
              <img
                src={appleStore}
                alt="App Store"
                className="w-[178px] h-[50px] cursor-pointer"
              />
            </div>
          </div>

          {/* Follow Us */}
          <div className="flex flex-col items-center md:items-start gap-6 w-full md:w-auto">
            <h3 className="font-medium text-black tracking-wide text-[22px]">
              FOLLOW US
            </h3>
            <div className="flex gap-3 flex-wrap justify-center md:justify-start">
              <FiFacebook className="w-[50px] h-[50px] p-2 rounded-[5px] bg-color text-white border-white cursor-pointer transition" />
              <FaInstagram className="w-[50px] h-[50px] p-2 rounded-[5px] bg-color text-white border-white cursor-pointer transition" />
              <FaYoutube className="w-[50px] h-[50px] p-2 rounded-[5px] bg-color text-white border-white cursor-pointer transition" />
              <TfiTwitter className="w-[50px] h-[50px] p-2 rounded-[5px] bg-color text-white border-white cursor-pointer transition" />
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
<div className="w-full h-10 flex items-center justify-center text-white bg-color border-t border-white/30 px-2 text-sm sm:text-base">
  © 2024 MYcra Fashion Ltd. All Rights Reserved
</div>


    </footer>
  );
};

export default Footer;
