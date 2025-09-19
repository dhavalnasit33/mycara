import React from "react";
import flowerImg from "../assets/flower.png"; // decorative flower

import SpainImg from "../assets/Spain tincid.png";
import LatestLookImg from "../assets/Leatest Look cort collection.png";
import StylishImg from "../assets/Leatest look stylish.png";

const products = [
  {
    id: 1,
    name: "Spain tincid",
    price: "Rs 999.00",
    oldPrice: "Rs 899.00",
    img: SpainImg,
  },
  {
    id: 2,
    name: "Latest Look cort collection",
    price: "Rs 999.00",
    oldPrice: "Rs 899.00",
    img: LatestLookImg,
    sale: true,
  },
  {
    id: 3,
    name: "Latest look stylish",
    price: "Rs 999.00",
    oldPrice: "Rs 899.00",
    img: StylishImg,
  },
];

const TrendingClothes = () => {
  return (
    <div className="w-full bg-white font-sans py-16">
      {/* Heading */}
      <div className="flex justify-center items-center mb-10">
        <div className="w-[50px] border-t border-black"></div>
         <h2 className="relative font-h2 sm:text-3xl mx-4 z-10 whitespace-nowrap">
            Trending Clothes
       
          
          <img
            src={flowerImg}
            alt="Decorative flower"
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-100 pointer-events-none"
          />
        </h2>
        <div className="w-[50px] border-t border-black"></div>
      </div>

      {/* Products Grid */}
      <div className="max-w-[1440px] mx-auto w-full  cursor-pointer grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-4">
        {products.map((product) => (
          <div key={product.id} className="border rounded-lg overflow-hidden shadow-md relative group">
            <img
              src={product.img}
              alt={product.name}
              className="w-full h-[400px] object-cover"
            />
            {product.sale && (
              <span className="absolute top-2 right-2 bg-pink-500 text-white text-xs px-2 py-1 rounded">
                Sale
              </span>
            )}
            <div className="p-4">
              <h3 className="font-semibold mb-2">{product.name}</h3>
              <p className="text-gray-500 mb-2">
                <span className="line-through mr-2">{product.oldPrice}</span>
                <span className="font-bold">{product.price}</span>
              </p>
              <p className="text-yellow-400 mb-2">★★★★★</p>
              <button className="mt-2 w-full bg-black text-white py-2 rounded hover:bg-pink-500 transition">
                Select Option
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingClothes;
