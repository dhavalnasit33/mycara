import React from "react";
import { useSelector } from "react-redux";
import FlowerIcon from "../icons/FlowerIcon";

export default function SectionHeading({page, order }) {

  const data = useSelector((state) => state.pages?.pages || []);


  // 1️⃣ Find home page
  const currentPage = data?.find(
    (p) => p.slug?.toLowerCase().trim() === page?.toLowerCase().trim()
  );

  // 2️⃣ Find section by order
    const currentSection = currentPage?.sections?.find(
    (section) => Number(section.order) === Number(order)
  );


  const title = currentSection?.title || "Default Title";

  if (!currentSection) {
    console.warn(
      ` Section not found for page: "${page}" with order: "${order}"`
    );
  }
//   if (!currentSection) {
//   console.warn("Section not found:", { page, order, data, currentPage });
// }

  return (
    <div className="relative flex justify-center items-center w-full mb-[50px] md:mb-[90px]">
      <div className="w-[18px] md:w-[50px] border-t border-black"></div>

      <div className="relative mx-2 md:mx-4 flex flex-col items-center justify-center">
        <h2 className="font-h2 text-black whitespace-nowrap relative z-10">
          {title}
        </h2>
        <FlowerIcon className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[40px] h-[25px] md:w-[110px] md:h-[80px] pointer-events-none z-0" />
      </div>

      <div className="w-[18px] md:w-[50px] border-t border-black"></div>
    </div>
  );
}
