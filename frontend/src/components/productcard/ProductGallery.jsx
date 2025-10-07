import React, { useState } from "react";
import Slider from "react-slick";

export default function ProductGallery({ images = [] }) {
      const [selectedImage, setSelectedImage] = useState(images[0] || "");
  const sliderSettings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="flex flex-col md:flex-row gap-[30px]">
      {/* Desktop Thumbnail Gallery */}
      <div className="hidden md:flex md:flex-col gap-[20px]">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Thumbnail ${index}`}
            // className="w-[160px] h-[208px] object-contain rounded-[3px] cursor-pointer border hover:border-pink-500 transition-all"
             className={`w-[160px] h-[208px] object-contain rounded-[3px] cursor-pointer border transition-all ${
              selectedImage === img ? "border-pink-500" : "border-gray-300"
            }`}
            onClick={() => setSelectedImage(img)}
          />
        ))}
      </div>

      {/* Desktop Main Image */}
      <div className="hidden md:block flex-1">
         <img
          src={images[0]}
          alt="Main product"
          className="w-full h-[727px] rounded-[10px]"
        />
      </div>

      {/* Mobile Slider */}
      <div className="block md:hidden w-full">
        <Slider {...sliderSettings}>
          {images.map((img, index) => (
            <div key={index}>
              <img
                src={img}
                alt={`Slide ${index}`}
                className="w-full h-auto object-contain rounded-[10px]"
              />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}
