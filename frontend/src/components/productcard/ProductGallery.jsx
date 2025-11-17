import React, { useEffect, useMemo, useState } from "react";
import Slider from "react-slick";
import { getImageUrl } from "../utils/helper";

const colors = [
    "#BCBCBC", "#D2AF9F", "#F43297"
];

export default function ProductGallery({product, activeVariant }) {

   const [currentImage, setCurrentImage] = useState(null);
   const [selectedColor, setSelectedColor] = useState(null);

    const variants = product?.variants || [];

  // ⭐ Extract dynamic colors
  const colorOptions = useMemo(() => {
    const seen = new Map();
    variants.forEach((v) => {
      if (v.color_id?._id) {
        seen.set(v.color_id._id, {
          id: v.color_id._id,
          name: v.color_id.name,
          images: v.images || [],
        });
      }
    });
    return Array.from(seen.values());
  }, [variants]);

  // ⭐ Convert images to full image URLs based on selected activeVariant
  const fullImageUrls = useMemo(() => {
    if (!activeVariant) return [];
    return (activeVariant?.images || []).map((img) => getImageUrl(img));
  }, [activeVariant]);

  // ⭐ Set default image when variant changes
  useEffect(() => {
    if (fullImageUrls.length > 0) {
      setCurrentImage(fullImageUrls[0]);
    }
  }, [fullImageUrls]);


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
      {/* ✅ Thumbnail List */}
      <div
        className="hidden md:flex md:flex-col gap-[20px] h-[727px] overflow-y-auto hide-scrollbar p-1"
        style={{
          scrollBehavior: "smooth",
          msOverflowStyle: "none",
          scrollbarWidth: "none",
        }}
      >
        {fullImageUrls.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Thumbnail ${index}`}
            onClick={() => setCurrentImage(img)}
            className={`w-[160px] h-[208px] object-cover rounded-[3px] cursor-pointer transition-all duration-200 ${
              currentImage === img
                ? "ring-1 ring-[#F43297] scale-[1.02]"
                : "opacity-50 hover:opacity-100"
            }`}
          />
        ))}
      </div>

      {/* ✅ Main Image + Dynamic Colors */}
      <div className="hidden md:block flex-1">
        {currentImage && (
          <img
            key={currentImage}
            src={currentImage}
            alt="Main product"
            className="w-full h-[727px] rounded-[10px] object-cover transition-all duration-300 ease-in-out"
          />
        )}

        {/* ✅ Display All Product Colors */}
        <div className="flex gap-[8px] mt-[30px] justify-center">
          {colorOptions.map((color) => (
            <span
              key={color.id}
               onClick={() => setSelectedColor(color.id)}
              className={`w-[24px] h-[24px] rounded-full border 
                ${
                  selectedColor === color.id
                    ? "border-black scale-110"
                    : "border-gray-400"
                }
              `}
              style={{ backgroundColor: color.name.toLowerCase() }}
              title={color.name}
            ></span>
          ))}
        </div>
           
      </div>
    

      {/* ✅ Mobile Slider */}
      <div className="block md:hidden w-full rounded-[10px]">
        <Slider {...sliderSettings}>
          {fullImageUrls.map((img, index) => (
            <div key={index}>
              <img src={img} alt={`Slide ${index}`} className="w-full h-auto" />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}