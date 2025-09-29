import React from 'react';
import clothesBanner from '../assets/clothes-banner.png'; 

const BannerClothes = () => {
  return (
    <div 
      className="relative mx-auto h-[400px] sm:h-[500px] md:h-[719px] flex items-center justify-center overflow-hidden bg-cover bg-center" 
      style={{
        backgroundImage: `url(${clothesBanner})` 
      }}
    >
      {/* Transparent glass effect box */}
      <div 
        className="absolute inset-0 flex items-center justify-center px-4"
      >
        <div 
          className="relative w-full max-w-[1440px] h-[250px] sm:h-[400px] md:h-[563px]"
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
          className="text-white font-sans font-semibold tracking-wide text-[24px] sm:text-[40px] md:text-[60px] lg:text-[80px] leading-tight"
        >
          Up TO 60% Off
        </h1>

        {/* Responsive Paragraph */}
        <p 
          className="text-white font-normal mt-2 font-sans text-[12px] sm:text-[16px] md:text-[20px] lg:text-[22px]"
        >
          Only Available Online
        </p>

        {/* Button */}
        <button className="mt-6 px-6 sm:px-8 py-2 sm:py-3 bg-white text-theme font-semibold rounded-md shadow-lg transition duration-300 ease-in-out hover:bg-gray-200 text-[12px] sm:text-[14px] md:text-[16px]">
          Shop Now !
        </button>
      </div>
    </div>
  );
};

export default BannerClothes;
