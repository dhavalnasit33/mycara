//D:\mycara\frontend\src\components\home\RecommendedSection.jsx


import React, { useState, useEffect, useCallback } from "react";
import SectionHeading from "../ui/SectionHeading";
import Row from "../ui/Row.jsx";
import Section from "../ui/Section.jsx";
import axios from "axios";

const IMAGE_BASE_URL = "http://localhost:5000";
const ALL_PRODUCTS_API = `${IMAGE_BASE_URL}/api/products`;



const RecommendedSection = () => {
  const [recommendedData, setRecommendedData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);

  // ✅ Responsive items per page
  const getItemsPerPage = useCallback(() => {
    return window.innerWidth < 1024 ? 1 : 3;
  }, []);

  // ✅ Fetch & filter products
useEffect(() => {
  const fetchAndFilterProducts = async () => {
    try {
      const response = await axios.get(ALL_PRODUCTS_API);

      const allProducts = response?.data?.data?.products || [];

      const uniqueProducts = [];
      const seen = new Set();

      allProducts.forEach((p) => {
        if (!seen.has(p._id)) {
          seen.add(p._id);
          const uniqueImages = [...new Set(p.images)];
          uniqueProducts.push({ ...p, images: uniqueImages });
        }
      });

      setRecommendedData(uniqueProducts);
    } catch (error) {
      console.error("❌ Error fetching products:", error);
      setRecommendedData([]);
    }
  };

  fetchAndFilterProducts();
}, []);


  // ✅ Handle resize for responsiveness
  useEffect(() => {
    const handleResize = () => setItemsPerPage(getItemsPerPage());
    setItemsPerPage(getItemsPerPage());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [getItemsPerPage]);

  const goToNext = useCallback(() => {
    if (!recommendedData.length) return;
    setCurrentIndex(
      (prev) => (prev + itemsPerPage) % (recommendedData.length * 2)
    );
  }, [itemsPerPage, recommendedData.length]);

  const goToPrevious = useCallback(() => {
    if (!recommendedData.length) return;
    const doubledLength = recommendedData.length * 2;
    setCurrentIndex(
      (prev) => (prev - itemsPerPage + doubledLength) % doubledLength
    );
  }, [itemsPerPage, recommendedData.length]);

  const getDisplayItems = useCallback(() => {
    const doubledData = [...recommendedData, ...recommendedData];
    const effectiveLength = doubledData.length;

    const items = [];
    for (let i = 0; i < Math.min(itemsPerPage, effectiveLength); i++) {
      items.push(doubledData[(currentIndex + i) % effectiveLength]);
    }
    return items;
  }, [currentIndex, itemsPerPage, recommendedData]);

  const displayItems = getDisplayItems();

  if (recommendedData.length === 0) return null;

  return (
    <div>
      <Section className="w-full py-[25px] md:py-[50px]">
        <Row>
          <SectionHeading page="Home" order={8} />
        </Row>

        <Row className="relative !max-w-[1179px] flex items-center justify-center mb-[50px] md:mb-[90px]">
          {/* Left Arrow */}
          <button
            onClick={goToPrevious}
            className="absolute left-0 z-30 flex items-center justify-center w-[26px] h-[26px] lg:w-[40px] lg:h-[40px] rounded-full bg-white text-gray-800 text-2xl font-bold"
            style={{ boxShadow: "0px 0px 4px rgba(0,0,0,0.25)" }}
            aria-label="Previous"
          >
            &lt;
          </button>

          {/* Product Cards */}
          <div className="flex gap-6 justify-center w-full px-10 sm:px-10 lg:px-20 overflow-hidden">
            {displayItems.map((item) => (
              <div
                key={item._id}
                className={`flex-shrink-0 w-full ${
                  itemsPerPage === 3 ? "md:w-1/3" : "w-full"
                }`}
              >
                <ProductCard item={item} />
              </div>
            ))}
          </div>

          {/* Right Arrow */}
          <button
            onClick={goToNext}
            className="absolute right-0 z-30 flex items-center justify-center w-[26px] h-[26px] lg:w-[40px] lg:h-[40px] rounded-full bg-white text-gray-800 text-2xl font-bold"
            style={{ boxShadow: "0px 0px 4px rgba(0,0,0,0.25)" }}
            aria-label="Next"
          >
            &gt;
          </button>
        </Row>
      </Section>
    </div>
  );
};

//  ProductCard (double image: blur background + inner main image)
const ProductCard = ({ item }) => {
  const imageUrlPath = item?.images?.[0];
  const imageUrl = imageUrlPath
    ? `${IMAGE_BASE_URL}${imageUrlPath}`
    : "placeholder.png";

  const title = item?.category.name || "Recommended Item";
  const description = item?.description || "No description available";

  const backgroundColor = "#a0522d";

  return (
    <div className="relative w-full lg:w-[342px] lg:h-[398px] h-[398px] overflow-hidden shadow-lg">
      {/* 🔹 Background blurred image */}
       <div className="absolute inset-0 w-full h-full">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover filter grayscale brightness-35 contrast-125 "
          // style={{
          //   filter: "brightness(70%) contrast(120%) saturate(120%)",
          //   mixBlendMode: "luminosity",
          // }}
        />
      </div>

      {/* 🔹 Foreground centered main image */}
      <div className="absolute inset-0 flex items-center justify-center">
        <img
          src={imageUrl}
          alt={title}
          className="w-[301px] h-[361px] object-cover  transition-transform duration-1000 group-hover:scale-105"
        />
      </div>

      {/* 🔹 Text Info */}
      <div className="absolute bottom-8 left-6 text-white z-20">
        <h2 className="font-h5 leading">{title}</h2>
        <p className="font-sans font-medium text-[16px]">{description}</p>
      </div>
    </div>
  );
};

export default RecommendedSection;
