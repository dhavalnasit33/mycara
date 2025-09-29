// src/components/ShopBanner.jsx

import React from 'react';

import shopBannerImage from '../assets/shopBannerImage.jpg'; 


const ShopBanner = () => {
    return (
        <div className="relative w-full h-[413px] flex items-center justify-center overflow-hidden">
            
           
            <div 
                className="absolute inset-0"
                style={{
                    backgroundImage: `url(${shopBannerImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            ></div>

        
            <div 
                className="absolute inset-0"
                style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.7)', 
                }}
            ></div>
            
           
            <h1 
                className="relative z-10 text-white font-semibold font-inter text-6xl md:text-[60px]"
 
            >
                Shop
            </h1>

        </div>
    );
};

export default ShopBanner;