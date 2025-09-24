import React, { useEffect } from "react";
import herobannerImage from "../assets/herobanner.png";
import DiscountStarIcon from './icons/DiscountStarIcon';

// This is the updated DiscountBadge component using the imported SVG
const DiscountBadge = ({ text = "50% off" }) => {
  return (
    <div className="absolute top-5 left-5 w-[120px] h-[120px] z-20 flex items-center justify-center">
      {/* SVG Icon - અહીં સ્ટાર આકાર દેખાશે */}
      <DiscountStarIcon 
          // SVG ની સાઈઝ તેના કન્ટેનર જેટલી રાખવા માટે
          width="100%" 
          height="100%" 
          // સ્ટારને ત્રાસો કરવા માટે Tailwind rotation class
          className="transform rotate-[0deg]" 
      />
      
      {/* Text Overlay - સ્ટારની ઉપર ટેક્સ્ટ મૂકવા માટે */}
      <div className="absolute text-white text-xl font-bold transform rotate-[-50deg]">
          {text}
      </div>
    </div>
  );
};

const HeroBanner = () => {
  // Ensure the underline style is applied for the title
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      .theme-block {
          background-color: black;
          height: 2px;
          position: absolute;
          bottom: -8px;
          left: 0;
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  return (
    // The main container is now a flex row on all screen sizes
    <div className="flex justify-center items-center bg-red-50 px-5 font-sans">
      {/* Left Image Section */}
      <div className="relative flex-1">
        {/* Discount Badge (now uses SVG) */}
        <DiscountBadge />
        
        {/* Hero Image */}
        <img
          src={herobannerImage}
          alt="Stylish woman in a trench coat and hat"
          // Image size is now controlled by flexbox, ensuring it doesn't break the layout
          className="w-full h-full object-cover"
        />

        {/* Half Blur Overlay */}
        <div className="absolute top-0 left-0 w-1/2 h-full bg-white/0 backdrop-blur-sm pointer-events-none"></div>
      </div>

      {/* Right Text Section */}
      {/* Use padding for spacing on all screens */}
      <div className="flex-1 text-center md:text-left pl-10 pr-5 flex flex-col justify-center items-center md:items-start">
        <h2
          className="text-[20px] sm:text-[32px] md:text-[40px] font-sans text-black mb-6 relative"
          style={{ filter: "drop-shadow(5px 2px 4px rgba(0,0,0,0.4))" }}
        >
          Flesh Deals
          <span className="absolute theme-border-block w-[100px]"></span>
        </h2>

        <p className="text-[10px] sm:text-[14px] md:text-[24px] text-[#989696] mb-4">
          Stylish Regular Fit Light Marun Denim For Women's & Girls
        </p>

        <p className="text-[10px] sm:text-[18px] md:text-[18px] font-regular text-black mb-6 inline-block pb-1 border-b-2 border-black">
          Rs 1099.00
        </p>

        <div>
          <button className="bg-pink-500 text-white font-regular text-sm py-2 px-6 md:text-base md:py-3 md:px-8 rounded-lg hover:bg-pink-600 transition duration-300">
            Shop Now!
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
