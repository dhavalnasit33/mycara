import React from "react";
import Slider from "react-slick";

// Local images
import FlowerIcon from "../components/icons/FlowerIcon"; 
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import SpainImg from "../assets/Spain tincid.png";
import LatestLookImg from "../assets/Leatest Look cort collection.png";
import StylishImg from "../assets/Leatest look stylish.png";
import SectionHeading from './ui/SectionHeading';
import Row from './ui/Row.jsx';
const products = [
  {
    id: 1,
    name: "Spain tincid",
    price: "Rs 999.00 - Rs 899.00",
    img: SpainImg,
  },
  {
    id: 2,
    name: "Latest Look cort collection",
    price: "Rs 999.00 - Rs 899.00",
    img: LatestLookImg,
    sale: true,
  },
  {
    id: 3,
    name: "Latest look stylish",
    price: "Rs 999.00 - Rs 899.00",
    img: StylishImg,
  },
];

// Custom Arrows BELOW the slider
const NextArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="w-[16px] h-[16px] flex items-center justify-center bg-color text-white rounded-full mx-2 hover:bg-pink-600 transition"
  >
    &gt;
  </button>
);

const PrevArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="w-[16px] h-[16px] flex items-center justify-center bg-color text-white rounded-full mx-2 hover:bg-pink-600 transition"
  >
    &lt;
  </button>
);

const TrendingClothes = () => {
  const sliderRef = React.useRef(null);

const sliderSettings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 2,   // tablet shows 2 slides
  slidesToScroll: 1,
  arrows: false,
  responsive: [
    {
      breakpoint: 768, // mobile
      settings: {
        slidesToShow: 2,
      },
    },
  ],
};


  return (
    <section className=" w-full py-[25px] md:py-[50px] ">
    
      {/* Heading */}
      <div className="relative flex justify-center items-center w-full">
                <Row>
                         <SectionHeading title="Trending Clothes" />
                </Row>
      </div>

 <Row className="cursor-pointer">
        
  {/* Desktop Grid */}
  <div className="hidden lg:grid grid-cols-3 gap-8">
    
    {products.map((product) => (
      <div key={product.id} className="group">
         
        {/* === START MODIFIED BLOCK (DESKTOP) === */}
        {/* CHANGED overflow-hidden TO overflow-visible to show outside elements */}
        <div className="relative rounded-lg overflow-visible p-2">

            
        {/* Dashed corner borders */}
<span className="absolute top-0 left-0 w-[139px] border-t-[0.5px] border-dashed border-black"></span>
<span className="absolute top-0 left-0 h-[177px] border-l-[0.5px] border-dashed border-black"></span>
<span className="absolute bottom-0 right-0 w-[139px] border-b-[0.5px] border-dashed border-black"></span>
<span className="absolute bottom-0 right-0 h-[177px] border-r-[0.5px] border-dashed border-black"></span>

          {/* FLOWER ICON: Use standard Tailwind size classes (e.g., w-10, h-10) and Z-index */}
          {/* Use -top-6 and -left-6 to push it outside the p-2 padding and the dashed border */}
  <FlowerIcon className="absolute -top-5 -left-5 sm:-left-6 w-[40px] sm:w-[50px] h-[40px] text-pink-300 pointer-events-none" />
          
          {/* === END MODIFIED BLOCK (DESKTOP) === */}

          <img
            src={product.img}
            alt={product.name}
            className="w-full h-[555px]"
          />

          {product.sale && (
            <span className="absolute top-3 right-3 bg-color text-white text-xs px-3 py-1 rounded-[2px]">
              Sale
            </span>
          )}
        </div>

        <div className="p-2 text-left">
          <h3 className="font-medium text-[13px] md:text-[20px]  lg:text-[20px] mb-2 ">{product.name}</h3>
          <p className="text-gray-500 mb-2">
            <span className="mr-2 text-[10px] md:text-[14px] lg:text-[14px]" style={{ color: "#989696" }}>
              {product.price}
            </span>
          </p>
          <p className="text-black mb-2">★★★★★</p>
          <button className="text-black relative transition">
            Select Option
            <span className="theme-border-block w-[30px]"></span>
          </button>
        </div>
      </div>
    ))}
  </div>

        {/* Mobile Slider */}
        <div className="relative lg:hidden">
          <Slider ref={sliderRef} {...sliderSettings}>
            {products.map((product) => (
              <div key={product.id} className="px-2">
                <div className="group">
                  <div className="relative  overflow-hidden p-2">
                    {/* Dashed border */}
                <span className="absolute top-0 left-0 w-[60px] border-t-[0.5px] border-dashed border-black"></span>
                <span className="absolute top-0 left-0 h-[85px] border-l-[0.5px] border-dashed border-black"></span>
                <span className="absolute bottom-0 right-0 w-[60px] border-b-[0.5px] border-dashed border-black"></span>
                <span className="absolute bottom-0 right-0 h-[85px] border-r-[0.5px] border-dashed border-black"></span>

                    {/* Flower Icon outside top-left */}
                              {/* Use -top-6 and -left-6 to push it outside the p-2 padding and the dashed border */}
  <FlowerIcon className="absolute -top-5 -left-5 sm:-left-6 w-[40px] sm:w-[50px] h-[40px] 
   pointer-events-none" />

                    <img
                      src={product.img}
                      alt={product.name}
                      className="w-full h-[239px] "
                    />

                    {product.sale && (
                      <span className="text-[8px] md:text-[16px] lg:text-[16px] font-sans font-medium absolute top-2 right-2 bg-color text-white px-1 md:px-2 lg:px-2 top-4 md:top-4 lg:top-4 right-4 md:right-4 lg:right-4  ">
                        Sale
                      </span>
                    )}
                  </div>

                  <div className="p-2 text-left">
                    <h3 className="font-medium text-[13px] md:text-[20px]  lg:text-[20px] lg:mb-2 md:mb-0  sm:mb-0">{product.name}</h3>
                    <p className="text-[#989696] lg:mb-2 md:mb-0 sm:mb-0">
                      <span className=" text-[10px] md:text-[14px] lg:text-[14px] " style={{ color: "#989696" }}>
                        {product.price}
                      </span>
                    </p>
                    <p className="text-black lg:mb-2 md:mb-0  sm:mb-0">★★★★★</p>
                    <button className="text-black text-[12px] md:text-[14px]  lg:text-[14px] relative transition">
                      Select Option
                      <span className="theme-border-block w-7"></span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </Slider>

          {/* Arrows BELOW slider */}
          <div className="flex justify-center mt-4">
            <PrevArrow onClick={() => sliderRef.current.slickPrev()} />
            <NextArrow onClick={() => sliderRef.current.slickNext()} />
          </div>
        </div>
      </Row>

    </section>
  );
};

export default TrendingClothes;
