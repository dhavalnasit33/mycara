import React from 'react';
import clothesBanner from '../../assets/clothes-banner.png'; 

const BannerClothes = () => {
  return (
     <section className="w-full py-[25px] md:py-[50px] ">
    <div 
      className="relative mx-auto  h-[277.22px] lg:h-[719px] flex items-center justify-center overflow-hidden bg-cover bg-center" 
      style={{
        backgroundImage: `url(${clothesBanner})` 
      }}
    >
      {/* Transparent glass effect box */}
      <div 
        className="absolute inset-0 flex items-center justify-center"
      >
        <div 
          className="relative w-full !max-w-[1590px] h-[250px] sm:h-[400px] md:h-[563px]"
          style={{
            borderRadius: '10px',
            backdropFilter: 'blur(14px)',
            border: '0.5px solid white', 
            background: 'linear-gradient(to right, rgba(255, 255, 255, 0.03) 3%, transparent 3%)'
          }}
        ></div>
      </div>
      
      {/* Content overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center text-center p-4">
        {/* Responsive Heading */}
        <h1 
          className="text-white font-sans font-semibold tracking-wide text-[30px] lg:text-[80px] leading-tight"
        >
          Up TO 60% Off
        </h1>

        {/* Responsive Paragraph */}
        <p 
          className="text-white font-normal mt-2 font-sans text-[12px]  lg:text-[22px]"
        >
          Only Available Online
        </p>

        {/* Button */}
        <button className="w-[86px] h-[26px] lg:w-[218px] lg:h-[60px] mt-[50px]  bg-white text-theme font-normal rounded-[5px] text-[12px] lg:text-[24px]">
          Shop Now !
        </button>
      </div>
    </div>
    </section>
  );
};

export default BannerClothes;
