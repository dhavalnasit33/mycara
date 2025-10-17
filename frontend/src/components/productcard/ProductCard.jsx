import React, { useState } from "react";
import HeartIcon from "../icons/HeartIcon";
import ShoppingBagIcon from "../icons/ShoppingBagIcon";
import { getImageUrl } from "../utils/helper";
import { Link } from "react-router-dom";


export default function ProductCard({ product }) {
  const originalPrice = product.price; // e.g., 1000
let finalPrice = originalPrice;

if (product.discount_id) {
  if (product.discount_id.type === "percentage") {
    finalPrice = originalPrice - (originalPrice * product.discount_id.value) / 100;
  } else {
    finalPrice = originalPrice - product.discount_id.value;
  }
}
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = Array.isArray(product.images) && product.images.length
    ? product.images
    : product.imageUrl
      ? [product.imageUrl]
      : ["/placeholder.png"];

  const displayedImage = getImageUrl(images[currentImageIndex]);
  const hasMultipleImages = images.length > 1;
  
  return (
      <Link to={`/products/${product._id}`}>
    <div className="bg-white overflow-hidden transition-all group w-full h-[470px] sm:h-[520px] hover:p-[10px] hover:shadow-[0_0_4px_0_rgba(0,0,0,0.25)] cursor-pointer">
      {/* Product Image */}
      <div className="relative mb-[10px]">
        <div
          className="relative mb-[10px] w-full h-[300px] sm:h-[355px]"
          onMouseEnter={() => hasMultipleImages && setCurrentImageIndex(1)}
          onMouseLeave={() => hasMultipleImages && setCurrentImageIndex(0)}
        >
          <img
            src={displayedImage}
            alt={product.subtitle || product.name}
            className="w-full h-full transition duration-300"
          />
        </div>

        {/* Wishlist + Cart Icons */}
        <div className="absolute top-3 right-3 flex flex-col space-y-2">
          <div className="h-[26px] w-[26px] sm:h-[40px] sm:w-[40px] bg-white flex items-center justify-center rounded-full">
            <HeartIcon className="w-[16px] h-[16px] sm:w-[26px] sm:h-[24px]" />
          </div>
          <div className="h-[26px] w-[26px] sm:h-[40px] sm:w-[40px] bg-white flex items-center justify-center rounded-full">
            <ShoppingBagIcon className="w-[16px] h-[16px] sm:w-[26px] sm:h-[24px]" />
          </div>
        </div>

        {/* Small Dots for Multiple Images */}
        {hasMultipleImages && (
          <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-[5px] p-[4px] bg-[rgba(217,217,217,60%)] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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
      
      {/* Product Info */}
      <div>
        {product.express && (
          <p className="inline-flex px-[7px] py-[3px] bg-[rgba(244,50,151,9%)] text-theme text-[12px] md:text-[14px] rounded-[3px] mb-[10px]">
            Express Shipping
          </p>
        )}
        {product.isSale && (
          <div className="mb-2 inline-block text-theme theme-bg-light text-[12px] sm:text-[14px] font-regular font-sans px-2 py-0.5 rounded-sm">
            Sale
          </div>
        )}
        <h3 className="text-p"> {product.variants?.[0]?.brand?.[0]?.name || "No Brand"}</h3>
        <p className="sec-text-color text-14 mb-2 truncate">{product.name}</p>

        {/* Price Section */}
        <div className="flex items-center gap-[5px] text-p mb-[5px]">
            <p>₹{product.variants?.[0]?.price}</p>
            <p className="text-theme">
                {product.discount_id
                  ? product.discount_id.type === "percentage"
                    ? `${product.discount_id.value}% OFF`
                    : `₹${product.discount_id.value} OFF`
                  : null
                }
              </p>

          </div>


        {/* Color Options */}
        <div className="flex gap-[5px]">
            {product.variants?.[0]?.color?.map((colorItem, index) => (
            <div
              key={index}
              className="w-[10px] h-[10px] sm:w-[16px] sm:h-[16px] rounded-full cursor-pointer"
              style={{ backgroundColor: colorItem.code }}
            ></div>
          ))}
        </div>
      


        {/* Rating Stars */}
        {product.rating !== undefined && product.rating !== null && (
          <div className="flex gap-[6px] mt-1">
            {Array(5)
              .fill()
              .map((_, i) => (
                <span
                  key={i}
                  className={`text-sm ${
                    i < product.rating ? "text-theme" : "sec-text-color"
                  }`}
                >
                  ★
                </span>
              ))}
          </div>
        )}
      </div>
    </div>
    </Link>
  );
}









