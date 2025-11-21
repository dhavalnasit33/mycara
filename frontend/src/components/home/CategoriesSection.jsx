//D:\mycara\frontend\src\components\home\CategoriesSection.jsx

import React, { useState, useRef, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useSelector, useDispatch } from "react-redux";
import { fetchCategories } from "../../features/categories/categoriesThunk";
import { getImageUrl } from "../utils/helper";

const CategoriesSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const sliderRef = useRef(null);

  const dispatch = useDispatch();
  const { items: categories, loading, error } = useSelector(
    (state) => state.categories
  );

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow:
      windowWidth <= 767 ? 2 : windowWidth <= 980 ? 3 : windowWidth <= 1280 ? 4 : 5,
    slidesToScroll: 1,
    arrows: false,
    beforeChange: (_, next) => setCurrentSlide(next),
  };

  if (loading) return <p className="text-center">Loading categories...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

    const filteredCategories = categories.filter(
    (cat) => cat.section === "home"
  );
  return (
    <>
      {categories && categories.length > 0 ? (
        <>
          <Slider ref={sliderRef} {...settings}>
            {categories.map((category, index) => (
              <div
                key={category._id || index}
                className="flex flex-col items-center group cursor-pointer px-[10px] sm:px-[26.5px]"
              >
                <div className="relative w-full aspect-square rounded-full overflow-hidden border-4 circle-border duration-300">
                  <img
                    src={getImageUrl(category.image_url)}   
                    alt={category.name}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <p className="mt-4 text-dark text-center text-[20px]">
                  {category.name}
                  <span className="theme-border-block w-[20px] mx-auto"></span>
                </p>
              </div>
            ))}
          </Slider>

          <div className="flex justify-center mt-[35px] sm:mt-[65px] space-x-[5px]">
            {categories.slice(0, 8).map((_, i) => (
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
        </>
      ) : (
        <p className="text-center">No categories found</p>
      )}
    </>
  );
};

export default CategoriesSection;
