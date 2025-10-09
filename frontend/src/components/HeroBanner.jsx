import React, { useEffect } from "react";
import herobannerImage from "../assets/herobanner.png";
import sale from '../assets/sale.png';
import Row from "./ui/Row";
import Section from "./ui/Section";
import Button from "./ui/Button";
const DiscountBadge = ({ text = "50% off" }) => {
  return (
    <div className="absolute top-3 left-3 w-[60px] h-[60px] sm:w-[80px] sm:h-[80px] md:w-[120px] md:h-[120px] z-30 flex items-center justify-center">
       <img src={sale}/>
      <div className="absolute text-white text-[12px]  md:text-[22px] transform rotate-[-50deg]">
        {text}
      </div>
    </div>
  );
};
export default function HeroBanner (){
  // useEffect(() => {
  //   const style = document.createElement("style");
  //   style.innerHTML = `
  //     .theme-block {
  //         background-color: black;
  //         height: 2px;
  //         position: absolute;
  //         bottom: -8px;
  //         left: 0;
  //     }
  //   `;
  //   document.head.appendChild(style);
  //   return () => document.head.removeChild(style);
  // }, []);
  return (
<Section className="sec-theme relative overflow-hidden !pb-0">
  {/* Blur overlay */}
  <div className="absolute top-0 left-0 w-[23%] h-full bg-white/10 backdrop-blur-sm z-20 pointer-events-none"></div>
  <DiscountBadge text="50% off" />
  <div className="flex gap-[10px] justify-center items-center h-auto min-h-[150px] md:h-[544px] relative z-10">
    <div className="relative flex-1">
      <img
        src={herobannerImage}
        alt="Stylish woman in a trench coat and hat"
        className="w-[400px] sm:w-[850px] h-auto min-h-[150px] md:h-[544px] object-cover"
      />
    </div>
    <Row className="flex-1 md:text-left flex flex-col z-30 px-[20px]">
      <h2
        className="text-[20px] md:text-[50px] font-sans text-black mb-[10px] md:mb-[30px] relative leading"
        style={{ filter: "drop-shadow(5px 2px 4px rgba(0,0,0,0.25))" }}
      >
        Flash Deals
        <span className="absolute theme-border-block w-[25px] md:w-[100px] !h-[3px]"></span>
      </h2>
      <p className="text-[10px] md:text-[24px] text-[#989696] mb-[5px] md:mb-[10px] font-regular">
        Stylish Regular Fit Light Maroon Denim For Women's & Girls
      </p>
      <p className="text-[10px] md:text-[18px] font-regular text-black mb-[17px] md:mb-[50px] inline-block w-[51px] md:w-[94px] pb-1 border-b md:border-b-2 border-black">
        Rs 1099.00
      </p>
      <div>
        <Button variant="common" className="min-w-[72px] px-[10px] md:min-w-[200px] mb-[10px]">
          Shop Now!
        </Button>
      </div>
    </Row>
  </div>
</Section>
  );
};






