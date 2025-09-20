// D:\mycara\frontend\src\components\FeaturedProducts.jsx

import React from "react";
import flowerImg from "../assets/flower.png"; 
import { Link } from "react-router-dom";   // 👈 ae line missing hati

import ShoppingBagIcon from "./icons/ShoppingBagIcon";
import HeartIcon from "./icons/HeartIcon"; // 👈 import path
// 👇 slick imports
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import kurtiImg from "../assets/Women floral Cotton jaipuri kurta.png";
import pinkKurtaImg from "../assets/Wommen kurta and Trouser.png";
import blueKurtaImg from "../assets/Women all over printed kurta.png";
import anarkaliImg from "../assets/Pink floral handwork anarkali.png";
import sareeImg from "../assets/Women floral Cotton jaipuri saree.png";
import cotsetImg from "../assets/Wommen ordenaree cotset.png";
import fanceytshirtImg from "../assets/Girls full sleave fancy t shirt.png";
import banarasiImg from "../assets/Self design banarasi silk bland.png";


// ✅ Categories
const categories = [
  { name: "Cotton Kurti", path: "/category/cotton-kurti" },
  { name: "Jeans", path: "/category/jeans" },
  { name: "Saree", path: "/category/saree" },
  { name: "T-Shirts", path: "/category/tshirts" },
  { name: "Nightware", path: "/category/nightware" },
  { name: "Gowns", path: "/category/gowns" },
  { name: "Dresses", path: "/category/dresses" },
  { name: "Crop Tops", path: "/category/croptops" },
  { name: "Shoes", path: "/category/shoes" },
];

// ✅ Custom Arrow Components
const NextArrow = ({ onClick }) => (
  <div
    className="absolute top-1/2 right-0 transform -translate-y-1/2 z-10 
               cursor-pointer bg-white shadow-md rounded-full w-9 h-9 flex items-center justify-center"
    onClick={onClick}
  >
    ➡
  </div>
);

const PrevArrow = ({ onClick }) => (
  <div
    className="absolute top-1/2 left-0 transform -translate-y-1/2 z-10 
               cursor-pointer bg-white shadow-md rounded-full w-9 h-9 flex items-center justify-center"
    onClick={onClick}
  >
    ⬅
  </div>
);

const FeaturedProducts = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 9,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 6 } },
      { breakpoint: 768, settings: { slidesToShow: 3 } },
      { breakpoint: 480, settings: { slidesToShow: 3 } },
    ],
  };

  return (
    <div className="w-full bg-white font-sans">
      <div className="flex flex-col items-center">
      
        {/* Heading */}
        <div className="relative py-16 flex justify-center w-full items-center">
          <div className="w-[50px] border-t border-black"></div>

          <h2 className="relative font-h2 sm:text-3xl mx-4 z-10 whitespace-nowrap">
            Featured Products
            <img
              src={flowerImg}
              alt="Decorative flower"
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-100 pointer-events-none"
            />


          </h2>

          <div className="w-[50px] border-t border-black"></div>
        </div>



     {/* ✅ Category Buttons Slider */}
<div className="max-w-[1440px] mx-auto w-full  cursor-pointer">
  <Slider {...settings}>
    {categories.map((item, i) => (
      <div key={i} className="px-2">
        <Link
          to={item.path}
          className="border shadow-md rounded-[30px] flex items-center justify-center 
                     py-2 px-4 text-center shadow-[inset_0_0_5px_1px_rgba(0,0,0,0.25)] transition"
        >
          <p className="font-h4 text-sm sm:text-base">{item.name}</p>
        </Link>
      </div>
    ))}
  </Slider>
</div>


        {/* First Row of Products */}
<div className="max-w-[1440px] mx-auto w-full grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
          {/* Product 1 */}
          <div className="relative border overflow-hidden shadow-md">
            <div className="relative group overflow-hidden">
              <img
                src={kurtiImg}
                alt="Cotton Kurti"
                className="w-full h-[350px] transform transition-transform group-hover:scale"
              />

                            
              {/* 👇 Heart Icon (default visible, hide on hover) */}
              <div className="absolute top-3 right-3 opacity-100 group-hover:opacity-0 transition-opacity duration-300 z-10">
                <button className="p-2 bg-white text-black rounded-full border  transition transform hover:scale-110">
                  <HeartIcon width={28} height={26} />
                </button>
              </div>

              {/* 👇 Shopping Bag Icon (slightly below Heart icon) */}
              <div className="absolute top-[60px] right-3 opacity-100 group-hover:opacity-0 transition-opacity duration-300 z-10">
                <button className="p-2 bg-white text-black rounded-full border  transition transform hover:scale-110">
                  <ShoppingBagIcon width={28} height={26} />
                </button>
              </div>

            
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center 
                              opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <p className="text-white font-semibold">View product</p>
              </div>
            </div>
            <div className="p-4 text-center">
              <p className="text-gray-800">Women floral Cotton jaipuri kurta</p>
              <p className="font-regular">
                Rs 1099.00{" "}
                <span className="line-through font-medium text-gray-400">Rs 1799.00</span>
              </p>
              <p className="text-pink-500 text-sm">40% off</p>
              <div className="flex gap-2 mt-2 justify-center">
                <span className="w-4 h-4 bg-[#A51414] rounded-full"></span>
                <span className="w-4 h-4 bg-[#458754] rounded-full"></span>
                <span className="w-4 h-4 bg-[#F2CDBC] rounded-full"></span>
              </div>
            </div>
          </div>

          {/* Product 2 */}
          <div className="relative border overflow-hidden shadow-md">
            <div className="relative group overflow-hidden">
              <img
                src={pinkKurtaImg}
                alt="Pink Kurta"
                className="w-full h-[350px] transform transition-transform group-hover:scale"
              />
               {/* 👇 Heart Icon (default visible, hide on hover) */}
              <div className="absolute top-3 right-3 opacity-100 group-hover:opacity-0 transition-opacity duration-300 z-10">
                <button className="p-2 bg-white text-black rounded-full border  transition transform hover:scale-110">
                  <HeartIcon width={28} height={26} />
                </button>
              </div>

              {/* 👇 Shopping Bag Icon (slightly below Heart icon) */}
              <div className="absolute top-[60px] right-3 opacity-100 group-hover:opacity-0 transition-opacity duration-300 z-10">
                <button className="p-2 bg-white text-black rounded-full border  transition transform hover:scale-110">
                  <ShoppingBagIcon width={28} height={26} />
                </button>
              </div>
            
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center 
                              opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <p className="text-white font-semibold">View product</p>
              </div>
            </div>
            <div className="p-4 text-center">
              <p className="text-gray-800">Women kurta and Trouser</p>
              <p className="font-regular">
                Rs 1999.00{" "}
                <span className="line-through text-gray-400">Rs 2299.00</span>
              </p>
              <p className="text-pink-500 text-sm">30% off</p>
              <div className="flex gap-2 mt-2 justify-center">
                <span className="w-4 h-4 bg-[#D4D4D4] rounded-full"></span>
                <span className="w-4 h-4 bg-[#E77D83] rounded-full"></span>
                <span className="w-4 h-4 bg-[#938283] rounded-full"></span>
              </div>
            </div>
          </div>

          {/* Product 3 */}
          <div className="relative border overflow-hidden shadow-md">
            <div className="relative group overflow-hidden">
              <img
                src={blueKurtaImg}
                alt="Blue Kurta"
                className="w-full h-[350px] transform transition-transform group-hover:scale"
              />

               {/* 👇 Heart Icon (default visible, hide on hover) */}
              <div className="absolute top-3 right-3 opacity-100 group-hover:opacity-0 transition-opacity duration-300 z-10">
                <button className="p-2 bg-white text-black rounded-full border  transition transform hover:scale-110">
                  <HeartIcon width={28} height={26} />
                </button>
              </div>

            

              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center 
                              opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <p className="text-white font-semibold">View product</p>
              </div>
            </div>
            <div className="p-4 text-center">
              <p className="text-gray-800">Women all over printed kurta</p>
              <p className="font-regular">
                Rs 1999.00{" "}
                <span className="line-through text-gray-400">Rs 2299.00</span>
              </p>
              <p className="text-pink-500 text-sm">30% off</p>
              <div className="flex gap-2 mt-2 justify-center">
                <span className="w-4 h-4 bg-[#16D5FF] rounded-full"></span>
                <span className="w-4 h-4 bg-[#E45BE7] rounded-full"></span>
                <span className="w-4 h-4 bg-[#ECF01D] rounded-full"></span>
              </div>
            </div>
          </div>

          {/* Product 4 */}
          <div className="relative border overflow-hidden shadow-md">
            <div className="relative group overflow-hidden">
              <img
                src={anarkaliImg}
                alt="Anarkali"
                className="w-full h-[350px] transform transition-transform group-hover:scale"
              />

              
             {/* 👇 Heart Icon (default visible, hide on hover) */}
              <div className="absolute top-3 right-3 opacity-100 group-hover:opacity-0 transition-opacity duration-300 z-10">
                <button className="p-2 bg-white text-black rounded-full border  transition transform hover:scale-110">
                  <HeartIcon width={28} height={26} />
                </button>
              </div>

              {/* 👇 Shopping Bag Icon (slightly below Heart icon) */}
              <div className="absolute top-[60px] right-3 opacity-100 group-hover:opacity-0 transition-opacity duration-300 z-10">
                <button className="p-2 bg-white text-black rounded-full border  transition transform hover:scale-110">
                  <ShoppingBagIcon width={28} height={26} />
                </button>
              </div>

              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center 
                              opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <p className="text-white font-semibold">View product</p>
              </div>
            </div>
            <div className="p-4 text-center">
              <p className="text-gray-800">Pink floral handwork anarkali</p>
              <p className="font-regular">
                Rs 1599.00{" "}
                <span className="line-through text-gray-400">Rs 2299.00</span>
              </p>
              <p className="text-pink-500 text-sm">42% off</p>
              <div className="flex gap-2 mt-2 justify-center">
                <span className="w-4 h-4 bg-[#3716FF] rounded-full"></span>
                <span className="w-4 h-4 bg-[#EC8246] rounded-full"></span>
                <span className="w-4 h-4 bg-[#DBC1C1] rounded-full"></span>
              </div>
            </div>
          </div>
        </div>

        {/* Second Row of Products */}
        <div className="max-w-[1440px] mx-auto w-full grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
          {/* Product 5 */}
{/* Product 5 */}
<div className="relative border overflow-hidden shadow-md">
  <div className="relative group overflow-hidden">
    <img
      src={sareeImg}
      alt="Cotton Kurti"
      className="w-full h-[350px] transform transition-transform "
    />

   
              {/* 👇 Heart Icon (default visible, hide on hover) */}
              <div className="absolute top-3 right-3 opacity-100 group-hover:opacity-0 transition-opacity duration-300 z-10">
                <button className="p-2 bg-white text-black rounded-full border  transition transform hover:scale-110">
                  <HeartIcon width={28} height={26} />
                </button>
              </div>

              {/* 👇 Shopping Bag Icon (slightly below Heart icon) */}
              <div className="absolute top-[60px] right-3 opacity-100 group-hover:opacity-0 transition-opacity duration-300 z-10">
                <button className="p-2 bg-white text-black rounded-full border  transition transform hover:scale-110">
                  <ShoppingBagIcon width={28} height={26} />
                </button>
              </div>

          {/* Overlay Text */}
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center 
                          opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <p className="text-white font-semibold">View product</p>
          </div>
        </div>

  {/* Product Info */}
  <div className="p-4 text-center">
    <p className="text-gray-800">Women floral Cotton jaipuri saree</p>
    <p className="font-regular">
      Rs 1099.00{" "}
      <span className="line-through text-gray-400">Rs 799.00</span>
    </p>
    <p className="text-pink-500 text-sm">45% off</p>
    <div className="flex gap-2 mt-2 justify-center">
      <span className="w-4 h-4 bg-[#A51414] rounded-full"></span>
      <span className="w-4 h-4 bg-[#458754] rounded-full"></span>
    </div>
  </div>
</div>



          {/* Product 6 */}
          <div className="relative border overflow-hidden shadow-md">
            <div className="relative group overflow-hidden">
              <img
                src={cotsetImg}
                alt="Pink Kurta"
                className="w-full h-[350px] transform transition-transform group-hover:scale"
              />

              {/* 👇 Heart Icon (default visible, hide on hover) */}
              <div className="absolute top-3 right-3 opacity-100 group-hover:opacity-0 transition-opacity duration-300 z-10">
                <button className="p-2 bg-white text-black rounded-full border  transition transform hover:scale-110">
                  <HeartIcon width={28} height={26} />
                </button>
              </div>

              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center 
                              opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <p className="text-white font-semibold">View product</p>
              </div>
            </div>
            <div className="p-4 text-center">
              <p className="text-gray-800">Wommen ordenaree cotset</p>
              <p className="font-regular">
                Rs 1999.00{" "}
                <span className="line-through text-gray-400">Rs 2299.00</span>
              </p>
              <p className="text-pink-500 text-sm">30% off</p>
              <div className="flex gap-2 mt-2 justify-center">
                <span className="w-4 h-4 bg-[#D4D4D4] rounded-full"></span>
                <span className="w-4 h-4 bg-[#E77D83] rounded-full"></span>
                <span className="w-4 h-4 bg-[#938283] rounded-full"></span>
              </div>
            </div>
          </div>

          {/* Product 7 */}
          <div className="relative border overflow-hidden shadow-md">
            <div className="relative group overflow-hidden">
              <img
                src={fanceytshirtImg}
                alt="Blue Kurta"
                className="w-full h-[350px] transform transition-transform group-hover:scale"
              />
              
               {/* 👇 Heart Icon (default visible, hide on hover) */}
              <div className="absolute top-3 right-3 opacity-100 group-hover:opacity-0 transition-opacity duration-300 z-10">
                <button className="p-2 bg-white text-black rounded-full border  transition transform hover:scale-110">
                  <HeartIcon width={28} height={26} />
                </button>
              </div>
   
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center 
                              opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <p className="text-white font-semibold">View product</p>
              </div>
            </div>
            <div className="p-4 text-center">
              <p className="text-gray-800">Girls full sleave fancy t shirt </p>
              <p className="font-regular">
                Rs 1999.00{" "}
                <span className="line-through text-gray-400">Rs 2299.00</span>
              </p>
              <p className="text-pink-500 text-sm">20% off</p>
              <div className="flex gap-2 mt-2 justify-center">
                <span className="w-4 h-4 bg-[#000000] rounded-full"></span>
                <span className="w-4 h-4 bg-[#DDD3DD] rounded-full"></span>
                <span className="w-4 h-4 bg-[#7C3C4B] rounded-full"></span>
              </div>
            </div>
          </div>

          {/* Product 8 */}
          <div className="relative border overflow-hidden shadow-md">
            <div className="relative group overflow-hidden">
              <img
                src={banarasiImg}
                alt="Anarkali"
                className="w-full h-[350px] transform transition-transform group-hover:scale"
              />


               {/* 👇 Heart Icon (default visible, hide on hover) */}
              <div className="absolute top-3 right-3 opacity-100 group-hover:opacity-0 transition-opacity duration-300 z-10">
                <button className="p-2 bg-white text-black rounded-full border  transition transform hover:scale-110">
                  <HeartIcon width={28} height={26} />
                </button>
              </div>
  
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center 
                              opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <p className="text-white font-semibold">View product</p>
              </div>
            </div>
            <div className="p-4 text-center">
              <p className="text-gray-800">Pink floral handwork anarkali</p>
              <p className="font-regular">
                Rs 1599.00{" "}
                <span className="line-through text-gray-400">Rs 2299.00</span>
              </p>
              <p className="text-pink-500 text-sm">42% off</p>
              <div className="flex gap-2 mt-2 justify-center">
                <span className="w-4 h-4 bg-[#F813C5] rounded-full"></span>
                <span className="w-4 h-4 bg-[#D5EBEC] rounded-full"></span>
                <span className="w-4 h-4 bg-[#D70E4A] rounded-full"></span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default FeaturedProducts;
