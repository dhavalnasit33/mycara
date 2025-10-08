import React from "react";
import { Truck, RefreshCcw, Package } from "lucide-react";

export default function DeliveryInfo() {
  return (
    <div className="">
    <h4 className="text-[24px] pb-[20px] leading">Select Delivery Location</h4>
      <p className="text-14 text-light pb-[10px]">
        Enter your pincode to check product availability and delivery options.
      </p>
      <div className="flex input-common justify-between bg-[rgba(152,152,150,0.1)] !rounded-none">
        <input
          type="text"
          placeholder="Enter Pincode"
          className="w-full focus:outline-none bg-transparent"
        />
        <button className="text-[#BCBCBC] text-14">Apply</button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
        <div className="flex flex-col items-center text-center">
          <Package size={24} className="text-pink-500 mb-2" />
          <p className="font-medium">COD available</p>
          <p className="text-sm text-gray-500">Know More</p>
        </div>
        <div className="flex flex-col items-center text-center">
          <RefreshCcw size={24} className="text-pink-500 mb-2" />
          <p className="font-medium">7-day return & size exchange</p>
          <p className="text-sm text-gray-500">Know More</p>
        </div>
        <div className="flex flex-col items-center text-center">
          <Truck size={24} className="text-pink-500 mb-2" />
          <p className="font-medium">Usually ships in 1 day</p>
          <p className="text-sm text-gray-500">Know More</p>
        </div>
      </div>
    </div>
  );
}
