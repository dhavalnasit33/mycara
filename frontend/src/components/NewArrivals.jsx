import React from 'react';
import flowerImg from '../assets/flower.png';
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
        
        {/* Header Section */}
        <div className="relative py-16 flex justify-center w-full items-center">
          <div className="w-[50px] border-t border-black"></div>
          <h2 className="relative font-h2 sm:text-3xl mx-4 z-10 whitespace-nowrap">
            New Arrivals
            <img
              src={flowerImg}
              alt="Decorative flower"
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-100 pointer-events-none"
            />
          </h2>
          <div className="w-[50px] border-t border-black"></div>
        </div>

        {/* Grid Layout Section */}
        <div className="w-full max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[400px_auto_400px] gap-4">

     <div className="h-[580px] relative group">
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
  <div className="relative overflow-hidden group h-[280px]">
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
  <div className="relative overflow-hidden group h-[280px]">
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
<div className="h-[580px] relative group overflow-hidden">
  <img 
    src={newArrivalItems[3].img} 
    alt={newArrivalItems[3].name} 
    className="w-full h-full object-cover"
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
