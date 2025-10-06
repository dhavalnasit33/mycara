import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { FaTwitter } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";

// Import your hero images here
import heroImg1 from "../assets/hero.png";
import heroImg2 from "../assets/hero2.png"; 
import heroImg3 from "../assets/hero3.png"; 


const Hero = () => {
    // Array to hold the data for each slider item
    const heroSlides = [
        {
            image: heroImg1,
            title: "Trandy Fashion <br /> Cloths",
            subtitle: "Get Up To 30% Off New Arrivals"
        },
        {
            image: heroImg2,
            title: "Summer Collection <br /> 2024",
            subtitle: "Discover Your New Style"
        },
        {
            image: heroImg3,
            title: "Elegant & Casual <br /> Wear",
            subtitle: "Shop the Latest Trends"
        }
    ];

const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 3000,
    arrows: false,
    appendDots: dots => (
        <div className="  w-full">
            <ul className="flex justify-center gap-5">{dots}</ul>
        </div>
    ),
    customPaging: i => (
        <div className="w-10 h-[4px] bg-white transition-colors duration-300 rounded-full"></div>
    )
};

    return (
        <div className="relative  w-[90%] md:w-[90%] container-1440">
            {/* Left Vertical Strip */}
           {/* Left Vertical Strip - Hidden on mobile/tablet, shown from 'lg' (desktop) breakpoint */}
            <div className="hidden lg:flex absolute items-center left-[-50px] top-0 bottom-0 flex-col justify-between z-20">
                
                {/* Rotated Text and Line Group */}
                <div className="flex flex-col items-center gap-2">
                    {/* The vertical line goes first */}
                    <div className="w-[1px] h-[50px] bg-[#D2AF9F]"></div>
                    {/* Text: Winter Collection */}
                    <span className="rotate-[-90deg] text-[#D2AF9F] text-xs sm:text-sm tracking-widest mt-[60px]">
                        Winter Collection
                    </span>
                </div>
                
                {/* Year Text */}
                <span className="rotate-[-90deg] text-[#D2AF9F] text-xs sm:text-sm mb-[30px]">
                    2024
                </span>
                
                {/* Social Icons */}
                <div className="flex flex-col items-center space-y-4">
                    {/* Twitter Icon */}
                    <a href="#" aria-label="Twitter">
                           <FaTwitter size={20} className="text-black-600 hover:text-gray-500 transition-colors duration-300" />
                    </a>
                    {/* Heart Icon */}
                    <a href="#" aria-label="Heart">
                        <FaRegHeart size={20} className="text-black hover:text-gray-500" />
                    </a>
                </div>
            </div>

            {/*  Hero Section */}
          <section
  className="relative min-h-[210px] sm:min-h-[210px] md:min-h-[210px] lg:min-h-[716px] bg-[#f8e9e7] rounded-none sm:rounded-l-lg overflow-hidden flex items-center mx-2 mr-0 sm:ml-0 lg:ml-[50px] mt-4"
>
                <Slider {...settings} className="w-full container-1440 h-full">
                    {heroSlides.map((slide, index) => (
                        <div key={index}>
                            {/* This is the Flexbox container for a single slide */}
                            <div className="w-full flex  flex-row md:flex-row items-center justify-between px-10 sm:px-10">
                                {/* Left Text: This item will take up space in the flex row */}
                                <div className="flex-1 text-left gap-[30px] ">
                    <h1 className=" text-stroke text-shadow-custom py-5">
                    <span
                        className="font-sans italic font-bold  text-[26px] lg:text-[80px] text-black "
                        dangerouslySetInnerHTML={{ __html: slide.title }}
                    />
                    </h1>


 <div className="flex flex-col gap-[40px]">

  <span className="text-black text-[8px] md:text-[8px] lg:text-[24px] leading-[19px] relative">
    {slide.subtitle}
    <span className="absolute left-0 bottom-0 sm:translate-y-[0px] md:translate-y-[0px] lg:translate-y-[10px]  w-[56px] sm:w-[56px] md:w-[90px] lg:w-[225px] h-[0.5px] bg-black"></span>
  </span>

  <button
    className="lg:w-[160px] sm:w-[72px] lg:h-[54px] sm:h-[26px]  sm:text-[12px] lg:text-[22px] text-white font-regular rounded shadow-md duration-300 bg-color "
 
  >
    Shop Now!
  </button>
</div>


                                </div>

                                {/* Right Image: This item will also take up space in the flex row */}
                               <div className="flex-1 flex justify-center mt-0">
  <img
    src={slide.image}
    alt="Fashion"
    className="w-[132.02px] h-[170.18px] sm:w-[132.02px] sm:h-[170.18px] md:w-[132.02px] md:h-[170.18px] lg:w-[487.38px] lg:h-[607px] object-contain"
  />
</div>

                            </div>
                        </div>
                    ))}
                </Slider>
            </section>
        </div>
    );
};

export default Hero;