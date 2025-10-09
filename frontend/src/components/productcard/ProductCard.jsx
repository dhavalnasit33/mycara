import React from "react";
import HeartIcon from "../icons/HeartIcon"

export default function ProductCard({ product }) {
  return (
    <div className="bg-white  overflow-hidden  transition-all duration-300 mx-[15px]">
      <div className="relative mb-[10px]">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-[355px] object-cover"
        />
        <button className="absolute top-3 right-3 h-[40px] w-[40px] bg-white flex items-center justify-center rounded-full ">
          <HeartIcon className="w-[26px] h-[24px]"/>
        </button>
      </div>

      <div >
         {product.express && (
          <p className="inline-flex px-[7px] py-[3px] bg-[rgba(244,50,151,9%)] text-theme text-14 rounded-[3px] mb-[10px]">
            Express Shipping
          </p>
        )}
        <h3 className=" text-p">{product.title}</h3>
        <p className="sec-text-color text-14 mb-2">{product.subtitle}</p>

        <div className="flex items-center gap-[5px] text-p">
          <p className="">₹{product.price}</p>
          {product.oldPrice && (
            <p className="line-through text-[#BCBCBC] text-14">₹{product.oldPrice}</p>
          )}
          {product.discount && (
            <p className="text-theme ">{product.discount}</p>
          )}
        </div>

        <div className="flex gap-[6px]">
          {Array(5)
            .fill()
            .map((_, i) => (
              <span
                key={i}
                className={`text-sm ${
                  i < product.rating ? "text-theme" : "text-gray-300"
                }`}
              >
                ★
              </span>
            ))}
        </div>
      </div>
    </div>
  );
}