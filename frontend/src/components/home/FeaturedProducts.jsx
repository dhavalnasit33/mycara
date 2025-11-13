// D:\mycara\frontend\src\components\home\FeaturedProducts.jsx
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Slider from "react-slick";

// ✅ Custom Components
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
import { fetchDiscounts } from "../../features/discounts/discountsThunk";

// ✅ Helper
import { getImageUrl } from "../utils/helper";

const FeaturedProducts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sliderRef = useRef();

  // ✅ Redux states
  const { items: categories = [], loading: catLoading } = useSelector((state) => state.categories);
  const { products = [], loading: productLoading } = useSelector((state) => state.products);
  const { discounts = [] } = useSelector((state) => state.discounts);

  // ✅ Local states
  const [mounted, setMounted] = useState(false);
  const [slidesToShow, setSlidesToShow] = useState(9);
  const [showArrows, setShowArrows] = useState(true);
  const [activeCategory, setActiveCategory] = useState("");

  // ✅ Fetch all data on mount
  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchProducts());
    dispatch(fetchDiscounts());
  }, [dispatch]);

  // ✅ Automatically select first category from admin-added list
  useEffect(() => {
    if (categories.length > 0 && !activeCategory) {
      setActiveCategory(categories[0]._id);
    }
  }, [categories, activeCategory]);

  // ✅ Responsive updates
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

  // ✅ Slick Slider Settings
  const settings = {
    slidesToShow,
    slidesToScroll: 1,
    autoplay: true,
    speed: 5000,
    cssEase: "linear",
    autoplaySpeed: 0,
    infinite: true,
    arrows: false,
    dots: false,
    responsive: [
      { breakpoint: 1440, settings: { slidesToShow: 6 } },
      { breakpoint: 1170, settings: { slidesToShow: 5 } },
      { breakpoint: 767, settings: { slidesToShow: 3 } },
    ],
  };

  // ✅ Handle Category Click
  const handleCategorySelect = (category) => {
    setActiveCategory(category._id);
  };

  // ✅ Filter Featured Products Category-wise
  const filteredProducts =
    activeCategory && products.length > 0
      ? products.filter((p) => {
          const categoryId = typeof p.category === "string" ? p.category : p.category?._id || "";
          return (
            categoryId === activeCategory &&
            p.variants?.some((v) => v.is_featured === true)
          );
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
        <Row className="relative mb-5">
          {showArrows && (
            <>
              <button
                className="absolute top-1/2 -translate-y-1/2 -left-[15px] z-20 w-[10px]"
                onClick={() => sliderRef.current?.slickPrev()}
              >
                <ArrowleftIcon className="text-black" />
              </button>
              <button
                className="absolute top-1/2 -translate-y-1/2 -right-[15px] z-20 w-[10px]"
                onClick={() => sliderRef.current?.slickNext()}
              >
                <ArrowRightIcon className="text-black" />
              </button>
            </>
          )}

          {/* ✅ Category List from Admin Panel */}
          {catLoading ? (
            <p>Loading categories...</p>
          ) : Array.isArray(categories) && categories.length > 0 ? (
            <Slider ref={sliderRef} {...settings}>
              {categories.map((cat) => (
                <div key={cat._id} className="px-[5px]">
                  <button
                    onClick={() => handleCategorySelect(cat)}
                    className={`rounded-[30px] flex items-center justify-center 
                      w-full h-[22px] md:h-[38px] text-center transition
                      ${
                        activeCategory === cat._id
                          ? "bg-color text-white"
                          : "text-black"
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

        {/* ✅ Products Section */}
        <Row className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-[14px] lg:gap-[30px] mt-6">
          {productLoading ? (
            <p>Loading products...</p>
          ) : Array.isArray(filteredProducts) && filteredProducts.length > 0 ? (
            filteredProducts.map((p, index) => {
              const discount = discounts?.find((d) => d._id === p.discount_id);
              const originalPrice = p?.variants?.[0]?.price || 0;
              let finalPrice = originalPrice;

              if (discount) {
                if (discount.type === "percentage") {
                  finalPrice = originalPrice - (originalPrice * discount.value) / 100;
                } else {
                  finalPrice = originalPrice - discount.value;
                }
              }

              return (
                <Link
                  to={`/products/${p._id}`}
                  key={index}
                  className="relative overflow-hidden transform transition-transform cursor-pointer"
                >
                  <div className="relative group">
                    <img
                      src={getImageUrl(p.images)}
                      alt={p.name}
                      className="w-full h-[227px] md:h-[227px] lg:h-[355px] transform transition-transform duration-300 hover:scale-105"
                    />

                    {/* Wishlist Icon */}
                    <div className="absolute top-3 right-3 z-10">
                      <button className="w-[20px] h-[20px] lg:w-[40px] lg:h-[40px] flex items-center justify-center bg-white text-black rounded-full border hover:scale-110 transition">
                        <HeartIcon className="w-[12px] h-[12px] lg:w-[24px] lg:h-[24px]" />
                      </button>
                    </div>

                    {/* Shopping Bag Icon */}
                    <div className="absolute top-[40px] right-3 z-10">
                      <button className="w-[20px] h-[20px] lg:w-[40px] lg:h-[40px] flex items-center justify-center bg-white text-black rounded-full border hover:scale-110 transition">
                        <ShoppingBagIcon className="w-[12px] h-[12px] lg:w-[24px] lg:h-[24px]" />
                      </button>
                    </div>

                    {/* Hover Overlay */}
                    <div className="absolute inset-3 bg-[rgba(12,11,11,0.3)] border border-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <p className="text-white font-medium text-center">View product</p>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="pt-[10px] text-center">
                    <p className="text-black text-[12px] md:text-[15px] mb-1">{p.name}</p>
                    <p className="text-black text-[12px] md:text-[15px]">
                      Rs {Number(finalPrice).toLocaleString("en-IN", { maximumFractionDigits: 0 })}
                      {discount && (
                        <span className="line-through text-[#BCBCBC] text-[10px] md:text-[12px] ml-[5px]">
                          Rs {Number(originalPrice).toLocaleString("en-IN", { maximumFractionDigits: 0 })}
                        </span>
                      )}
                    </p>
                    {discount && (
                      <p className="text-theme text-[10px] md:text-[12px] font-medium bg-[rgba(239,58,150,0.09)] p-[1px] w-[60px] block mx-auto text-center">
                        {discount.type === "percentage"
                          ? `${discount.value}% OFF`
                          : `₹${discount.value} OFF`}
                      </p>
                    )}

                    {/* Color Dots */}
                    <div className="flex gap-[5px] mt-2 justify-center">
                      {p.variants?.map((variant, vi) =>
                        variant.color?.map((clr, ci) => (
                          <span
                            key={`${vi}-${ci}`}
                            className="w-4 h-4 rounded-full"
                            title={clr.name}
                            style={{ backgroundColor: clr.code }}
                          ></span>
                        ))
                      )}
                    </div>
                  </div>
                </Link>
              );
            })
          ) : (
            <p>No featured products available.</p>
          )}
        </Row>
      </div>
    </section>
  );
};

export default FeaturedProducts;
