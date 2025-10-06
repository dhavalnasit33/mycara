import React from 'react';
import FlowerIcon from "../components/icons/FlowerIcon";
import earringsImg from '../assets/earrings.png';
import shoesImg from '../assets/shoes.png';
import watchImg from '../assets/watch.png';
import winterClothesImg from '../assets/winter-clothes.png';
import SectionHeading from './ui/SectionHeading';
import Row from './ui/Row.jsx';

const NewArrivals = () => {
  const newArrivalItems = [
    { name: "Earings", img: earringsImg },
    { name: "Shoes", img: shoesImg },
    { name: "Watch", img: watchImg },
    { name: "Winter Cloths", img: winterClothesImg }
  ];

  return (
    <div className="w-full bg-white font-sans overflow-x-hidden">
      <div className="flex flex-col items-center">
        
        {/* Title Section */}
        <div className="relative flex justify-center items-center w-full">
          <Row>
            <SectionHeading title=" New Arrivals" />
          </Row>
        </div>

        {/* Grid Layout Section */}
        <div className="container-1440 w-[90%] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[400px_auto_400px] gap-4 justify-items-center">

            {/* Left */}
            <div className="relative group h-[280px] w-[450px] sm:w-[100%] md:w-auto overflow-hidden">
              <img src={newArrivalItems[0].img} alt={newArrivalItems[0].name} className="w-full h-full object-cover"/>
              <div className="absolute inset-0 flex flex-col justify-start p-4 sm:p-6">
                <div className="absolute top-[40px] left-0 w-12 h-[2px] bg-black"></div>
                <div className="mt-[60px] py-5">
                  <p className="text-black text-[12px] md:text-[14px] mb-1">Shop Now &gt;</p>
                  <h3 className="text-black text-[20px] md:text-[26px] lg:text-[30px] font-semibold py-4">{newArrivalItems[0].name}</h3>
                </div>
              </div>
            </div>

            {/* Center */}
            <div className="flex flex-col gap-4 w-full items-center">
              
              <div className="relative group h-[200px] w-[450px] sm:w-[100%] overflow-hidden">
                <img src={newArrivalItems[1].img} alt={newArrivalItems[1].name} className="w-full h-full object-cover"/>
                <div className="absolute inset-0 flex flex-col justify-start p-4 sm:p-6">
                  <div className="absolute top-[40px] left-0 w-12 h-[2px] bg-white"></div>
                  <div className="mt-[60px] py-4">
                    <p className="text-white text-[12px] md:text-[14px] mb-1">Shop Now &gt;</p>
                    <h3 className="text-white text-[20px] md:text-[26px] lg:text-[30px] font-semibold py-4">{newArrivalItems[1].name}</h3>
                  </div>
                </div>
              </div>

              <div className="relative group h-[200px] w-[450px] sm:w-[100%] overflow-hidden">
                <img src={newArrivalItems[2].img} alt={newArrivalItems[2].name} className="w-full h-full object-cover"/>
                <div className="absolute inset-0 flex flex-col justify-start p-4 sm:p-6">
                  <div className="absolute top-[40px] left-0 w-12 h-[2px] bg-white"></div>
                  <div className="mt-[60px] py-4">
                    <p className="text-white text-[12px] md:text-[14px] mb-1">Shop Now &gt;</p>
                    <h3 className="text-white text-[20px] md:text-[26px] lg:text-[30px] font-semibold py-4">{newArrivalItems[2].name}</h3>
                  </div>
                </div>
              </div>
            </div>

            {/* Right */}
            <div className="relative group h-[280px] w-[450px] sm:w-[100%] md:w-auto overflow-hidden">
              <img src={newArrivalItems[3].img} alt={newArrivalItems[3].name} className="w-full h-full object-cover"/>
              <div className="absolute inset-0 flex flex-col justify-start p-4 sm:p-6">
                <div className="absolute top-[40px] left-0 w-12 h-[2px] bg-black"></div>
                <div className="mt-[60px] py-4">
                  <p className="text-black text-[12px] md:text-[14px] mb-1">Shop Now &gt;</p>
                  <h3 className="text-black text-[20px] md:text-[26px] lg:text-[30px] font-semibold py-4">{newArrivalItems[3].name}</h3>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default NewArrivals;
