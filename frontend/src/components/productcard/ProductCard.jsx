import React, { useState } from "react";
import HeartIcon from "../icons/HeartIcon";
import ShoppingBagIcon from "../icons/ShoppingBagIcon";
import { getImageUrl } from "../utils/helper";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAddToWishlist } from "../../hooks/handleAddTowishlist";


export default function ProductCard({ product }) {
const getDiscountedPrice = (product) => {
  const originalPrice = product?.variants?.[0]?.price || 0;
  const discount = product?.discount?.value || 0;
  const discountType = product?.discount?.type || "none";

  let discountedPrice = originalPrice;

  if (discountType === "percentage") {
    discountedPrice = originalPrice - (originalPrice * discount) / 100;
  } else if (discountType === "flat") {
    discountedPrice = originalPrice - discount;
  }

  return {  originalPrice, discountedPrice, discountValue: discount, discountType, };
};

//product hover slider
  const [currentIndex, setCurrentIndex] = useState(0);

  const firstVariantImages =
    Array.isArray(product?.variants?.[0]?.images)
      ? product.variants[0].images
      : [];
  const mainImages = Array.isArray(product?.images) ? product.images : [];
  const allImages = firstVariantImages.length > 0 ? firstVariantImages : mainImages;

  const displayedImage = getImageUrl(allImages[currentIndex]);
  const hasMultipleImages = allImages.length > 1;

//addto wishlist
  const { handleAddToWishlist } = useAddToWishlist();
  const wishlistProductIds = useSelector((state) => state.wishlist.productIds);
  const isWishlisted = wishlistProductIds.includes(product._id);


  return (
      <Link to={`/products/${product._id}`}>
    <div className="bg-white overflow-hidden transition-all group w-full h-[470px] sm:h-[520px] hover:p-[10px] hover:shadow-[0_0_4px_0_rgba(0,0,0,0.25)] cursor-pointer">
      {/* Product Image */}
      <div className="relative mb-[10px]">
        <div
          className="relative mb-[10px] w-full h-[300px] sm:h-[355px]"
          onMouseEnter={() => hasMultipleImages && setCurrentIndex(1)}
          onMouseLeave={() => hasMultipleImages && setCurrentIndex(0)}
        >
          <img
            src={displayedImage}
            alt={product.subtitle || product.name}
            className="w-full h-full transition duration-300"
          />
        </div>

        {/* Wishlist + Cart Icons */}
        <div className="absolute top-3 right-3 flex flex-col space-y-2">
          {/* <div className="h-[26px] w-[26px] sm:h-[40px] sm:w-[40px] bg-white flex items-center  justify-center rounded-full hover:bg-[#F43297]" onClick={() => handleAddToWishlist(product)}>
            <HeartIcon className="w-[16px] h-[16px] sm:w-[26px] sm:h-[24px] hover:invert over:brightness-0 hover:contrast-200" />
          </div> */}
           <div
              onClick={(e) => {
                e.preventDefault();
                handleAddToWishlist(product);
              }}
              className={`h-[26px] w-[26px] sm:h-[40px] sm:w-[40px] flex items-center justify-center rounded-full hover:bg-[#F43297]
                ${isWishlisted ? "bg-[#F43297]" : "bg-white"}`}  
             >
              <HeartIcon
                className={`w-[16px] h-[16px] sm:w-[26px] sm:h-[24px] transition hover:invert over:brightness-0 hover:contrast-200
                  ${isWishlisted ? "invert brightness-0 contrast-200" : ""}`}
              />
            </div>
              <div className="h-[26px] w-[26px] sm:h-[40px] sm:w-[40px] bg-white flex items-center justify-center rounded-full hover:bg-[#F43297]">
                <ShoppingBagIcon className="w-[16px] h-[16px] sm:w-[26px] sm:h-[24px] hover:invert over:brightness-0 hover:contrast-200" />
              </div>
        </div>

        {/* Small Dots for Multiple Images */}
        {hasMultipleImages && (
          <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-[5px] px-[10px] py-[4px] bg-[rgba(217,217,217,60%)] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {allImages.map((_, index) => (
              <div
                key={index}
                onMouseEnter={() => setCurrentIndex(index)} 
                className={`w-[6px] h-[6px] rounded-full cursor-pointer transition-colors duration-300 ${
                  currentIndex === index ? "bg-color" : "bg-white"
                }`}
              ></div>
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
        <div className="flex flex-wrap items-center gap-[5px] text-p mb-[5px]">
          <p className="text-p text-black">
            ₹ {getDiscountedPrice(product).discountedPrice.toLocaleString("en-IN", {
              maximumFractionDigits: 0,
            })}
          </p>
          {getDiscountedPrice(product).discountValue > 0 && (
            <p className="line-through text-[#BCBCBC]">
              ₹
              {getDiscountedPrice(product).originalPrice.toLocaleString("en-IN", {
                maximumFractionDigits: 0,
              })}
            </p>
          )}
          {getDiscountedPrice(product).discountValue > 0 && (
            <p className="text-theme text-p">
              {getDiscountedPrice(product).discountType === "percentage"
                ? `${getDiscountedPrice(product).discountValue}% Off`
                : `₹${getDiscountedPrice(product).discountValue} Off`}
            </p>
          )}
        </div>
        
        {/* Color Options */}
         <div className="flex gap-[5px]"> 
            {product.variants?.map((variant, vi) =>
              variant.color?.map((clr, ci) => (
                <span
                  key={`${vi}-${ci}`}
                  className="w-[10px] h-[10px] sm:w-[16px] sm:h-[16px] rounded-full "
                  title={clr.name}
                  style={{ backgroundColor: clr.code }}
                ></span>
              ))
            )}
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









