import React, { useState, useEffect } from 'react';

// Import your local images as modules
import shararaPairImage from '../assets/Sharara Pair.png';
import chaniyaCholiImage from '../assets/Chaniya Choli.png';
import mojariImage from '../assets/Mojari.png';

// Local images
import FlowerIcon from "../components/icons/FlowerIcon";  

const recommendedItems = [
  { name: 'Sharara Pair', category: 'Latest trendy Clothes', image: shararaPairImage },
  { name: 'Chaniya Choli', category: 'Latest Traditional clothes', image: chaniyaCholiImage },
  { name: 'Mojari', category: 'Latest trendy Mojari', image: mojariImage },
];

const RecommendedSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(window.innerWidth < 768 ? 1 : 3);

  // Update on window resize for responsiveness
  useEffect(() => {
    const handleResize = () => {
      setItemsPerPage(window.innerWidth < 768 ? 1 : 3);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % recommendedItems.length);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + recommendedItems.length) % recommendedItems.length);
  };

  // Get items to display based on currentIndex
  const getDisplayItems = () => {
    const items = [];
    if (recommendedItems.length <= itemsPerPage) {
      return recommendedItems;
    }
    for (let i = 0; i < itemsPerPage; i++) {
      items.push(recommendedItems[(currentIndex + i) % recommendedItems.length]);
    }
    return items;
  };

  const displayItems = getDisplayItems();

  return (
    <div className="max-w-[1440px] mx-auto w-full py-16 px-4 sm:px-6 lg:px-8">

{/* Title Section */}
        <div className="relative flex justify-center items-center w-full">
          {/* Left line */}
          <div className="w-[50px] border-t border-black"></div>

          {/* Center container for title + icon */}
          <div className="relative mx-4 flex flex-col items-center justify-center h-48">
            {/* Title */}
            <h2 className="font-h2 text-2xl sm:text-3xl text-black whitespace-nowrap relative z-10">
              Recommended For You
            </h2>

            {/* Decorative SVG icon fully visible, centered */}
            <FlowerIcon className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[110px] h-[80px]  pointer-events-none z-0" />
          </div>

          {/* Right line */}
          <div className="w-[50px] border-t border-black"></div>
        </div>
      {/* Slider Container */}
      <div className="relative flex items-center justify-center">
        {/* Previous Button */}
        <button
          onClick={goToPrevious}
          className="absolute left-0 z-30 flex items-center justify-center w-10 h-10 rounded-full bg-white text-gray-800 text-2xl font-bold transition-colors hover:text-pink-500"
          style={{
            boxShadow: '0px 0px 4px rgba(0,0,0,0.25)',
          }}
        >
          &lt;
        </button>

        {/* Product Cards */}
        <div className="flex gap-6 justify-center w-full px-10">
          {displayItems.map((item, index) => (
            <div
              key={index}
              className="w-full sm:w-1/2 md:w-1/3 px-2 transition-transform duration-300"
            >
              <ProductCard item={item} />
            </div>
          ))}
        </div>

        {/* Next Button */}
        <button
          onClick={goToNext}
          className="absolute right-0 z-30 flex items-center justify-center w-10 h-10 rounded-full bg-white text-gray-800 text-2xl font-bold transition-colors hover:text-pink-500"
          style={{
            boxShadow: '0px 0px 4px rgba(0,0,0,0.25)',
          }}
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

const ProductCard = ({ item }) => {
  return (
    <div className="relative shadow-lg overflow-hidden transition-transform duration-300">
      <div className="relative w-full aspect-[3/4]">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
        />
        <div
          className="absolute inset-0 bg-black opacity-30"
          style={{ mixBlendMode: 'luminosity' }}
        ></div>
      </div>
      <div className="absolute inset-0 flex justify-center items-center">
        <img src={item.image} alt={item.name} className="w-[90%] h-[92%] object-cover" />
      </div>
      <div className="absolute bottom-4 left-4 text-white z-20">
        <h3 className="font-h2 text-xl sm:text-2xl">{item.name}</h3>
        <p className="font-sans font-medium text-sm sm:text-base">{item.category}</p>
      </div>
    </div>
  );
};

export default RecommendedSection;
