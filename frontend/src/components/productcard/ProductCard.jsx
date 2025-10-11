import React, { useState } from "react";
import HeartIcon from "../icons/HeartIcon";
import ShoppingBagIcon from "../icons/ShoppingBagIcon";
export default function ProductCard({ product }) {
 const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const hasMultipleImages = product.allImages && product.allImages.length > 1;
  const displayedImage = hasMultipleImages
    ? product.allImages[currentImageIndex]
    : product.image;
  return (
    <div className="bg-white overflow-hidden transition-all  group w-full hover:p-[10px] hover:shadow-[0_0_4px_0_rgba(0,0,0,0.25)] cursor-pointer overflow-hidden">
      <div className="relative mb-[10px]">
        <img
          src={displayedImage}
          alt={product.subtitle}
          className="w-full h-[300px] sm:h-[355px] object-cover transition duration-300"
        />
        <div className="absolute top-3 right-3 flex flex-col space-y-2">
          <div className="h-[40px] w-[40px] bg-white flex items-center justify-center rounded-full">
              <HeartIcon className="w-[26px] h-[24px]" />
          </div>
          <div className="h-[40px] w-[40px] bg-white flex items-center justify-center rounded-full">
              <ShoppingBagIcon width={26} height={24} />
          </div>
      </div>
       {hasMultipleImages && (
          <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-[5px] p-[4px] bg-[rgba(217,217,217,60%)] rounded-full">
            {product.allImages.map((_, index) => (
              <div
                key={index}
                className={`w-[6px] h-[6px] rounded-full cursor-pointer transition-colors duration-300 ${
                  index === currentImageIndex ? "bg-color" : "bg-white"
                }`}
                onMouseEnter={() => setCurrentImageIndex(index)}
              />
            ))}
          </div>
        )}
      </div>
      <div >
         {product.express && (
          <p className="inline-flex px-[7px] py-[3px] bg-[rgba(244,50,151,9%)] text-theme text-14 rounded-[3px] mb-[10px]">
            Express Shipping
          </p>
        )}
         {product.isSale && (
              <div className="mb-2 inline-block text-theme theme-bg-light text-[12px] sm:text-[14px] font-regular font-sans px-2 py-0.5 rounded-sm">
                  Sale
              </div>
          )}
        <h3 className=" text-p">{product.brand}</h3>
        <p className="sec-text-color text-14 mb-2">{product.subtitle}</p>
        <div className="flex items-center gap-[5px] text-p mb-[5px]">
          <p className="">₹{product.price}</p>
          {product.oldPrice && (
            <p className="line-through text-[#BCBCBC] text-14">₹{product.oldPrice}</p>
          )}
          {product.discount && (
            <p className="text-theme ">{product.discount}</p>
          )}
        </div>
        <div className="flex gap-[5px] ">
            {product.colorOptions?.map((colorClass, index) => (
              <div
                key={index}
                className={`w-[10px] h-[10px] sm:w-[16px] sm:h-[16px] ${colorClass} rounded-full cursor-pointer`}
              ></div>
            ))}
        </div>
        {product.rating !== undefined && product.rating !== null && (
          <div className="flex gap-[6px] ">
            {Array(5)
              .fill()
              .map((_, i) => (
                <span
                  key={i}
                  className={`text-sm ${
                    i < product.rating ? "text-theme" : "text-gray-300"
                  }`}
                >★
                </span>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}









