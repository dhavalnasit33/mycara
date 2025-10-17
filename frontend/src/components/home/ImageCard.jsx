import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchPages } from "../../features/pages/pagesThunk";

const ImageCard = ({ name, img, textColor = "text-black" }) => {
  const lineTopPx = name === "Earings" || name === "Winter Cloths" ? 55 : 25;
  const textTopPx = name === "Earings" || name === "Winter Cloths" ? 60 : 30;

  const lineTopMobile = 20;
  const textTopMobile = 25;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPages());
  }, [dispatch]);

  return (
    <div className="relative overflow-hidden cursor-pointer group h-full w-full">
      <img src={img} alt={name} className="w-full h-full object-cover" />

      {/* Desktop line */}
      <div
        className="absolute left-0 w-[38.72px] h-[1px] hidden sm:block"
        style={{
          top: `${lineTopPx}px`,
          backgroundColor: textColor === "text-black" ? "#000" : "#fff",
        }}
      ></div>

      {/* Mobile line */}
      <div
        className="absolute left-0 w-[38.72px] h-[1px] sm:hidden"
        style={{
          top: `${lineTopMobile}px`,
          backgroundColor: textColor === "text-black" ? "#000" : "#fff",
        }}
      ></div>

      {/* Desktop text */}
      <div
        className={`${textColor} p-2 absolute left-[15px] hidden sm:block`}
        style={{ top: `${textTopPx}px` }}
      >
        <h3 className="text-[20px] sm:text-[30px] font-semibold leading-tight">{name}</h3>
        <p className="text-[12px] sm:text-[14px] font-normal mt-1 transition">Shop Now &gt;</p>
      </div>

      {/* Mobile text */}
      <div
        className={`${textColor} p-2 absolute left-[15px] sm:hidden`}
        style={{ top: `${textTopMobile}px` }}
      >
        <h3 className="text-[20px] font-semibold leading-tight">{name}</h3>
        <p className="text-[12px] font-normal mt-1 transition">Shop Now &gt;</p>
      </div>
    </div>
  );
};

export default ImageCard;
