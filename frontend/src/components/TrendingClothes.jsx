import React from "react";
import Slider from "react-slick";
import flowerImg from "../assets/flower.png"; // decorative flower

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import SpainImg from "../assets/Spain tincid.png";
import LatestLookImg from "../assets/Leatest Look cort collection.png";
import StylishImg from "../assets/Leatest look stylish.png";

const products = [
  {
    id: 1,
    name: "Spain tincid",
    price: "Rs 999.00 - Rs 899.00 ",
    img: SpainImg,
  },
  {
    id: 2,
    name: "Latest Look cort collection",
    price: "Rs 999.00 - Rs 899.00 ",
    img: LatestLookImg,
    sale: true,
  },
  {
    id: 3,
    name: "Latest look stylish",
    price: "Rs 999.00 - Rs 899.00 ",
    img: StylishImg,
  },
];

// Custom Arrows BELOW the slider ( < > style )
const NextArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="w-10 h-10 flex items-center justify-center bg-color text-white rounded-full mx-2 hover:bg-pink-600 transition"
  >
    &gt;
  </button>
);

const PrevArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="w-10 h-10 flex items-center justify-center bg-color text-white rounded-full mx-2 hover:bg-pink-600 transition"
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
    arrows: false, // disable default arrows
    slidesToShow: 2,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

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

      <div className="max-w-[1440px] mx-auto w-full cursor-pointer">
        {/* Desktop Grid */}
        <div className="hidden md:grid grid-cols-2 md:grid-cols-3 gap-8">
          {products.map((product) => (
            <div key={product.id} className="group">
              <div className="relative rounded-lg overflow-hidden p-2">
                <span className="absolute top-0 left-0 w-1/2 border-t-2 border-dashed border-black"></span>
                <span className="absolute top-0 left-0 h-1/2 border-l-2 border-dashed border-black"></span>
                <span className="absolute bottom-0 right-0 w-1/2 border-b-2 border-dashed border-black"></span>
                <span className="absolute bottom-0 right-0 h-1/2 border-r-2 border-dashed border-black"></span>

                <img
                  src={flowerImg}
                  alt="decor"
                  className="absolute -top-3 -left-3 w-6 h-6"
                />

                <img
                  src={product.img}
                  alt={product.name}
                  className="w-full h-[555px]"
                />

                {product.sale && (
                  <span className="absolute top-3 right-3 bg-color text-white text-xs px-3 py-1 rounded">
                    Sale
                  </span>
                )}
              </div>

              <div className="p-2 text-left">
                <h3 className="font-medium text-[20px] mb-2">{product.name}</h3>
                <p className="text-gray-500 mb-2">
                  <span
                    className="mr-2 text-[12px]"
                    style={{ color: "#989696" }}
                  >
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
        <div className="relative md:hidden">
          <Slider ref={sliderRef} {...sliderSettings}>
            {products.map((product) => (
              <div key={product.id} className="px-2">
                <div className="group">
                  <div className="relative rounded-lg overflow-hidden p-2">
                    <span className="absolute top-0 left-0 w-1/2 border-t-2 border-dashed border-black"></span>
                    <span className="absolute top-0 left-0 h-1/2 border-l-2 border-dashed border-black"></span>
                    <span className="absolute bottom-0 right-0 w-1/2 border-b-2 border-dashed border-black"></span>
                    <span className="absolute bottom-0 right-0 h-1/2 border-r-2 border-dashed border-black"></span>

                    <img
                      src={flowerImg}
                      alt="decor"
                      className="absolute -top-3 -left-3 w-6 h-6"
                    />

                    <img
                      src={product.img}
                      alt={product.name}
                      className="w-full h-[300px] "
                    />

                    {product.sale && (
                      <span className="absolute top-2 right-2 bg-color text-white text-xs px-3 py-1 rounded">
                        Sale
                      </span>
                    )}
                  </div>

                  <div className="p-2 text-left">
                    <h3 className="font-medium text-[20px] mb-2">
                      {product.name}
                    </h3>
                    <p className="text-gray-500 mb-2">
                      <span
                        className="mr-2 text-[12px]"
                        style={{ color: "#989696" }}
                      >
                        {product.price}
                      </span>
                    </p>
                    <p className="text-black mb-2">★★★★★</p>
                    <button className="text-black relative transition">
                      Select Option
                      <span className="theme-border-block"></span>
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
      </div>
    </div>
  );
};

export default TrendingClothes;
