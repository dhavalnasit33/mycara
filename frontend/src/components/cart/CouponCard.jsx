import React from "react";
import Button from "../ui/Button";
import logo from "../../assets/logo.png"

export default function CouponCard() {
  return (
    <div className="flex flex-col md:flex-row  gap-[10px] shadow-md rounded-[3px] overflow-hidden w-full  md:max-w-lg mt-[30px] md:mt-[40px] ">
      <div className="bg-color text-white flex items-center justify-center px-4 py-6 md:py-0 md:w-[80px]">
        <span className="text-20px font-bold tracking-wider md:-rotate-90">
          DISCOUNT
        </span>
      </div>

      <div className="flex-1 p-5 md:p-6 flex flex-col justify-between bg-white">
            <div className="flex gap-[10px] justify-between items-center"> 
                <div>
                    <p className="sec-text-color text-[14px] md:text-base font-medium">
                        Flat $25 off*
                    </p>
                    <h2 className="font-18 font-semibold text-black mt-1">FINFIRST25</h2>
                </div>
                <div className="h-[40px] w-[40px] border light-border rounded-full flex items-center justify-center overflow-hidden p-[4px]">
                    <img src={logo} alt="Logo" className=" object-contain"/>
                </div>
            </div>
            <p className="sec-text-color  font-medium text-[12px] mt-[10px]">
                Save $25 on all transactions.
            </p>
            <p className="text-[12px] font-medium text-[#D2AF9F] mt-1 cursor-pointer hover:underline">
                *Terms & conditions
            </p>
      
            <div className="mt-4">
            <Button className="w-full text-black !text-[12px] font-bold !py-[8px] rounded-full transition" variant="outline">
                Apply Code
            </Button>
            </div>
      </div>
    </div>
  );
}
