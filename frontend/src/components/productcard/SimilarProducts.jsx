import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "./ProductCard";
import Row from "../ui/Row";
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../features/products/productsThunk';

function PrevArrow({ onClick, disabled }) {
  return (
    <button
      onClick={!disabled ? onClick : undefined}
      className={`absolute right-14 md:right-20 top-0 -translate-y-[140%] z-10 flex items-center justify-center rounded-[3px] border light-border h-[20px] w-[20px] md:h-[40px] md:w-[40px]
      ${disabled ? " sec-text-color cursor-not-allowed" : "bg-white text-black"}`}
    >
      <ChevronLeft size={22} />
    </button>
  );
}

function NextArrow({ onClick, disabled }) {
  return (
    <button
      onClick={!disabled ? onClick : undefined}
      className={`absolute right-8 top-0 -translate-y-[140%] z-10 flex items-center justify-center rounded-[3px] border light-border h-[20px] w-[20px] md:h-[40px] md:w-[40px]
      ${disabled ? " sec-text-color cursor-not-allowed" : "bg-white text-black"}`}
    >
      <ChevronRight size={22} />
    </button>
  );
}

export default function SimilarProducts() {
  const sliderRef = useRef(null);
  const [slideState, setSlideState] = useState({ current: 0, total: 0 });
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  const { products = [], loading } = useSelector((state) => state.product);

  const dispatch = useDispatch();
  useEffect(() => {
      dispatch(fetchProducts());
  }, [dispatch]);

  console.log("🧠 Products in component:", products);

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    adaptiveHeight: false,
    // slidesToShow: 4,
    slidesToShow: windowWidth <= 480 ? 1 : windowWidth <= 767 ? 2 : windowWidth <= 980 ? 3 : windowWidth <= 1280 ? 4 : 4,
    slidesToScroll: 1,
    autoplay: false,
    beforeChange: (current, next) =>
      setSlideState({ current: next, total: products.length }),
    nextArrow: (
      <NextArrow
        disabled={
          slideState.current >= products.length - 4
        }
      />
    ),
    prevArrow: (
      <PrevArrow
        disabled={slideState.current === 0}
      />
    ),
   
  };

  return (
    <Row>
      <Slider ref={sliderRef} {...settings}>
        {products.map((product) => (
          <div className="px-[15px] ">
            <ProductCard key={product.id} product={product} className="border" />
          </div>
        ))}
      </Slider>
    </Row>
  );
}
