// src/components/FeaturedProducts.jsx
import React, { useState, useEffect, useRef } from "react";
import { FaArrowRightLong, FaArrowLeftLong } from "react-icons/fa6";
import { Link } from "react-router-dom";
import Slider from "react-slick";

// ✅ Importing custom UI components
import SectionHeading from "../ui/SectionHeading";
import Row from "../ui/Row";
import ShoppingBagIcon from "../icons/ShoppingBagIcon";
import HeartIcon from "../icons/HeartIcon";
import ArrowleftIcon from "../icons/ArrowleftIcon";
import ArrowRightIcon from "../icons/ArrowRightIcon";




// ✅ Slick carousel styles
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// ✅ Product images
import kurtiImg from "../../assets/Women floral Cotton jaipuri kurta.png";
import pinkKurtaImg from "../../assets/Wommen kurta and Trouser.png";
import blueKurtaImg from "../../assets/Women all over printed kurta.png";
import anarkaliImg from "../../assets/Pink floral handwork anarkali.png";
import sareeImg from "../../assets/Women floral Cotton jaipuri saree.png";
import cotsetImg from "../../assets/Wommen ordenaree cotset.png";
import fanceytshirtImg from "../../assets/Girls full sleave fancy t shirt.png";
import banarasiImg from "../../assets/Self design banarasi silk bland.png";
import { useDispatch } from "react-redux";
import { fetchPages } from "../../features/pages/pagesThunk";

// ✅ Category list
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

// ✅ Product data
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

// ✅ Main Component
const FeaturedProducts = () => {

    const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPages());
  }, [dispatch]);


  const [mounted, setMounted] = useState(false);
  const [slidesToShow, setSlidesToShow] = useState(9);
  const [showArrows, setShowArrows] = useState(true);
  const [activeCategory, setActiveCategory] = useState("Cotton Kurti");
  const sliderRef = useRef();

  // 🔹 Handle screen size changes
  const updateSlider = () => {
    const width = window.innerWidth;
    if (width >= 1024) {
      setSlidesToShow(9);
      setShowArrows(false);
    } else if (width >= 768) {
      setSlidesToShow(4);
      setShowArrows(true);
    } else {
      setSlidesToShow(4);
      setShowArrows(true);
    }
  };

  useEffect(() => {
    setMounted(true);
    updateSlider();
    window.addEventListener("resize", updateSlider);
    return () => window.removeEventListener("resize", updateSlider);
  }, []);

  if (!mounted) return null;

  // ✅ Slick Slider Settings
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow,
    slidesToScroll: 1,
    arrows: false,
    swipeToSlide: true,
  };

  // ✅ Filtered products (optional)
  const filteredProducts =
    activeCategory === "Cotton Kurti"
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <section className="w-full py-[25px] md:py-[50px] ">
    
      
      <div className="flex flex-col items-center">
        
        {/* Section Heading */}
        <Row>
          <SectionHeading page="Home" sectionKey="content"  index={2} />
        </Row>

        {/* Category Slider (wrapped in Row) */}
        <Row className="relative  mb-5 lg:px-0 sm:px-4">
         {showArrows && (
  <>
    {/* Left Arrow */}
    <button
      className="absolute top-1/2 -translate-y-1/2 left-[-20px] z-20 w-9 h-9 flex items-center justify-center "
      onClick={() => sliderRef.current.slickPrev()}
    >
      <ArrowleftIcon
        className="text-black"
        style={{ width: "9.71px", height: "6px" }}
      />
    </button>

    {/* Right Arrow */}
    <button
      className="absolute top-1/2 -translate-y-1/2 right-[-20px] z-20 w-9 h-9 flex items-center justify-center "
      onClick={() => sliderRef.current.slickNext()}
    >
      <ArrowRightIcon
        className="text-black"
        style={{ width: "9.71px", height: "6px" }}
      />
    </button>
  </>
)}


          <Slider ref={sliderRef} {...settings}>
            {categories.map((item, i) => (
              <div key={i} className="px-[0px] sm:px-[0px]">
<button
  onClick={() => setActiveCategory(item.name)}
  className={`button border rounded-[30px] flex items-center justify-center 
    w-[65px] h-[22px] md:w-[133px] md:h-[38px]
    text-center transition-colors duration-300 mx-auto
    ${
      activeCategory === item.name
        ? "bg-color text-white"
        : "text-black"
    }`}
  style={{ boxShadow: "inset 0 0 4px rgba(0, 0, 0, 0.25)" }}
>
                  <p className="font-h4 text-[10px] md:text-[18px] lg:text-[18px]">
                    {item.name}
                  </p>
                </button>
              </div>
            ))}
          </Slider>
        </Row>

        {/*  Products Grid Section (inside Row) */}
        <Row className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4  gap-[14px] lg:gap-[20px] lg:px-0 sm:px-2 mt-6">
          {filteredProducts.map((p, index) => (
            <div
              key={index}
              className="relative border overflow-hidden transform transition-transform duration-300 hover:scale-95 cursor-pointer"
            >
              {/* 🔹 Product Image */}
              <div className="relative group overflow-hidden">
                <img
                  src={p.img}
                  alt={p.name}
                  className="w-full h-[227px] md:h-[227px] lg:h-[355px] transform transition-transform duration-300 hover:scale-105"
                />

                {/*  Heart Icon */}
                <div className="absolute top-3 right-3 opacity-100 group-hover:opacity-0 transition-opacity duration-300 z-10">
                 <button className="w-[20px] h-[20px] md:w-[20px] md:h-[20px] lg:w-[40px] lg:h-[40px] flex items-center justify-center bg-white text-black rounded-full border hover:scale-110 transition">
                    <HeartIcon className="w-[12px] h-[12px] sm:w-[12px] sm:h-[12px] lg:w-[26px] lg:h-[24px] text-black" />
                  </button>
                </div>


                {/*  Shopping Bag Icon */}
                <div className="absolute top-[38px] md:top-[38px] lg:top-[60px] right-3 opacity-100 group-hover:opacity-0 transition-opacity duration-300 z-10">
                  <button className="w-[20px] h-[20px] md:w-[20px] md:h-[20px] lg:w-[40px] lg:h-[40px] flex items-center justify-center bg-white text-black rounded-full border hover:scale-110 transition">
                    <ShoppingBagIcon className="w-[12px] h-[12px] sm:w-[12px] sm:h-[12px] lg:w-[26px] lg:h-[24px] text-black" />
                  </button>
                </div>


                {/* Hover Overlay */}
                <div className="absolute inset-3 bg-[rgba(12,11,11,0.3)] border border-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <p className="text-white font-semibold text-center">
                    View product
                  </p>
                </div>
              </div>

              {/* 🔹 Product Info */}
              <div className="p-4 text-center">
                <p className="text-black text-[12px] md:text-[15px] lg:text-[15px] font-regular mb-1">
                  {p.name}
                </p>
                <p className="text-black text-[12px] md:text-[15px] lg:text-[15px] font-regular mb-1">
                  {p.price}{" "}
                  <span className="line-through text-gray-400 text-[10px] md:text-[12px] lg:text-[12px] font-regular">
                    {p.oldPrice}
                  </span>
                </p>
                <p className="mx-auto w-[60px] h-[19px] flex justify-center items-center text-theme text-[10px] lg:text-[12px] font-regular rounded">
                  {p.discount}
                </p>
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
        </Row>
        
      </div>
   
    </section>
  );
};

export default FeaturedProducts;
