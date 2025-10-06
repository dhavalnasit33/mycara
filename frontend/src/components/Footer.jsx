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
import Row from "./ui/Row";
import Section from "./ui/Section";

const Footer = () => {
  return (
    <footer className=" text-gray-700" style={{ backgroundColor: "rgba(210, 175, 159, 0.3)" }}>
<div className="max-w-[1440px] mx-auto w-full py-[50px] md:py-[80px] px-4 sm:px-2 lg:px-0 grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* Logo & Contact */}
        <div className="space-y-4">
          <div>
            <img
              src={require("../assets/my_logo.png")}
              alt="MYcra Logo"
              className="w-[190px] h-[58.52px]  md:mx-0  mb-[35px]"
            />
          </div>
          <p className="flex py-[5px] gap-[20px] text-sm items-start md:items-center">
            <IoLocationOutline className="text-gray-600 w-[30px] h-[30px]" />
            215, Dhara Arcade near Lajamani Chowk, Surat
          </p>
          <p className="flex py-[5px] items-center gap-[20px] text-sm">
            <TfiEmail className="text-gray w-[25px] h-[20px]" />
            <a href="mailto:info@gmail.com" className="hover:underline break-words">
              Info@gmail.com
            </a>
          </p>
          <p className="flex py-[5px] items-center gap-[20px] text-sm">
            <BsTelephone className="text-gray w-[25px] h-[20px]" /> +1[155]000-01000
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h2 className="font-regular text-20px text-black  mb-[35px] tracking-[3%]">
            NAVIGATION LINKS
            <span className="theme-border-block w-[45px]"></span>
          </h2>
          <ul className="space-y-2 text-sm list-disc list-inside marker:text-light">
            <li>
              <a href="#" className="text-light text-[15px]">About</a>
            </li>
            <li>
              <a href="/contact-us" className="text-light text-[15px]">Contact Us</a>
            </li>
            <li>
              <a href="/offer" className="text-light text-[15px]">Offers</a>
            </li>
            <li>
              <a href="#" className="text-light text-[15px]">Women</a>
            </li>
          </ul>
        </div>

        {/* Customer Support */}
        <div>
          <h2 className="font-regular text-black text-20px  mb-[35px] tracking-[3%]">
            CUSTOMER SUPPORT
            <span className="theme-border-block w-[45px]"></span>
          </h2>
          <ul className="space-y-2 text-sm list-disc list-inside marker:text-light">
            <li>
              <a href="#" className="text-light text-[15px]">Return Policy</a>
            </li>
            <li>
              <a href="#" className="text-light text-[15px]">FAQ</a>
            </li>
            <li>
              <a href="#" className="text-light text-[15px]">Terms & Conditions</a>
            </li>
            <li>
              <a href="#" className="text-light text-[15px]">Privacy Policy</a>
            </li>
            <li>
              <a href="#" className="text-light text-[15px]">Payment Methods</a>
            </li>
          </ul>
        </div>

        {/* Join Now */}
        <div>
          <h2 className="font-regular text-black mb-[35px] tracking-[3%] text-20px">
            JOIN NOW !
            <span className="theme-border-block w-[45px]"></span>
          </h2>
          <p className="text-sm mb-3 text-light">
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

      <Section  style={{ backgroundColor: "rgba(210, 175, 159, 0.5)" }}>
      <Row>
        <div className=" grid grid-cols-1 md:grid-cols-2 gap-[50px] md:gap-[30px] items-center">
         <div className="flex flex-col text-center md:text-right items-center md:items-end">
            <h3 className="font-medium text-black tracking-wide text-[22px] mb-[28px] leading" >
              DOWNLOAD OUR APP
            </h3>
            <div className="grid grid-cols-2 gap-3 w-full max-w-[360px]">
              <img
                src={googlePlay}
                alt="Google Play"
                className="w-full h-auto max-w-[178px] mx-auto sm:mx-0 cursor-pointer"
              />
              <img
                src={appleStore}
                alt="App Store"
                className="w-full h-auto max-w-[178px] mx-auto sm:mx-0 cursor-pointer"
              />
            </div>
          </div>
          {/* Follow Us */}
          <div className="flex flex-col items-center md:items-start w-full md:w-auto">
            <h3 className="font-medium text-black tracking-wide text-[22px]  mb-[28px] leading">
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
      </Row>
      </Section>

      {/* Copyright */}
<div className="w-full p-[10px]  text-center text-white bg-color text-p ">
  © 2024 MYcra Fashion Ltd. All Rights Reserved
</div>


    </footer>
  );
};

export default Footer;
