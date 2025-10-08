import React, { useState } from "react";
import Slider from "react-slick";
import img1 from "../../assets/gallary1.png";
import img2 from "../../assets/gallary2.png";
import img3 from "../../assets/gallary3.png";

export default function ProductGallery() {
  // ✅ Define images only once (don’t override props)
  const images = [img1, img2, img3];

  // ✅ Set first image as default selected
  const [selectedImage, setSelectedImage] = useState(images[0]);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    appendDots: (dots) => (
      <div className="w-full relative">
        <ul className="absolute left-1/2 transform -translate-x-1/2 flex justify-center rounded-full">
          {dots}
        </ul>
      </div>
    ),
    customPaging: () => (
      <div className="w-[10px] h-[10px] rounded-full border border-[#D2AF9F] transition-all duration-300"></div>
    ),
  };

  return (
    <div className="flex flex-col md:flex-row gap-[30px]">
      {/* Desktop Thumbnail Gallery */}
      <div className="hidden md:flex md:flex-col gap-[20px]">
        {images.map((img, index) => (
          <img
            key={index}
            src={img} // ✅ fixed
            alt={`Thumbnail ${index}`}
            onClick={() => setSelectedImage(img)} 
            className={`w-[160px] h-[208px] object-cover rounded-[3px] cursor-pointer border transition-all ${
              selectedImage === img ? "border-pink-500" : "border-gray-300"
            }`}
          />
        ))}
      </div>

      {/* Desktop Main Image */}
      <div className="hidden md:block flex-1">
        <img
          src={selectedImage} 
          alt="Main product"
          className="w-full h-[727px]  rounded-[10px]"
        />
      </div>

      {/* Mobile Slider */}
      <div className="block md:hidden w-full rounded-[10px]">
        <Slider {...sliderSettings}>
          {images.map((img, index) => (
            <div key={index}>
              <img
                src={img}
                alt={`Slide ${index}`}
                className="w-full h-auto "
              />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}
