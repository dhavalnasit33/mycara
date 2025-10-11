import React from "react";
import Button from "../ui/Button";
import { Link } from "react-router-dom";

export default function CartSummary() {
  return (
    <div className="w-full  rounded-[3px] py-[45px] px-[22px] light-color ">
      <h2 className="text-[22px] text-black mb-[50px] text-center">
         Subtotal
        <div className=" flex justify-center">
            <span className="theme-border-block w-[34px] h-[2px] rounded-[10px] block"></span>
        </div>
      </h2>
      <div className="space-y-[25px] text-light text-p mb-[50px]">
        <div className="flex justify-between pb-[10px] border-b border-1 light-border ">
          <span>Sub-Total:</span>
          <span>₹4,830.00</span>
        </div>
        <div className="flex justify-between pb-[10px] border-b border-1 light-border">
          <span>Tax (10%):</span>
          <span>₹483.00</span>
        </div>
        <div className="flex justify-between pb-[10px] border-b border-1 light-border">
          <span>Shipping:</span>
          <span>₹0.00</span>
        </div>
        <div className="flex justify-between ">
          <span>TOTAL:</span>
          <span>₹5,213.00</span>
        </div>
      </div>

      <div className="text-center flex flex-col gap-[20px]" >
        <label className="font-18  text-black leading">Order Note:</label>
        <textarea
          rows={3}
          className="w-full h-[114px] box-shadow  p-2 text-sm focus:ring-1 focus:ring-pink-500"
        />
      </div>
        <div className="text-center">
      <Link to="/checkout">
        <Button variant="common"  className="min-w-auto sm:min-w-[211px] mt-[50px] uppercase">
          PROCEED CHECKOUT
        </Button>
      </Link>
    </div>
    </div>
  );
}
