import React, { useRef, useState } from "react";
import Slider from "react-slick";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "./ProductCard";
import Row from "../ui/Row";
import img1 from "../../assets/similer1.png";
import img2 from "../../assets/similer2.png";
import img3 from "../../assets/similer3.png";
import img4 from "../../assets/similer4.png";

export const products = [
  {
    id: 1,
    title: "BLACK SCISSOR",
    subtitle: "Women Georgette Floral Black and...",
    price: 1137,
    oldPrice: 4575,
    discount: "75%",
    rating: 4,
    express: true,
    image: img1,
  },
  {
    id: 2,
    title: "Indibellie",
    subtitle: "Cotton Floral Printed Anarkali Kurta..",
    price: 2137,
    oldPrice: 4755,
    discount: "55%",
    rating: 4,
    express: false,
    image: img2,
  },
  {
    id: 3,
    title: "Indya",
    subtitle: "Women Reyon Lining Red An...",
    price: 1537,
    rating: 3,
    express: true,
    image: img3,
  },
  {
    id: 4,
    title: "Rangita",
    subtitle: "Chanderi Coral Sequine Yoke calf...",
    price: 1537,
    rating: 4,
    express: false,
    image: img4,
  },
  {
    id: 5,
    title: "Libas",
    subtitle: "Printed Cotton A-Line Kurta...",
    price: 1937,
    rating: 5,
    express: true,
    image: img1,
  },
  {
    id: 6,
    title: "Rangita",
    subtitle: "Printed Cotton A-Line Kurta...",
    price: 2937,
    rating: 3,
    express: true,
    image: img3,
  },
  
];

function PrevArrow({ onClick, disabled }) {
  return (
    <button
      onClick={!disabled ? onClick : undefined}
      className={`absolute right-14 md:right-20 top-0 -translate-y-[140%] z-10 flex items-center justify-center rounded-[3px] border border-[#BCBCBC] h-[20px] w-[20px] md:h-[40px] md:w-[40px]
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
      className={`absolute right-8 top-0 -translate-y-[140%] z-10 flex items-center justify-center rounded-[3px] border border-[#BCBCBC] h-[20px] w-[20px] md:h-[40px] md:w-[40px]
      ${disabled ? " sec-text-color cursor-not-allowed" : "bg-white text-black"}`}
    >
      <ChevronRight size={22} />
    </button>
  );
}

export default function SimilarProducts() {
  const sliderRef = useRef(null);
  const [slideState, setSlideState] = useState({ current: 0, total: 0 });

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: false,
    beforeChange: (current, next) =>
      setSlideState({ current: next, total: products.length }),
    nextArrow: (
      <NextArrow
        disabled={
          slideState.current >= products.length - 4 // disable if last visible
        }
      />
    ),
    prevArrow: (
      <PrevArrow
        disabled={slideState.current === 0}
      />
    ),
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <Row>
      <Slider ref={sliderRef} {...settings}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </Slider>
    </Row>
  );
}
