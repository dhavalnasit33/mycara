import React, { useState, useEffect } from 'react';

// Import your local images
import shararaPairImage from '../../assets/Sharara Pair.png';
import chaniyaCholiImage from '../../assets/Chaniya Choli.png';
import mojariImage from '../../assets/Mojari.png';
import SectionHeading from '../ui/SectionHeading';
import Row from '../ui/Row.jsx';


const recommendedItems = [
  { name: 'Sharara Pair', category: 'Latest trendy Clothes', image: shararaPairImage },
  { name: 'Chaniya Choli', category: 'Latest Traditional clothes', image: chaniyaCholiImage },
  { name: 'Mojari', category: 'Latest trendy Mojari', image: mojariImage },
];

const RecommendedSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(getItemsPerPage());

  // Determine items per page based on screen width
  function getItemsPerPage() {
    if (window.innerWidth < 1024) return 1; // Mobile + Tablet
    return 3; // Desktop
  }

  // Update on window resize
  useEffect(() => {
    const handleResize = () => {
      setItemsPerPage(getItemsPerPage());
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + itemsPerPage) % recommendedItems.length);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      (prevIndex - itemsPerPage + recommendedItems.length) % recommendedItems.length
    );
  };

  // Get items to display
  const getDisplayItems = () => {
    const items = [];
    for (let i = 0; i < Math.min(itemsPerPage, recommendedItems.length); i++) {
      items.push(recommendedItems[(currentIndex + i) % recommendedItems.length]);
    }
    return items;
  };

  const displayItems = getDisplayItems();

  return (
    <div className=" ">
       <section className="w-full py-[25px] md:py-[50px] ">
      {/* Title Section */}
     <div className="relative flex justify-center items-center w-full">
               <div className="relative flex justify-center items-center w-full">
                 <Row>
                   <SectionHeading title="Recommended For You" />
                 </Row>
               </div>
             </div>

      {/* Slider Container */}
      <Row className="relative !max-w-[1179px] flex items-center justify-center ">
        {/* Previous Button */}
        <button
          onClick={goToPrevious}
          className="absolute left-0 z-30 flex items-center justify-center w-[26px] h-[26px] lg:w-[40px] lg:h-[40px] rounded-full bg-white text-gray-800 text-2xl font-bold transition-colors"
          style={{ boxShadow: '0px 0px 4px rgba(0,0,0,0.25)' }}
        >
          &lt;
        </button>

        {/* Product Cards */}
        <div className="flex gap-6 justify-center w-full px-4 sm:px-10 lg:px-20 overflow-hidden">

          {displayItems.map((item, index) => (
            <div
              key={index}
              className={`flex-shrink-0 w-full ${itemsPerPage === 3 ? 'md:w-1/3' : 'w-full'}`}
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
      </section>
    </div>
  );
};

const ProductCard = ({ item }) => {
  return (
    <div className="relative shadow-lg overflow-hidden transition-transform duration-300">
      <div className="relative w-full h-[398px] lg:w-[342px] lg:h-[398px]">
        <img src={item.image} alt={item.name} className="w-full h-full " />
        <div className="absolute inset-0 bg-black opacity-30" style={{ mixBlendMode: 'luminosity' }}></div>
      </div>
      <div className="absolute inset-0 flex justify-center items-center">
        <img src={item.image} alt={item.name} className="w-[90%] h-[92%] object-cover" />
      </div>
      <div className="absolute bottom-8 left-6 text-white z-20">
        <h2 className="font-h5">{item.name}</h2>
        <p className="font-sans font-medium text-[16px]">{item.category}</p>
      </div>
    </div>
  );
};

export default RecommendedSection;
