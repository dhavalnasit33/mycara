// //D:\mycara\frontend\src\components\cart\CartSummary.jsx

import React from "react";
import Button from "../ui/Button";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function CartSummary({ appliedCoupon }) {
  const { items = []  } = useSelector((state) => state.cart);
  
  // discount
  const getDiscountedPrice = (item) => {
  const discount = item?.product_id?.discount_id?.value || 0;
  const originalPrice = item?.variant_id?.price || 0;
  const discountedPrice =
    discount > 0
      ? originalPrice - (originalPrice * discount) / 100
      : originalPrice;

    return { discount, originalPrice, discountedPrice };
  };

  //subtotal
  // const subtotal = items.reduce((sum, item) => {
  //   const { discountedPrice } = getDiscountedPrice(item);
  //   return sum + discountedPrice * (item.quantity || 1);
  // }, 0);

  // const taxes = Math.round(subtotal * 0.10);
  // const shipping = 0; // Free
  // const total = subtotal + taxes + shipping;

  // 🔹 Calculate subtotal
  const subtotal = items.reduce((sum, item) => {
    const { discountedPrice } = getDiscountedPrice(item);
    return sum + discountedPrice * (item.quantity || 1);
  }, 0);

  let discountAmount = 0;
  if (appliedCoupon) {
    discountAmount = appliedCoupon.discount_type === "fixed"
      ? appliedCoupon.discount_value
      : (subtotal * appliedCoupon.discount_value) / 100;

    // optional: enforce max_discount_amount
    if (appliedCoupon.max_discount_amount) {
      discountAmount = Math.min(discountAmount, appliedCoupon.max_discount_amount);
    }
  }

  const subtotalAfterDiscount = subtotal - discountAmount;
  const taxes = Math.round(subtotalAfterDiscount * 0.1); 
  const shipping = 0;
  const total = subtotalAfterDiscount + taxes + shipping;

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
          <span>₹{Math.round(subtotal).toLocaleString("en-IN")}</span>
        </div>
        <div className="flex justify-between pb-[10px] border-b border-1 light-border">
          <span>Tax (10%):</span>
          <span>₹ {Math.round(taxes).toLocaleString("en-IN")}</span>
        </div>
        <div className="flex justify-between pb-[10px] border-b border-1 light-border">
          <span>Shipping-Cost:</span>
          <span>free</span>
        </div>
        {appliedCoupon && (
          <div className="flex justify-between text-green-600">
            <span>Coupon ({appliedCoupon.code}):</span>
            <span>- ₹{Math.round(discountAmount).toLocaleString("en-IN")}</span>
          </div>
        )}
        <div className="flex justify-between font-bold ">
          <span>TOTAL:</span>
          <span>₹{Math.round(total).toLocaleString("en-IN")}</span>
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
