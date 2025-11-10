import React from "react";
import Button from "../ui/Button";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function CartSummary() {
   const { items = [] } = useSelector((state) => state.cart);

  const subtotal = items.reduce((acc, item) => {
    const price = item?.variant_id?.price || 0;
    const quantity = item?.quantity || 1;
    return acc + price * quantity;
  }, 0);

  const tax = subtotal * 0.1; // 10% tax
  const shipping = 0;
  const total = subtotal + tax + shipping;

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
          <span>₹{subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between pb-[10px] border-b border-1 light-border">
          <span>Tax (10%):</span>
          <span>₹{tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between pb-[10px] border-b border-1 light-border">
          <span>Shipping:</span>
          <span>₹{shipping.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-bold ">
          <span>TOTAL:</span>
          <span>₹{total.toFixed(2)}</span>
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
