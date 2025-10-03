import React, { useState, useRef, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Local images
import shoppingImg from "../assets/shopping.png";
import KurtiImg from "../assets/Kurti.png";
import CropTopsImg from "../assets/Crop Tops.png";
import JeansImg from "../assets/Jeans.png";
import NightwareImg from "../assets/Nightware.png";
import jewelleryimg from "../assets/jewellery.png";
import Section from "./ui/Section";
import SectionHeading from "./ui/SectionHeading";
import Row from "./ui/Row";


const categories = [
  { name: "Saree", img: shoppingImg },
  { name: "Kurti", img: KurtiImg },
  { name: "Crop Tops", img: CropTopsImg },
  { name: "Jeans", img: JeansImg },
  { name: "Nightware", img: NightwareImg },
  { name: "Jewellery", img: jewelleryimg },
];

const CategoriesSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(4); // default desktop
  const sliderRef = useRef(null);

  // Handle window resize
  // const handleResize = () => {
  //   if (window.innerWidth >= 1024) setSlidesToShow(5); // desktop
  //   else if (window.innerWidth >= 768) setSlidesToShow(3); // tablet
  //   else setSlidesToShow(2); // mobile
  // };

  // useEffect(() => {
  //   handleResize(); // initial check
  //   window.addEventListener("resize", handleResize);
  //   return () => window.removeEventListener("resize", handleResize);
  // }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow:5,
    slidesToScroll: 1,
    arrows: false,
    beforeChange: (_, next) => setCurrentSlide(next),
     responsive: [
      {
        breakpoint: 1280, 
        settings: { slidesToShow: 4, slidesToScroll: 1 },
      },
      {
        breakpoint: 980, 
        settings: { slidesToShow: 3, slidesToScroll: 1 },
      },
      {
        breakpoint: 767, 
        settings: { slidesToShow: 2, slidesToScroll: 1 },
      },
    ],
  };

  return (
    <Section >
      {/* <div className="flex flex-col items-center"> */}
       <Row>
        <SectionHeading title=" Shop By Categories" />
      </Row>

        {/* Slider */}
        <Row className="max-w-[1440px] mx-auto w-full">
          <Slider ref={sliderRef} {...settings}>
            {categories.map((category, index) => (
              <div
                key={index}
                className="flex flex-col items-center group cursor-pointer p-2"
              >
              <div className="relative xl:w-[230px] xl:h-[230px] rounded-full overflow-hidden border-4 circle-border transition-all duration-300 mx-auto">
                <img
                  src={category.img}
                  alt={category.name}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
                <p className="mt-4 text-dark text-20px  text-center">
                  {category.name}
                  <span className="theme-border-block w-[20px] mx-auto"></span>
                </p>
              </div>
            ))}
          </Slider>
        </Row>

        {/* Custom Dots */}
        <div className="flex justify-center mt-[35px] sm:mt-[65px] space-x-[5px]">
          {categories.slice(0, 4).map((_, i) => (
            <button
              key={i}
              onClick={() => sliderRef.current.slickGoTo(i)}
              className={`transition-all duration-300 ${
                currentSlide === i
                  ? "w-[40px] h-[10px] rounded-full bg-color"
                  : "w-[10px] h-[10px] rounded-full bg-[#D2AF9F]"
              }`}
            ></button>
          ))}
        </div>
      {/* </div> */}
    {/* </div> */}
    </Section>
  );
};

export default CategoriesSection;
