// D:\mycara\frontend\src\components\home\RecommendedSection.jsx

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPages } from "../../features/pages/pagesThunk";
import SectionHeading from "../ui/SectionHeading";
import Row from "../ui/Row.jsx";
import Section from "../ui/Section.jsx";


const IMAGE_BASE_URL = "http://localhost:5000";

const RecommendedSection = () => {
  const dispatch = useDispatch();

  const homePageSections = useSelector((state) => state.pages?.homePageSections || []);

  useEffect(() => {
    if (!homePageSections.length) {
      dispatch(fetchPages());
    }
  }, [dispatch, homePageSections.length]);

 
const recommendedData = (homePageSections || [])
  .filter(
    (section) =>
  
      section.type === "content" && 
      
      (section.order === 4 || section.order === 5 || section.order === 6)
  )
  .sort((a, b) => a.order - b.order);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(() => getItemsPerPage());

  
  function getItemsPerPage() {
    return window.innerWidth < 1024 ? 1 : 3;
  }

 
  useEffect(() => {
    const handleResize = () => setItemsPerPage(getItemsPerPage());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  
  const goToNext = () => {
    if (!recommendedData.length) return;
    setCurrentIndex((prev) => (prev + itemsPerPage) % recommendedData.length);
  };

  const goToPrevious = () => {
    if (!recommendedData.length) return;
    setCurrentIndex(
      (prev) => (prev - itemsPerPage + recommendedData.length) % recommendedData.length
    );
  };

  
  const getDisplayItems = () => {
    const items = [];
    for (let i = 0; i < Math.min(itemsPerPage, recommendedData.length); i++) {
      items.push(recommendedData[(currentIndex + i) % recommendedData.length]);
    }
    return items;
  };

  const displayItems = getDisplayItems();

  if (recommendedData.length === 0) return null;

  return (
// <<<<<<< HEAD
//     <div>
//       <Section className="w-full py-[25px] md:py-[50px]">
// =======
    <div className=" mb-[25px] md:mb-[50px]">
      <Section className="w-full py-[25px] md:py-[50px] ">

        <Row>
          
          <SectionHeading page="Home" order={8} />
        </Row>

        <Row className="relative !max-w-[1179px] flex items-center justify-center">
         
          <button
            onClick={goToPrevious}
            className="absolute left-0 z-30 flex items-center justify-center w-[26px] h-[26px] lg:w-[40px] lg:h-[40px] rounded-full bg-white text-gray-800 text-2xl font-bold"
            style={{ boxShadow: "0px 0px 4px rgba(0,0,0,0.25)" }}
          >
            &lt;
          </button>

{/* <<<<<<< HEAD
          
          <div className="flex gap-6 justify-center w-full px-4 sm:px-10 lg:px-20 overflow-hidden">
            {displayItems.map((item, index) => (
              <div
                key={index}
                className={`flex-shrink-0 w-full ${
                  itemsPerPage === 3 ? "md:w-1/3" : "w-full"
                }`}
              >
                <ProductCard item={item} />
              </div>
            ))}
          </div>

          
          <button
            onClick={goToNext}
            className="absolute right-0 z-30 flex items-center justify-center w-[26px] h-[26px] lg:w-[40px] lg:h-[40px] rounded-full bg-white text-gray-800 text-2xl font-bold"
            style={{ boxShadow: "0px 0px 4px rgba(0,0,0,0.25)" }}
          >
            &gt;
          </button>
        </Row>
======= */}
        {/* Product Cards */}
        <div className="flex justify-center w-full px-[2rem]  lg:px-[3rem] overflow-hidden">

          {displayItems.map((item, index) => (
            <div
              key={index}
              className={`flex-shrink-0 w-full px-[15px] ${itemsPerPage === 3 ? 'md:w-1/3' : 'w-full'}`}
            >
              <ProductCard item={item} />
            </div>
          ))}
        </div>

        {/* Next Button */}
        <button
          onClick={goToNext}
          className="absolute right-0 z-30 flex items-center justify-center w-[26px] h-[26px] lg:w-[40px] lg:h-[40px] rounded-full bg-white text-gray-800 text-2xl font-bold transition-colors"
          style={{ boxShadow: '0px 0px 4px rgba(0,0,0,0.25)' }}
        >
          &gt;
        </button>
      </Row>

      </Section>
    </div>
  );
};


const ProductCard = ({ item }) => {
  const imageUrl = item?.image_url ? `${IMAGE_BASE_URL}${item.image_url}` : "placeholder.png";

  return (
// <<<<<<< HEAD
//     <div className="relative shadow-lg overflow-hidden transition-transform duration-300">
//       <div className="relative w-full h-[398px] lg:w-[342px] lg:h-[398px]">
//         <img src={imageUrl} alt={item?.title || "Recommended"} className="w-full h-full" />
//         <div
//           className="absolute inset-0 bg-black opacity-30"
//           style={{ mixBlendMode: "luminosity" }}
//         ></div>
// =======
    <div className="relative shadow-lg overflow-hidden transition-transform duration-300 ">
      <div className="relative w-full h-[398px] md:h-auto lg:w-[342px] lg:h-[398px]">
        <img src={item.image} alt={item.name} className="w-full h-full " />
        <div className="absolute inset-0 bg-black opacity-30" style={{ mixBlendMode: 'luminosity' }}></div>

      </div>

      <div className="absolute inset-0 flex justify-center items-center cursor-pointer">
        <img src={imageUrl} alt={item?.title || "Recommended"} className="w-[90%] h-[92%] object-cover" />
      </div>
{/* <<<<<<< HEAD

      <div className="absolute bottom-8 left-6 text-white z-20">
        <h2 className="font-h5">{item?.title || "Recommended Item"}</h2>
        <p className="font-sans font-medium text-[16px]">{item?.description || "Category"}</p>
======= */}
      <div className="absolute w-[200px] bottom-8 left-6 text-white leading-none ">
        <h2 className="font-h5 break">{item.name}</h2>
        <p className="font-medium text-[16px]">{item.category}</p>

      </div>
    </div>
  );
};

export default RecommendedSection;
