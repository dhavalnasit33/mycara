import React from 'react';
import Image1 from '../assets/Short top.png';
import Image2 from '../assets/dangali.png';
import Image3 from '../assets/vanpees.png';
import Image4 from '../assets/suit.png';

import { IoIosArrowRoundForward } from "react-icons/io";

// Local images
import FlowerIcon from "../components/icons/FlowerIcon"; 

const Bestsellers = () => {
  const products = [
    { name: "Short top", price: "Rs 399.00", image: Image1 },
    { name: "Gray Jumpsuit", price: "Rs 899.00", image: Image2 },
    { name: "Red Dress", price: "Rs 1299.00", image: Image3 },
    { name: "Blue Suit", price: "Rs 1899.00", image: Image4 },
  ];

  return (
    <div className="max-w-[1440px] mx-auto w-full cursor-pointer py-16 px-4 sm:px-6 lg:px-8">

      {/* Title Section */}
        <div className="relative flex justify-center items-center w-full">
          {/* Left line */}
          <div className="w-[50px] border-t border-black"></div>

          {/* Center container for title + icon */}
          <div className="relative mx-4 flex flex-col items-center justify-center h-48">
            {/* Title */}
            <h2 className="font-h2 text-2xl sm:text-3xl text-black whitespace-nowrap relative z-10">
              Our Best Seller's
            </h2>

            {/* Decorative SVG icon fully visible, centered */}
            <FlowerIcon className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[110px] h-[80px]  pointer-events-none z-0" />
          </div>

          {/* Right line */}
          <div className="w-[50px] border-t border-black"></div>
        </div>
      {/* Product Grid - Corrected for responsiveness */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
      
      {/* "View all" Button */}
      <div className="flex justify-center mt-12">
        <button className="flex items-center justify-center text-theme text-[16px] font-sans border border-black py-3 px-5 rounded-[5px] transition-colors hover:bg-pink-500 hover:text-white">
          View all Best Seller's <IoIosArrowRoundForward className=" inline-block text-[30px]" />
        </button>
      </div>
    </div>
  );
};

const ProductCard = ({ product }) => {
  return (
    <div className="relative overflow-hidden bg-white rounded-lg shadow-md group w-full aspect-[3/4]">
      {/* Main Image */}
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-full object-cover transition-transform duration-300 transform"
      />

      {/* Hover overlay */}
      <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
        <div className="w-[95%] h-[95%] bg-black bg-opacity-[0.31] flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded pointer-events-auto">
          {/* Text container with white bg and black text */}
          <div className="bg-white px-2 py-2 w-[150px] rounded text-center">
            <p className="text-black text-lg font-medium font-sans">{product.name}</p>
            <p className="text-black font-sans">{product.price}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bestsellers;