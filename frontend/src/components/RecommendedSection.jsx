import React, { useState } from 'react';
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from "react-icons/io";

// Import your local images as modules
import shararaPairImage from '../assets/Sharara Pair.png';
import chaniyaCholiImage from '../assets/Chaniya Choli.png';
import mojariImage from '../assets/Mojari.png';

// Import the decorative flower image
import flowerImg from '../assets/flower.png';

const recommendedItems = [
  {
    name: 'Sharara Pair',
    category: 'Latest trendy Clothes',
    image: shararaPairImage,
  },
  {
    name: 'Chaniya Choli',
    category: 'Latest Traditional clothes',
    image: chaniyaCholiImage,
  },
  {
    name: 'Mojari',
    category: 'Latest trendy Mojari',
    image: mojariImage,
  },

];

const RecommendedSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const isMobile = window.innerWidth < 768;
  const itemsPerPage = isMobile ? 1 : 3;

  const goToNext = () => {
    setCurrentIndex((prevIndex) => {
      const nextIndex = (prevIndex + 1) % recommendedItems.length;
      return nextIndex;
    });
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = (prevIndex - 1 + recommendedItems.length) % recommendedItems.length;
      return newIndex;
    });
  };

  // Get items to display based on currentIndex
  const getDisplayItems = () => {
    const items = [];
    if (recommendedItems.length <= itemsPerPage) {
      return recommendedItems;
    }

    if (itemsPerPage === 1) {
      items.push(recommendedItems[currentIndex]);
    } else {
      for (let i = 0; i < itemsPerPage; i++) {
        items.push(recommendedItems[(currentIndex + i) % recommendedItems.length]);
      }
    }
    return items;
  };
  
  const displayItems = getDisplayItems();

  return (
    <div className="max-w-[1440px] mx-auto w-full py-16 px-4 sm:px-6 lg:px-8">
      {/* Heading */}
      <div className="flex justify-center items-center mb-10">
        <div className="w-[50px] border-t border-black"></div>
        <h2 className="relative font-h2 text-2xl sm:text-3xl mx-4 z-10 whitespace-nowrap text-gray-800">
          Recommended For You
          <img
            src={flowerImg}
            alt="Decorative flower"
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          />
        </h2>
        <div className="w-[50px] border-t border-black"></div>
      </div>

      {/* Slider Container for all screen sizes */}
      <div className="relative flex items-center justify-center">
        {/* Previous Button */}
        <button 
          onClick={goToPrevious} 
          className="absolute left-0 z-30 p-2 text-3xl text-gray-800 rounded-full transition-colors hover:text-pink-500"
          style={{
            boxShadow: '0px 0px 4px 0px rgba(0, 0, 0, 0.21), 0px 0px 4px 0px rgba(255, 255, 255, 1)'
          }}
        >
          <IoIosArrowRoundBack />
        </button>

        {/* Product Cards Container */}
        <div className="flex gap-10 overflow-hidden w-full justify-center">
          {displayItems.map((item, index) => (
            <div key={index} className="w-full sm:w-1/2 md:w-1/3 transition-transform duration-300">
              <ProductCard item={item} />
            </div>
          ))}
        </div>

        {/* Next Button */}
        <button 
          onClick={goToNext} 
          className="absolute right-0 z-30 p-2 text-3xl text-gray-800 rounded-full transition-colors hover:text-pink-500"
          style={{
            boxShadow: '0px 0px 4px 0px rgba(0, 0, 0, 0.21), 0px 0px 4px 0px rgba(255, 255, 255, 1)'
          }}
        >
          <IoIosArrowRoundForward />
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