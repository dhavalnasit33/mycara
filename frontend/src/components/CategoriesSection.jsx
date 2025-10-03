import React, { useState, useRef, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Local images
import FlowerIcon from "../components/icons/FlowerIcon";

import shoppingImg from "../assets/shopping.png";
import KurtiImg from "../assets/Kurti.png";
import CropTopsImg from "../assets/Crop Tops.png";
import JeansImg from "../assets/Jeans.png";
import NightwareImg from "../assets/Nightware.png";
import jewelleryimg from "../assets/jewellery.png";


const categories = [
  { name: "Saree", img: shoppingImg },
  { name: "Kurti", img: KurtiImg },
  { name: "Crop Tops", img: CropTopsImg },
  { name: "Jeans", img: JeansImg },
  { name: "Nightware", img: NightwareImg },
  { name: "Jewellery", img: jewelleryimg },
];

const CategoriesSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(4); // default desktop
  const sliderRef = useRef(null);

  // Handle window resize
  // const handleResize = () => {
  //   if (window.innerWidth >= 1024) setSlidesToShow(5); // desktop
  //   else if (window.innerWidth >= 768) setSlidesToShow(3); // tablet
  //   else setSlidesToShow(2); // mobile
  // };

  // useEffect(() => {
  //   handleResize(); // initial check
  //   window.addEventListener("resize", handleResize);
  //   return () => window.removeEventListener("resize", handleResize);
  // }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow:5,
    slidesToScroll: 1,
    arrows: false,
    beforeChange: (_, next) => setCurrentSlide(next),
     responsive: [
      {
        breakpoint: 1280, 
        settings: { slidesToShow: 4, slidesToScroll: 1 },
      },
      {
        breakpoint: 980, 
        settings: { slidesToShow: 3, slidesToScroll: 1 },
      },
      {
        breakpoint: 767, 
        settings: { slidesToShow: 2, slidesToScroll: 1 },
      },
    ],
  };

  return (
    <div className="w-full py-16 bg-white font-sans">
      <div className="flex flex-col items-center">
        {/* Title Section */}
        <div className="relative  flex justify-center items-center w-full">
          {/* Left line */}
          <div className="w-[50px] border-t border-black"></div>

          {/* Center container for title + icon */}
          <div className="relative mx-4 flex flex-col items-center justify-center h-48">
            {/* Title */}
            <h2 className="font-h2 text-2xl sm:text-3xl text-black whitespace-nowrap relative z-10">
              Shop By Categories
            </h2>

            {/* Decorative SVG icon fully visible, centered */}
            <FlowerIcon className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[110px] h-[80px]  pointer-events-none z-0" />
          </div>

          {/* Right line */}
          <div className="w-[50px] border-t border-black"></div>
        </div>

 

        {/* Slider */}
        <div className="max-w-[1440px] mx-auto w-full">
          <Slider ref={sliderRef} {...settings}>
            {categories.map((category, index) => (
              <div
                key={index}
                className="flex flex-col items-center group cursor-pointer p-2"
              >
              <div className="relative sm:w-[165px] sm:h-[165px] md:w-[200px] md:h-[200px] lg:w-[230px] lg:h-[230px] rounded-full overflow-hidden border-4 circle-border transition-all duration-300 mx-auto">
                <img
                  src={category.img}
                  alt={category.name}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
                <p className="mt-4 text-dark text-[20px]  text-center">
                  {category.name}
                  <span className="theme-border-block w-[20px] mx-auto"></span>
                </p>
              </div>
            ))}
          </Slider>
        </div>

        {/* Custom Dots */}
        <div className="flex justify-center mt-[35px] sm:mt-[65px] space-x-2">
          {categories.slice(0, 4).map((_, i) => (
            <button
              key={i}
              onClick={() => sliderRef.current.slickGoTo(i)}
              className={`transition-all duration-300 ${
                currentSlide === i
                  ? "w-6 h-2 rounded-[3px] bg-color"
                  : "w-2 h-2 rounded-full bg-[#D2AF9F]"
              }`}
            ></button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoriesSection;
