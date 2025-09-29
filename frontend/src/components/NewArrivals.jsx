import React from 'react';

// Local images
import FlowerIcon from "../components/icons/FlowerIcon";
// Local images
import earringsImg from '../assets/earrings.png';
import shoesImg from '../assets/shoes.png';
import watchImg from '../assets/watch.png';
import winterClothesImg from '../assets/winter-clothes.png';

const NewArrivals = () => {
  const newArrivalItems = [
    { name: "Earings", img: earringsImg },
    { name: "Shoes", img: shoesImg },
    { name: "Watch", img: watchImg },
    { name: "Winter Cloths", img: winterClothesImg }
  ];

  return (
    <div className="w-full bg-white font-sans">
      <div className="flex flex-col items-center">
        
        {/* Title Section */}
        <div className="relative  flex justify-center items-center w-full">
          {/* Left line */}
          <div className="w-[50px] border-t border-black"></div>

          {/* Center container for title + icon */}
          <div className="relative mx-4 flex flex-col items-center justify-center h-48">
            {/* Title */}
            <h2 className="font-h2 text-2xl sm:text-3xl text-black whitespace-nowrap relative z-10">
              New Arrivals
            </h2>

            {/* Decorative SVG icon fully visible, centered */}
            <FlowerIcon className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[110px] h-[80px] pointer-events-none z-0" />
          </div>

          {/* Right line */}
          <div className="w-[50px] border-t border-black"></div>
        </div>
       
        {/* Grid Layout Section */}
        <div className="w-full max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 sm:px-[0px] px-4 lg:grid-cols-[400px_auto_400px] gap-4">

     <div className="relative group  h-[280px] w-[450px]  sm:h-[300px] sm:w-[100%]  lg:h-[580px] lg:w-auto  overflow-hidden">
  <img 
    src={newArrivalItems[0].img} 
    alt={newArrivalItems[0].name} 
    className="w-full h-full object-cover"
  />

  {/* Overlay content */}
  <div className="absolute inset-0 flex flex-col justify-start p-6">
    {/* Small line, 40px from top, left aligned */}
    <div className="absolute top-[40px] left-0 w-12 h-[2px] bg-black"></div>

    {/* Heading and Shop Now at the top */}
    <div className="mt-[60px] py-5">
      <p className="text-black text-sm mb-1">Shop Now &gt;</p>
      <h3 className="new-arrival-title text-black text-xl font-semibold py-4">
        {newArrivalItems[0].name}
      </h3>
    </div>
  </div>
</div>




         {/* Center: Shoes & Watch */}
<div className="flex flex-col gap-4">
  {/* Shoes */}
  <div className="relative group  h-[200px] w-[450px]  sm:h-[300px] sm:w-[100%]  lg:h-[280px] lg:w-auto  overflow-hidden">
    <img 
      src={newArrivalItems[1].img} 
      alt={newArrivalItems[1].name} 
      className="w-full h-full object-cover transition-transform duration-300"
    />

    {/* Overlay content */}
    <div className="absolute inset-0 flex flex-col justify-start p-6">
      {/* Small line, 40px from top, left aligned */}
      <div className="absolute top-[40px] left-0 w-12 h-[2px] bg-white"></div>

      {/* Heading and Shop Now at the top */}
      <div className="mt-[60px] py-4">
        <p className="text-white text-sm mb-1">Shop Now &gt;</p>
        <h3 className="new-arrival-title text-white text-xl font-semibold py-4">
          {newArrivalItems[1].name}
        </h3>
      </div>
    </div>
  </div>

  {/* Watch */}
  <div className="relative group  h-[200px] w-[450px]  sm:h-[300px] sm:w-[100%]  lg:h-[280px] lg:w-auto  overflow-hidden">
    <img 
      src={newArrivalItems[2].img} 
      alt={newArrivalItems[2].name} 
      className="w-full h-full object-cover transition-transform duration-300"
    />

    {/* Overlay content */}
    <div className="absolute inset-0 flex flex-col justify-start p-6">
      {/* Small line, 40px from top, left aligned */}
      <div className="absolute top-[40px] left-0 w-12 h-[2px] bg-white"></div>

      {/* Heading and Shop Now at the top */}
      <div className="mt-[60px] py-4">
        <p className="text-white text-sm mb-1">Shop Now &gt;</p>
        <h3 className="new-arrival-title text-white text-xl font-semibold py-4">
          {newArrivalItems[2].name}
        </h3>
      </div>
    </div>
  </div>
</div>


          {/* Right: Winter Clothes */}
<div className="relative group  h-[280px] w-[450px]  sm:h-[300px] sm:w-[100%]  lg:h-[580px] lg:w-auto  overflow-hidden">
  <img 
    src={newArrivalItems[3].img} 
    alt={newArrivalItems[3].name} 
    className="w-full h-full  "
  />

  {/* Overlay content */}
  <div className="absolute inset-0 flex flex-col justify-start p-6">
    {/* Small line, 40px from top, left aligned */}
    <div className="absolute top-[40px] left-0 w-12 h-[2px] bg-black"></div>

    {/* Heading and Shop Now at the top */}
    <div className="mt-[60px] py-4">
      <p className="text-black text-sm mb-1">Shop Now &gt;</p>
      <h3 className="new-arrival-title text-black text-xl font-semibold py-4">
        {newArrivalItems[3].name}
      </h3>
    </div>
  </div>
</div>


          </div>
        </div>
      </div>
    </div>
  );
};

export default NewArrivals;
