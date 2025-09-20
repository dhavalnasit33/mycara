import React from 'react';
import herobannerImage from '../assets/herobanner.png'; // Corrected path: ../ goes up one directory

const HeroBanner = () => {
  return (
    <div className="flex flex-col md:flex-row justify-center items-center bg-red-50 py-10 px-5 md:px-20 font-sans">
      <div className="relative flex-1 mb-10 md:mb-0">
        <div className="absolute top-5 left-5 bg-pink-500 text-white font-bold p-2 md:p-4 rounded-full w-20 h-20 md:w-24 md:h-24 flex justify-center items-center transform -rotate-12 shadow-md text-center text-sm md:text-base">
          50% off
        </div>
        <img
          src={herobannerImage}
          alt="Stylish woman in a trench coat and hat"
          className="w-full max-w-sm md:max-w-xl mx-auto md:mx-0 filter blur-sm"
        />
      </div>
      <div className="flex-1 text-center md:text-left md:pl-20">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2 relative">
          Flesh Deals
          <span className="absolute bottom-[-5px] left-1/2 md:left-0 transform -translate-x-1/2 md:translate-x-0 w-12 h-1 bg-pink-500"></span>
        </h2>
        <p className="text-base md:text-lg text-gray-600 mb-4">Stylish Regular Fit Light Marun Denim For Women's & Girls</p>
        <p className="text-2xl font-bold text-gray-800 mb-6 inline-block pb-1 border-b-2 border-gray-300">
          Rs 1099.00
        </p>
        <div>
          <button className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-8 rounded-lg uppercase shadow-lg transition-colors">
            Shop Now !
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;