import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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

    // Slider settings
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
            <div style={{ }}>
                <ul className="flex justify-center gap-5 rounded-[20%]">{dots}</ul>
            </div>
        ),
        customPaging: i => (
            <div className="w-10 h-[4px]  bg-white transition-colors duration-300" />
        )
    };

    return (
        <div className="relative w-full">
            {/* Left Vertical Strip */}
            <div className="hidden sm:flex absolute -left-16 top-0 bottom-0 flex-col justify-between items-center gap-4 z-20">
                <span className="rotate-[-90deg] text-[#D2AF9F] text-xs sm:text-sm tracking-widest mt-[30px]">
                    Women's Collection
                </span>
                <span className="rotate-[-90deg] text-[#D2AF9F] text-xs sm:text-sm mb-[30px]">
                    2024
                </span>
                <div className="flex flex-col items-center space-y-4">
                    {/* Twitter Icon */}
                    <a href="#" aria-label="Twitter">
                        <svg className="w-5 h-5 text-gray-500 hover:text-gray-800 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.795-1.574 2.163-2.72-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.579 0-6.478 2.9-6.478 6.477 0 .506.056 1.002.164 1.479-5.385-.271-10.155-2.846-13.351-6.75-1.584 2.748-2.49 5.945-.274 8.793-1.02-.294-1.98-.604-2.828-1.238v.079c0 3.126 2.22 5.733 5.166 6.326-.54.148-1.107.227-1.685.227-.411 0-.814-.038-1.205-.114.823 2.553 3.2 4.416 6.012 4.464-2.41 1.89-5.448 3.023-8.77 3.023-.57 0-1.13-.034-1.68-.098 3.128 1.999 6.837 3.167 10.749 3.167 12.96 0 20.01-10.756 20.01-20.01 0-.304-.006-.607-.018-.908.828-.598 1.547-1.282 2.118-2.072z" />
                        </svg>
                    </a>
                    {/* Heart Icon */}
                    <a href="#" aria-label="Heart">
                        <svg className="w-5 h-5 text-gray-500 hover:text-gray-800 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                        </svg>
                    </a>
                </div>
            </div>

            {/* ✅ Hero Section */}
            <section
                className="relative min-h-[500px] sm:min-h-[716px] bg-[#f8e9e7] rounded-l-lg overflow-hidden flex items-center mx-2 mr-0 sm:ml-[50px] mt-4"
                style={{ maxWidth: "1855px" }}
            >
                <Slider {...settings} className="w-full h-full">
                    {heroSlides.map((slide, index) => (
                        <div key={index}>
                            {/* This is the Flexbox container for a single slide */}
                            <div className="w-full flex flex-row md:flex-row items-center justify-between px-4 sm:px-10">
                                {/* Left Text: This item will take up space in the flex row */}
                                <div className="flex-1 text-left space-y-4 sm:space-y-6 p-[80px]">
                                    <h1
                                        className="font-main font-bold text-[26px] sm:text-5xl lg:text-[80px] leading-[28px] sm:leading-snug lg:leading-[90px] italic text-stroke-white text-shadow"
                                        dangerouslySetInnerHTML={{ __html: slide.title }}
                                    />
                                    <p className="text-black text-sm sm:text-base relative ">
                                        {slide.subtitle}
                                        <span className="absolute left-0 -bottom-1 w-[60px] sm:w-[90px] h-[1px] bg-gray-800"></span>
                                    </p>
                                    <button
                                        className="px-6 py-3 text-white font-medium rounded shadow-md duration-300 hover:opacity-90"
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