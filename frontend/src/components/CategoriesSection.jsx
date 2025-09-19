import React, { useState, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Local image imports
import flowerImg from "../assets/flower.png";
import shoppingImg from "../assets/shopping.png";
import KurtiImg from "../assets/Kurti.png";
import CropTopsImg from "../assets/Crop Tops.png";
import JeansImg from "../assets/Jeans.png";
import NightwareImg from "../assets/Nightware.png";

const categories = [
  { name: "Saree", img: shoppingImg },
  { name: "Kurti", img: KurtiImg },
  { name: "Crop Tops", img: CropTopsImg },
  { name: "Jeans", img: JeansImg },
  { name: "Nightware", img: NightwareImg },
];

const CategoriesSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef(null);

  const settings = {
    dots: false, // we'll use custom dots
    infinite: true,
    speed: 500,
    slidesToShow: 4, // default for desktop
    slidesToScroll: 1,
    arrows: false,
    beforeChange: (_, next) => setCurrentSlide(next),
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 4 } },
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="w-full py-16 bg-white font-sans">
      <div className="flex flex-col items-center">
        {/* Title Section */}
        <div className="relative mb-8 flex justify-center w-full items-center">
          <div className="w-[50px] border-t border-black"></div>

          <h2 className="relative font-h2 text-2xl sm:text-3xl mx-4 z-10 whitespace-nowrap">
            Shop By Categories
            <img
              src={flowerImg}
              alt="Decorative flower"
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-100 pointer-events-none"
            />
          </h2>

          <div className="w-[50px] border-t border-black"></div>
        </div>

        {/* Slider */}
        <div className="max-w-[1440px] mx-auto w-full">
          <Slider ref={sliderRef} {...settings}>
            {categories.map((category, index) => (
              <div key={index} className="flex flex-col items-center group cursor-pointer p-2">
                <div className="relative w-[230px] h-[230px] rounded-full overflow-hidden border-4 circle-border transition-all duration-300 mx-auto">
                  <img
                    src={category.img}
                    alt={category.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="mt-4 text-gray-700 text-sm font-medium text-center">
                  {category.name}
                </p>
              </div>
            ))}
          </Slider>
        </div>

        {/* Custom Dots */}
        <div className="flex justify-center mt-6 space-x-2">
          {categories.map((_, i) => (
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
