// src/components/FeaturedProducts.jsx
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FaArrowRightLong, FaArrowLeftLong } from "react-icons/fa6";

// assets
import flowerImg from "../assets/flower.png";
import ShoppingBagIcon from "./icons/ShoppingBagIcon";
import HeartIcon from "./icons/HeartIcon";

// slick slider
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// product images
import kurtiImg from "../assets/Women floral Cotton jaipuri kurta.png";
import pinkKurtaImg from "../assets/Wommen kurta and Trouser.png";
import blueKurtaImg from "../assets/Women all over printed kurta.png";
import anarkaliImg from "../assets/Pink floral handwork anarkali.png";
import sareeImg from "../assets/Women floral Cotton jaipuri saree.png";
import cotsetImg from "../assets/Wommen ordenaree cotset.png";
import fanceytshirtImg from "../assets/Girls full sleave fancy t shirt.png";
import banarasiImg from "../assets/Self design banarasi silk bland.png";

// categories
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

// products
const products = [
  {
    img: kurtiImg,
    name: "Women floral Cotton jaipuri kurta",
    price: "Rs 1099.00",
    oldPrice: "Rs 1799.00",
    discount: "40% off",
    colors: ["#A51414", "#458754", "#F2CDBC"],
  },
  {
    img: pinkKurtaImg,
    name: "Women kurta and Trouser",
    price: "Rs 1999.00",
    oldPrice: "Rs 2299.00",
    discount: "30% off",
    colors: ["#D4D4D4", "#E77D83", "#938283"],
  },
  {
    img: blueKurtaImg,
    name: "Women all over printed kurta",
    price: "Rs 1999.00",
    oldPrice: "Rs 2299.00",
    discount: "30% off",
    colors: ["#16D5FF", "#E45BE7", "#ECF01D"],
  },
  {
    img: anarkaliImg,
    name: "Pink floral handwork anarkali",
    price: "Rs 1599.00",
    oldPrice: "Rs 2299.00",
    discount: "42% off",
    colors: ["#3716FF", "#EC8246", "#DBC1C1"],
  },
  {
    img: sareeImg,
    name: "Women floral Cotton jaipuri saree",
    price: "Rs 1099.00",
    oldPrice: "Rs 1799.00",
    discount: "45% off",
    colors: ["#A51414", "#458754"],
  },
  {
    img: cotsetImg,
    name: "Wommen ordenaree cotset",
    price: "Rs 1999.00",
    oldPrice: "Rs 2299.00",
    discount: "30% off",
    colors: ["#D4D4D4", "#E77D83", "#938283"],
  },
  {
    img: fanceytshirtImg,
    name: "Girls full sleave fancy t shirt",
    price: "Rs 1999.00",
    oldPrice: "Rs 2299.00",
    discount: "20% off",
    colors: ["#000000", "#DDD3DD", "#7C3C4B"],
  },
  {
    img: banarasiImg,
    name: "Pink floral handwork anarkali",
    price: "Rs 1599.00",
    oldPrice: "Rs 2299.00",
    discount: "42% off",
    colors: ["#F813C5", "#D5EBEC", "#D70E4A"],
  },
];

// FeaturedProducts component
const FeaturedProducts = () => {
  const [mounted, setMounted] = useState(false);
  const [slidesToShow, setSlidesToShow] = useState(9);
  const [showArrows, setShowArrows] = useState(true);
  const sliderRef = useRef();

  const updateSlider = () => {
    const width = window.innerWidth;

    if (width >= 1440) {
      setSlidesToShow(9);
      setShowArrows(false); // Desktop - hide arrows
    } else if (width >= 768) {
      setSlidesToShow(6);
      setShowArrows(true); // Tablet - show arrows
    } else {
      setSlidesToShow(4);
      setShowArrows(true); // Mobile - show arrows
    }
  };

  useEffect(() => {
    setMounted(true);
    updateSlider();
    window.addEventListener("resize", updateSlider);
    return () => window.removeEventListener("resize", updateSlider);
  }, []);

  if (!mounted) return null;

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow,
    slidesToScroll: 1,
    arrows: false, // slick arrows hidden
    swipeToSlide: true,
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
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-100 pointer-events-none"
            />
          </h2>
          <div className="w-[50px] border-t border-black"></div>
        </div>

        {/* Categories Slider with inside arrows */}
        <div className="relative max-w-[1440px] mx-auto w-full mb-6 px-2 sm:px-4">
          {showArrows && (
            <>
              <button
                className="absolute top-1/2 left-0 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white shadow-md flex items-center justify-center"
                onClick={() => sliderRef.current.slickPrev()}
              >
                <FaArrowLeftLong className="text-black" />
              </button>
              <button
                className="absolute top-1/2 right-0 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white shadow-md flex items-center justify-center"
                onClick={() => sliderRef.current.slickNext()}
              >
                <FaArrowRightLong className="text-black" />
              </button>
            </>
          )}
          <Slider ref={sliderRef} {...settings}>
            {categories.map((item, i) => (
              <div key={i} className="px-[6px] sm:px-[8px]">
                <Link
                  to={item.path}
                  className="border shadow-md rounded-[30px] flex items-center justify-center 
                              py-2 px-2 sm:py-2 sm:px-3 lg:py-2 lg:px-4
                              text-center text-black transition-colors duration-300 button hover:text-white"
                >
                  <p className="font-h4 text-[12px] sm:text-[16px]">{item.name}</p>
                </Link>
              </div>
            ))}
          </Slider>
        </div>

        {/* Products Grid */}
        <div className="max-w-[1440px] mx-auto w-full grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-2 sm:px-4 mt-6">
          {products.map((p, index) => (
            <div
              key={index}
              className="relative border overflow-hidden transform transition-transform duration-300 hover:scale-95"
            >
              <div className="relative group overflow-hidden">
                {/* Product Image */}
                <img
                  src={p.img}
                  alt={p.name}
                  className="w-full h-[250px] sm:h-[300px] md:h-[320px] lg:h-[350px] transform transition-transform duration-300 hover:scale-105"
                />

                {/* Heart Icon */}
                <div className="absolute top-3 right-3 opacity-100 group-hover:opacity-0 transition-opacity duration-300 z-10">
                  <button className="p-2 bg-white text-black rounded-full border hover:scale-110 transition">
                    <HeartIcon width={28} height={26} />
                  </button>
                </div>

                {/* Shopping Bag Icon */}
                <div className="absolute top-[60px] right-3 opacity-100 group-hover:opacity-0 transition-opacity duration-300 z-10">
                  <button className="p-2 bg-white text-black rounded-full border hover:scale-110 transition">
                    <ShoppingBagIcon width={28} height={26} />
                  </button>
                </div>

                {/* Hover Overlay */}
                <div
                  className="absolute top-1/2 left-1/2 
                             w-[200px] sm:w-[250px] md:w-[280px] lg:w-[325px] 
                             h-[235px] sm:h-[280px] md:h-[300px] lg:h-[330px] 
                             bg-[rgba(12,11,11,0.3)] border border-white 
                             flex items-center justify-center 
                             opacity-0 group-hover:opacity-100 
                             transition-opacity duration-500 
                             -translate-x-1/2 -translate-y-1/2"
                >
                  <p className="text-white font-semibold text-center">View product</p>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-4 text-center">
                <p className="text-gray-800 font-medium">{p.name}</p>
                <p className="font-regular">
                  {p.price}{" "}
                  <span className="line-through text-gray-400">{p.oldPrice}</span>
                </p>
                <p className="text-pink-500 text-sm">{p.discount}</p>
                <div className="flex gap-2 mt-2 justify-center">
                  {p.colors.map((c, i) => (
                    <span
                      key={i}
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: c }}
                    ></span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedProducts;
