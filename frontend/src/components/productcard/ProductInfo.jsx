import React from "react";
import { Handbag, HeartPlus } from "lucide-react";
import Button from "../ui/Button";
import { Link } from "react-router-dom";

export default function ProductInfo() {
  const sizes = [
  { name: "S", stock: 5 },
  { name: "M", stock: 0 },
  { name: "L", stock: 2 },
  { name: "XL", stock: 0 },
  { name: "2XL", stock: 3 },
];

  return (
    <>
      <p className="text-theme text-p pb-[25px] pt-[20px] md:pt-0">Leatest Style <span className="text-[#BCBCBC]"> | </span> Express Shipping</p>
      <h1 className="text-[24px] uppercase">ORANGE scissor</h1>
      <p className="text-p text-light pb-[12px]">Floral plain Ethnic Anarkali Gown</p>

      {/* Rating */}
      <div className="flex items-center gap-[15px] text-14 sec-text-color mb-[25px]">
        <span className="border border-[#CECDCD] text-black px-2 py-[3px] rounded-[2px] font-18 font-medium">4.2 ★</span>
        <span >Based on 30 Ratings</span>
      </div>

      {/* Price */}
      <div className="pb-[33px] border-dashed border-b border-[#BCBCBC]">
        <div className="flex items-center ">
            <p className="text-[26px] text-black">₹1,430</p>
            <p className="text-theme font-18 ml-[7px]">35% Off</p>
        </div>
        <p className="sec-text-color">MRP <span className="line-through">₹2,199</span> Inclusive of all taxes</p>
      </div>

      {/* Sizes */}
      <div className="pt-[34px] space-y-[28px]">
        <div className="flex items-center justify-between">
            <span className="text-[24px]">Select Size </span>
            <span className="text-theme font-medium font-18">Size Guide</span>
        </div>
        <div className="flex flex-wrap gap-[13px]">
            {sizes.map((size) => (
                <div key={size.name} className="relative">
                <button
                    disabled={size.stock === 0} 
                    className={`border border-[#BCBCBC] w-[50px] md:w-[71px]  md:px-4 py-[3px] rounded-[20px] text-[14px] md:text-[18px] font-light hover:border-pink-500  ${
                    size.stock === 0 ? " cursor-not-allowed" : ""
                    }`}
                >
                    {size.name}
                </button>
                {size.stock === 0 && (
                    <span className="absolute -bottom-5 left-2 text-[10px] md:text-[12px] sec-text-color ">
                    Sold Out
                    </span>
                )}
                </div>
            ))}
        </div>

        <div className="flex flex-col  sm:flex-row  gap-[17px] pt-[10px] ">
            <Button variant="outline" className="flex items-center gap-[10px] !text-[22px] !py-[10px] ">
                <HeartPlus size={22} />Wishlist
            </Button>
            <Button variant="common" className="w-full !text-[22px] flex items-center gap-[10px] !py-[10px]">
                <Link to='/cart' className="flex items-center gap-[10px]">
                    <Handbag size={22} />Add To Bag
                </Link>
            </Button>
        </div>
      </div>

      {/* Wishlist + Add to Bag */}
     
    </>
  );
}
