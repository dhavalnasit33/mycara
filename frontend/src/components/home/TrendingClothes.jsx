import React, { useEffect, useRef } from "react";
import Slider from "react-slick";
import FlowerIcon from "../icons/FlowerIcon"; 
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SectionHeading from '../ui/SectionHeading';
import Row from '../ui/Row.jsx';
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../features/products/productsThunk.js";
import { getImageUrl } from "../utils/helper.js";
import Section from "../ui/Section";
const NextArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="w-6 h-6 flex items-center justify-center bg-color text-white rounded-full mx-2 hover:bg-pink-600 transition"
  >
    &gt;
  </button>
);

const PrevArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="w-6 h-6 flex items-center justify-center bg-color text-white rounded-full mx-2 hover:bg-pink-600 transition"
  >
    &lt;
  </button>
);

const TrendingClothes = () => {
  const dispatch = useDispatch();
  const { products = [], loading } = useSelector((state) => state.product);
  const sliderRef = useRef(null);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const trendingProducts = products.filter((product) =>
    product.variants?.some((variant) => variant.is_trending)
  );


    const trendingProductsLimited = trendingProducts.slice(0, 3);
  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2, 
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024, // tablet
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 640, // mobile
        settings: { slidesToShow: 1 },
      },
    ],
  };

  if (loading) return <p>Loading...</p>;
  if (!trendingProductsLimited.length) return <p>No trending products found.</p>;

  return (
    <Section className="mb-[25px] md:mb-[50px]">
        <Row>
          <SectionHeading page="Home" order={5}/>
        </Row>

      <Row>
        {/* Desktop Grid */}
        <div className="hidden custom-lg:grid grid-cols-3 gap-8">
          {trendingProductsLimited.map((product) => (
            <TrendingCloth key={product._id} product={product} desktop />
          ))}
        </div>

        {/* Mobile & Tablet Slider */}
        <div className="custom-lg:hidden w-full relative">
          <Slider ref={sliderRef} {...sliderSettings}>
            {trendingProducts.map((product) => (
              <div key={product._id} className="px-2">
                <TrendingCloth product={product} />
              </div>
            ))}
          </Slider>

          <div className="flex justify-center mt-4">
            <PrevArrow onClick={() => sliderRef.current.slickPrev()} />
            <NextArrow onClick={() => sliderRef.current.slickNext()} />
          </div>
        </div>
      </Row>
    </Section>
  );
};

const TrendingCloth = ({ product, desktop }) => {
  return (
    <div className={`group ${desktop ? "" : "w-full"}`}>
      <div className="relative rounded-lg overflow-visible p-2">
        <span className="absolute top-0 left-0 w-[139px] border-t-[0.5px] border-dashed border-black"></span>
        <span className="absolute top-0 left-0 h-[177px] border-l-[0.5px] border-dashed border-black"></span>
        <span className="absolute bottom-0 right-0 w-[139px] border-b-[0.5px] border-dashed border-black"></span>
        <span className="absolute bottom-0 right-0 h-[177px] border-r-[0.5px] border-dashed border-black"></span>
        <FlowerIcon className="absolute top-0 left-0  w-[40px]  -translate-x-1/2   -translate-y-1/2  h-[30px] text-pink-300 pointer-events-none" />
        <img
          src={getImageUrl(product.images)}
          alt={product.name}
          className="w-full h-auto md:h-[555px]"
        />

        {product.sale && (
          <span className="absolute top-3 right-3 bg-color text-white text-xs px-3 py-1 rounded-[2px]">
            Sale
          </span>
        )}
      </div>

      <div className="p-2 text-left">
        <h3 className="font-medium text-[13px] custom-lg:text-[20px] custom-lg:text-[20px] mb-2">{product.name}</h3>
        <p className="text-[#989696] mb-2">
          {product.variants?.map((variant) => (
            <span key={variant._id} className="text-[10px] custom-lg:text-[14px] mr-2">
              Rs {variant.price}
            </span>
          ))}
        </p>
        <p className="text-black mb-2">★★★★★</p>
        <button className="text-black relative transition">
          Select Option
          <span className="theme-border-block w-7"></span>
        </button>
      </div>
    </div>
  );
};

export default TrendingClothes;
