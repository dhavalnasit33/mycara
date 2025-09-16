import React from "react";
import HeroImg from "../assets/hero.png";

const Hero = () => {
  return (
    <section className="relative w-full bg-[#f8e9e7] min-h-[716px] flex items-center justify-center rounded-lg overflow-hidden mx-auto ml-[30px] mt-[20px]">
      
      {/* Left Vertical Text */}
      <div className="absolute left-[30px] flex flex-col">
        <span className="rotate-[-90deg] text-gray-600 text-sm tracking-widest">
          women's Collection
        </span>
      </div>

      {/* Bottom Left Vertical Year */}
      <div className="absolute left-[30px] bottom-[20px] flex flex-col">
        <span className="rotate-[-90deg] text-gray-500 text-sm">2024</span>
      </div>

      {/* Content */}
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-6 md:px-12">
        
         {/* Left Text Section */}
        <div className="flex-1 text-center md:text-left space-y-6">
          <h1
            className="font-roboto italic font-semibold text-[80px] leading-[90px]"
            style={{
              color: "black", // H1 always black
              WebkitTextStroke: "1px white",
              WebkitTextFillColor: "black",
              MozTextStroke: "2px white",
              textShadow: "none",
            }}
          >
            Trandy Fashion <br /> Cloths
          </h1>

          <p className="text-blacktext-sm md:text-base relative">
            Get Up To 30% Off New Arrivals
            <span className="absolute left-0 bottom-0 w-[90px] h-[1px] bg-gray-800"></span>
          </p>

          {/* ✅ Shop Now Button */}
          <button
            className="px-6 py-3 text-white font-Regular rounded shadow-md transition"
            style={{ backgroundColor: "var(--theme-color)" }} // ✅ dynamic
          >
            Shop Now!
          </button>
        </div>

        {/* Right Image Section */}
        <div className="flex-1 relative mt-8 md:mt-0 flex justify-center">
          <img
            src={HeroImg}
            alt="Fashion"
            className="relative z-10 h-[400px] sm:h-[607px] object-contain"
          />
        </div>
      </div>

      {/* Slider Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        <span
          className="w-8 h-1 rounded-full"
          style={{ backgroundColor: "var(--theme-color)" }} // ✅ dynamic
        ></span>
        <span className="w-8 h-1 bg-white rounded-full"></span>
        <span className="w-8 h-1 bg-white rounded-full"></span>
      </div>
    </section>
  );
};

export default Hero;
