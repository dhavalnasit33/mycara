import React from 'react';
import herobannerImage from '../assets/herobanner.png';

const HeroBanner = () => {
  return (
    <div className="flex flex-col md:flex-row justify-center items-center bg-red-50 py-10 px-5 md:px-20 font-sans">
      
      {/* Left Image Section */}
      <div className="relative flex-1 mb-10 md:mb-0">
        {/* Discount Badge */}
        <div className="absolute top-5 left-5 bg-pink-500 text-white font-bold p-2 md:p-4 rounded-full w-20 h-20 md:w-24 md:h-24 flex justify-center items-center transform -rotate-12 shadow-md text-center text-sm md:text-base">
          50% off
        </div>

        {/* Hero Image */}
        <img
          src={herobannerImage}
          alt="Stylish woman in a trench coat and hat"
          className="w-full h-[500px] max-w-sm md:max-w-xl mx-auto md:mx-0 object-cover"
        />

        {/* Half Blur Overlay */}
        <div className="absolute top-0 left-0 w-1/2 h-full bg-white/0 backdrop-blur-sm pointer-events-none"></div>
      </div>

      {/* Right Text Section */}
      <div className="flex-1 text-center md:text-left md:pl-20">
        <h2
          className="text-[50px] md:text-5xl font-sans text-black mb-6 relative"
          style={{ filter: "drop-shadow(5px 2px 4px rgba(0,0,0,0.4))" }}
        >
          Flesh Deals
          <span className="absolute left-1/2 md:left-0 theme-border-block w-[100px]"></span>
        </h2>

        <p className="text-[24px] md:text-lg text-[#989696] mb-4">
          Stylish Regular Fit Light Marun Denim For Women's & Girls
        </p>

        <p className="text-[18px] font-regular text-black mb-6 inline-block pb-1 border-b-2 border-black">
          Rs 1099.00
        </p>

        <div>
          <button className="bg-pink-500 text-white font-regular py-3 px-8 rounded-lg">
            Shop Now!
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
