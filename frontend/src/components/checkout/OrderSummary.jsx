// D:\mycara\frontend\src\components\checkout\OrderSummary.jsx

import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import cartitem from "../../assets/Girls full sleave fancy t shirt.png";
import Button from "../ui/Button";

export default function OrderSummary() {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);
  const [billingAddress, setBillingAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [isPlacing, setIsPlacing] = useState(false);

  // 🔥 Load REAL cart data from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("cartItems");
    if (saved) {
      setCartItems(JSON.parse(saved));
    }
  }, []);

  // 💰 auto-calculation
  const subtotal = cartItems.reduce(
    (sum, it) => sum + it.price * it.qty,
    0
  );

  const taxes = Math.round(subtotal * 0.1);
  const shipping = 0;
  const total = subtotal + taxes + shipping;

  const PLACE_ORDER_API = "http://localhost:5000/api/orders";

  // 🔥 place order
  const placeOrderOnBackend = async (orderData) => {
    const res = await fetch(PLACE_ORDER_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderData),
    });

    if (!res.ok) {
      throw new Error("Order failed");
    }

    return await res.json();
  };

  const handlePlaceOrder = async () => {
    if (isPlacing) return;
    setIsPlacing(true);

    const orderPayload = {
      orderId: `ORD-${Date.now()}`,
      items: cartItems,              // 👉 REAL FORM DATA (not hard-coded)
      billingAddress,
      paymentMethod,
      subtotal,
      taxes,
      shipping,
      total,
      paid: paymentMethod !== "cod",
      status: "Pending",
      createdAt: new Date().toISOString(),
    };

    try {
      const result = await placeOrderOnBackend(orderPayload);

      // Save last order locally
      localStorage.setItem("lastOrder", JSON.stringify(result));

      // redirect
      navigate("/my-account/orders");

    } catch (err) {
      alert("Order failed!");
    } finally {
      setIsPlacing(false);
    }
  };

  return (
    <div className="w-full rounded-[3px] py-[45px] px-[22px] light-color ">
      <h2 className="text-[22px] text-black mb-[50px] text-center">
        Order Summary
        <div className=" flex justify-center">
          <span className="theme-border-block w-[34px] h-[2px] rounded-[10px] block"></span>
        </div>
      </h2>

        <div className="pb-[10px] text-p">1 item</div>
        <div className="flex border-b border-[#BCBCBC] pb-[10px] mb-[30px]">
            <div className="relative w-[80px] md:w-[105px] h-auto flex-shrink-0">
                <img src={cartitem} alt="Product" className="w-full h-[122px] md:h-[150px] object-contain rounded-md" />
                <span className="absolute top-[-6px] right-[-6px] w-[22px] h-[22px] bg-white text-black text-p rounded-full flex items-center justify-center">
                    1
                </span>
            </div>

            <div className="flex justify-between gap-[10px] flex-1 ml-4">
                <p className="text-14 text-gray-700">
                Women latest Florals pink printed Pair Kurti with cotton pant and chunri
                </p>
                <p className="text-p text-right ">₹1,430.00</p>
            </div>
        </div>


      <div className="border-t pb-[30px] space-y-[14px] text-p text-light">
        <div className="flex justify-between text-black">
           <span>Subtotal</span>
          <span>₹{subtotal}</span>
        </div>
        <div className="flex justify-between">
          <span>Shipping</span>
          <span>Free</span>
        </div>
        <div className="flex justify-between">
          <span>Taxes</span>
           <span>₹{taxes}</span>
        </div>
        <div className="text-theme text-[12px] border-b border-[#BCBCBC] pb-[30px]">Promo Gift Certificate</div>
        <div className="flex justify-between text-p text-black ">
          <span>Total(₹)</span>
          <span className="text-20px font-medium ">₹{total}</span>
        </div>
      </div>

      {/* Payment Options */}

        <div className=" text-light text-14">
            <label className="flex items-center pb-[10px] gap-2 cursor-pointer" >
                <input type="radio" name="payment" className="hidden peer" />
                <span className="w-[16px] h-[16px] border-2 border-[#F43297] rounded-full flex items-center justify-center transition">
                    <span className="w-[16px] h-[16px] bg-white rounded-full peer-checked:block hidden"></span>
                </span>
                <span>Credit Card</span>
            </label>
            <p className="text-[12px] pb-[15px]">Pay with your creadit cart via authorize net.</p>
            <div className="space-y-[19px] pb-[30px]">
                <input type="text" placeholder="Card No." className="input-common" />
                <div className="grid grid-cols-2 gap-[13px]">
                <input type="text" placeholder="Expiry (mm/yy)" className="input-common" />
                <input type="text" placeholder="Card code" className="input-common" />
            </div>
            </div>
        </div>
        <div className="text-p text-light ">
            <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="payment" className="hidden peer" />
                <span className="w-[16px] h-[16px] border border-[#000] rounded-full flex items-center justify-center transition">
                    <span className="w-[16px] h-[16px] bg-white rounded-full peer-checked:block hidden"></span>
                </span>
                <span>Check Payments</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="payment" className="hidden peer" />
                <span className="w-[16px] h-[16px] border border-[#000] rounded-full flex items-center justify-center transition">
                    <span className="w-[16px] h-[16px] bg-white rounded-full peer-checked:block hidden"></span>
                </span>
                <span>Cash on Delivery</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="payment" className="hidden peer" />
                <span className="w-[16px] h-[16px] border border-[#000] rounded-full flex items-center justify-center transition">
                    <span className="w-[16px] h-[16px] bg-white rounded-full peer-checked:block hidden"></span>
                </span>
                <span>PayPal</span>
            </label>
            </div>

        <div className="text-center mt-[50px]">
   <Button
          variant="common"
          className="min-w-auto sm:min-w-[300px] uppercase"
          onClick={handlePlaceOrder}
          disabled={isPlacing}
        >
          {isPlacing ? "PLACING ORDER..." : "PLACE ORDER"}
        </Button>
        </div>
    </div>
  );
}