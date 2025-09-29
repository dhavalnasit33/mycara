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
    autoplay: true,
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
        <div className="relative  w-full">
            {/* Left Vertical Strip */}
            <div className="hidden sm:flex absolute items-center left-[-50px] top-0 bottom-0 flex-col justify-between    z-20">
                    
                    {/* A new div to group the rotated text and the line */}
                    <div className="flex flex-col items-center gap-2">
                        {/* The vertical line goes first */}
                        <div className="w-[1px] h-[50px] bg-[#D2AF9F]"></div>
                        {/* Text: Women's Collection */}
                        <span className="rotate-[-90deg] text-[#D2AF9F] text-xs sm:text-sm tracking-widest mt-[60px]">
                            Winter Collection
                        </span>
                    </div>
                    
                    <span className="rotate-[-90deg] text-[#D2AF9F] text-xs sm:text-sm mb-[30px]">
                        2024
                    </span>
                    
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
                className="relative min-h-[360px] sm:min-h-[716px] bg-[#f8e9e7] rounded-none sm:rounded-l-lg overflow-hidden flex items-center mx-2 mr-0 ml-[0px] sm:ml-[50px] mt-4"
                style={{ maxWidth: "1855px" }}
            >
                <Slider {...settings} className="w-full h-full">
                    {heroSlides.map((slide, index) => (
                        <div key={index}>
                            {/* This is the Flexbox container for a single slide */}
                            <div className="w-full flex flex-row md:flex-row items-center justify-between px-1 sm:px-10">
                                {/* Left Text: This item will take up space in the flex row */}
                                <div className="flex-1 text-left space-y-4 sm:space-y-6 p-[10px] sm:p-[80px]">
                    <h1 className=" text-stroke text-shadow-custom">
                    <span
                        className="font-sans italic font-bold text-[26px] sm:text-[80px] text-black "
                        dangerouslySetInnerHTML={{ __html: slide.title }}
                    />
                    </h1>


                                  <p className="text-black relative text-[8px] sm:text-[24px]">
                                    {slide.subtitle}
                                    <span className="absolute left-0 -bottom-1 w-[60px] sm:w-[90px] h-[1px] bg-gray-800"></span>
                                    </p>

                                    <button
                                        className="px-[10px] py-[5px] sm:px-[20px] sm:py-[10px]  text-white font-medium rounded shadow-md duration-300 hover:opacity-90"
                                        style={{ backgroundColor: "var(--theme-color)" }}
                                    >
                                        Shop Now!
                                    </button>
                                </div>

                                {/* Right Image: This item will also take up space in the flex row */}
                                <div className="flex-1 flex justify-center mt-0">
                                    <img
                                        src={slide.image}
                                        alt="Fashion"
                                        className="h-[220px] sm:h-[400px] lg:h-[600px] object-contain"
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