// D:\mycara\frontend\src\components\home\FeaturedProducts.jsx
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Slider from "react-slick";

// ✅ Importing custom components
import SectionHeading from "../ui/SectionHeading";
import Row from "../ui/Row";
import ShoppingBagIcon from "../icons/ShoppingBagIcon";
import HeartIcon from "../icons/HeartIcon";
import ArrowleftIcon from "../icons/ArrowleftIcon";
import ArrowRightIcon from "../icons/ArrowRightIcon";

// ✅ Slick carousel styles
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// ✅ Thunks
import { fetchCategories } from "../../features/categories/categoriesThunk";
import { fetchProducts } from "../../features/products/productsThunk";
import { getImageUrl } from "../utils/helper";

const FeaturedProducts = () => {
   const dispatch = useDispatch();
  const navigate = useNavigate();
  const sliderRef = useRef();

  // Redux data
  const { items: categories = [], loading: catLoading } = useSelector(
    (state) => state.categories || {}
  );
  const { products = [], loading: productLoading } = useSelector(
    (state) => state.products || {}
  );

  // Local states
  const [mounted, setMounted] = useState(false);
  const [slidesToShow, setSlidesToShow] = useState(9);
  const [showArrows, setShowArrows] = useState(true);
  const [activeCategory, setActiveCategory] = useState("");

  // ✅ Fetch categories and products
  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchProducts());
  }, [dispatch]);

  // ✅ Automatically set first category as active when categories load
  useEffect(() => {
    if (categories.length > 0 && !activeCategory) {
      setActiveCategory(categories[0]._id);
    }
  }, [categories, activeCategory]);

  // ✅ Responsive settings
  const updateSlider = () => {
    const width = window.innerWidth;
    if (width >= 1024) {
      setSlidesToShow(9);
      setShowArrows(false);
    } else if (width >= 768) {
      setSlidesToShow(4);
      setShowArrows(true);
    } else {
      setSlidesToShow(3);
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

  // ✅ Slider settings
const settings = { 
  slidesToShow: 9,
  slidesToScroll: 1,
  autoplay: true,
  speed: 5000,
  cssEase: "linear",
  autoplaySpeed: 0,
  initialSlide: 1,
  dots: false,
  infinite: true,
  arrows: false, 
   responsive: [
            {
                breakpoint: 1440,
                settings: { slidesToShow: 6, }
            },
            {
                breakpoint: 1170,
                settings: { slidesToShow: 5, }
            },
            {
                breakpoint: 767,
                settings: { slidesToShow: 3, }
            }
        ] 
};

  // ✅ Handle category selection
  const handleCategorySelect = (category) => {
    setActiveCategory(category._id);
  };

  // ✅ Filter products by selected category
  const filteredProducts =
    activeCategory && products.length > 0
      ? products.filter((p) => {
          const categoryId =
            typeof p.category === "string"
              ? p.category
              : p.category?._id || "";
          return categoryId === activeCategory;
        })
      : [];

  return (
    <section className="w-full py-[25px] md:py-[50px]">
      <div className="flex flex-col items-center">
        {/* Section Heading */}
        <Row>
          <SectionHeading page="Home" order={4} />
        </Row>

        {/* Category Section */}
        <Row className="relative mb-5 ">
          {showArrows && (
            <>
              <button
                className="absolute top-1/2 -translate-y-1/2 -left-[15px] z-20 w-[10px]  flex items-center justify-center"
                onClick={() => sliderRef.current?.slickPrev()}
              >
                <ArrowleftIcon className="text-black" />
              </button>

              <button
                className="absolute top-1/2 -translate-y-1/2 -right-[15px] z-20 w-[10px] flex items-center justify-center"
                onClick={() => sliderRef.current?.slickNext()}
              >
                <ArrowRightIcon className="text-black" />
              </button>
            </>
          )}

          {/* Category List */}
          {catLoading ? (
            <p>Loading categories...</p>
          ) : Array.isArray(categories) && categories.length > 0 ? (
            <Slider ref={sliderRef} {...settings}>
              {categories.map((cat) => (
                <div key={cat._id} className="px-[5px]">
                  <button
                    onClick={() => handleCategorySelect(cat)}
                    className={` rounded-[30px] flex items-center justify-center 
                      w-full h-[22px] md:h-[38px] text-center transition
                      ${
                        activeCategory === cat._id
                          ? "bg-color text-white"
                          : "text-black "
                      }`}
                    style={{
                      boxShadow: "inset 0 0 5px 1px rgba(0, 0, 0, 0.25)",
                    }}
                  >
                    <p className="text-[12px] md:text-[16px] font-medium">
                      {cat.name}
                    </p>
                  </button>

                </div>
              ))}
            </Slider>
          ) : (
            <p>No categories available.</p>
          )}
        </Row>

        {/* Products Grid */}
            <Row className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4  gap-[14px] lg:gap-[30px] lg:px-0 sm:px-2 mt-6">
              {productLoading ? (
                <p>Loading products...</p>
              ) : Array.isArray(filteredProducts) && filteredProducts.length > 0 ? (
                filteredProducts.map((p, index) => (
                  
              <Link to={`/products/${p._id}`} key={index} className="relative  overflow-hidden transform transition-transform  cursor-pointer" >
                <div className="relative group ">
                  <img
                    src={getImageUrl(p.images)}
                    alt={p.name}
                    className="w-full h-[227px] md:h-[227px] lg:h-[355px] transform transition-transform duration-300 hover:scale-105"
                  />

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


                <div className="absolute inset-3 bg-[rgba(12,11,11,0.3)] border border-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <p className="text-white font-medium text-center">
                    View product  
                  </p>
                </div>
              </div>

              <div className="pt-[10px] text-center">
                  <p className="text-black text-[12px] md:text-[15px]  mb-1">
                    {p.name}
                  </p>
                  <p className="text-black text-[12px] md:text-[15px] lg:text-[15px] font-regular mb-1">
                    Rs {p.variants?.[0]?.price ?? 'N/A'}
                    <span className="line-through text-[#BCBCBC] text-[10px] md:text-[12px] lg:text-[12px] font-regular">
                      {p.oldPrice}
                    </span>
                  </p>
                  <p className="mx-auto w-[60px] h-[19px] flex justify-center items-center text-theme text-[10px] lg:text-[12px] font-regular rounded">
                   {p.discount}
                 </p>
                <div className="flex gap-[5px] mt-2 justify-center">
                  {p.variants?.map((variant, vi) =>
                    variant.color?.map((clr, ci) => (
                      <span
                        key={`${vi}-${ci}`}
                        className="w-4 h-4 rounded-full border border-gray-300"
                        title={clr.name}
                        style={{ backgroundColor: clr.code }}
                      ></span>
                    ))
                    
                  )}
                  
                </div>
                </div>
              </Link>
            ))
          ) : (
            <p>No products available.</p>
          )}
        </Row>
      </div>
    </section>
  );
};

export default FeaturedProducts;
  