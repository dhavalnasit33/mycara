// D:\mycara\frontend\src\components\shop\ProductGrid.js
import React, { useState } from 'react'; 

import shopsaree3 from '../../assets/shopsaree3.jpg';
import shopsaree4 from '../../assets/shopsaree4.jpg';
import shopsaree5 from '../../assets/shopsaree5.jpg';
import shopsaree6 from '../../assets/shopsaree6.jpg';
import shopsaree7 from '../../assets/shopsaree7.jpg';
import shopsaree8 from '../../assets/shopsaree8.jpg';
import shopsaree9 from '../../assets/shopsaree9.jpg';
import shopsaree10 from '../../assets/shopsaree10.jpg';
import shopsaree11 from '../../assets/shopsaree11.jpg';
import shopsaree12 from '../../assets/shopsaree12.jpg';
import shopsaree13 from '../../assets/shopsaree13.jpg';
import shopsaree14 from '../../assets/shopsaree14.jpg';
// assets
import ShoppingBagIcon from "../icons/ShoppingBagIcon";
import HeartIcon from "../icons/HeartIcon";

const products = [
    {
        id: 1,
        brand: "Phataakaa",
        name: "Women Plain Tar Work Fancy Saree",
        price: "₹1,137",
        originalPrice: "₹4,575",
        discount: "75%",
        // સ્લાઇડર માટેની ઇમેજીસ
        image: shopsaree3, 
        allImages: [shopsaree3, shopsaree4, shopsaree5], 
        colorOptions: ['bg-[#A51414]', 'bg-[#458754]'],
        expressShipping: true,
        isSale: false
    },
    // ... બાકીના products ડેટાને અહીં જ રાખો
    {
        id: 2,
        brand: "Zillika",
        name: "Women Georgette Floral Black an...",
        price: "₹1,137",
        originalPrice: "₹4,575",
        discount: "75%",
        image: shopsaree4,
        colorOptions: ['bg-[#16D5FF]', 'bg-[#E45BE7]', 'bg-[#ECF01D]'],
        expressShipping: false,
        isSale: true 
    },
    // ... બાકીના બધા products ડેટા (id 3 થી 12 સુધી) અહીં આવશે.
    {
        id: 3,
        brand: "Gajara Gang",
        name: "Women Plain Tar Work Fancy Saree",
        price: "₹1,137",
        originalPrice: "₹4,575",
        discount: "75%",
        image: shopsaree5,
        colorOptions: ['bg-[#A51414]', 'bg-[#458754]'],
        expressShipping: true,
        isSale: false
    },
    {
        id: 4,
        brand: "Phataakaa",
        name: "Women Plain Tar Work Fancy Saree",
        price: "₹1,137",
        originalPrice: "₹4,575",
        discount: "75%",
        image: shopsaree6,
        colorOptions: ['bg-[#A51414]', 'bg-[#458754]'],
        expressShipping: true,
        isSale: false
    },
    {
        id: 5, 
        brand: "Gajara Gang",
        name: "Women Plain Tar Work Fancy Saree",
        price: "₹1,137",
        originalPrice: "₹4,575",
        discount: "75%",
        image: shopsaree7, 
        colorOptions: ['bg-[#A51414]', 'bg-[#458754]'],
        expressShipping: false, 
        isSale: true 
    },
    {
        id: 6,
        brand: "Gajara Gang",
        name: "Women Plain Tar Work Fancy Saree",
        price: "₹1,137",
        originalPrice: "₹4,575",
        discount: "75%",
        image: shopsaree8,
        colorOptions: ['bg-[#16D5FF]', 'bg-[#E45BE7]', 'bg-[#ECF01D]'],
        expressShipping: true,
        isSale: false
    },
    {
        id: 7,
        brand: "Phataakaa",
        name: "Women Plain Tar Work Fancy Saree",
        price: "₹1,137",
        originalPrice: "₹4,575",
        discount: "75%",
        image: shopsaree9,
        colorOptions: ['bg-[#A51414]', 'bg-[#458754]'],
        expressShipping: true,
        isSale: false
    },
    {
        id: 8, 
        brand: "Gajara Gang",
        name: "Women Plain Tar Work Fancy Saree",
        price: "₹1,137",
        originalPrice: "₹4,575",
        discount: "75%",
        image: shopsaree10, 
        colorOptions: ['bg-[#A51414]', 'bg-[#458754]'],
        expressShipping: false, 
        isSale: false 
    },
    {
        id: 9,
        brand: "Gajara Gang",
        name: "Women Plain Tar Work Fancy Saree",
        price: "₹1,137",
        originalPrice: "₹4,575",
        discount: "75%",
        image: shopsaree11,
        colorOptions: ['bg-[#A51414]', 'bg-[#458754]'],
        expressShipping: true,
        isSale: false
    },
    {
        id: 10,
        brand: "Phataakaa",
        name: "Women Plain Tar Work Fancy Saree",
        price: "₹1,137",
        originalPrice: "₹4,575",
        discount: "75%",
        image: shopsaree12,
        colorOptions: ['bg-[#A51414]', 'bg-[#458754]'],
        expressShipping: true,
        isSale: false
    },
    {
        id: 11, 
        brand: "Gajara Gang",
        name: "Women Plain Tar Work Fancy Saree",
        price: "₹1,137",
        originalPrice: "₹4,575",
        discount: "75%",
        image: shopsaree13, 
        colorOptions: ['bg-[#16D5FF]', 'bg-[#E45BE7]', 'bg-[#ECF01D]'],
        expressShipping: false, 
        isSale: true 
    },
    {
        id: 12,
        brand: "Gajara Gang",
        name: "Women Plain Tar Work Fancy Saree",
        price: "₹1,137",
        originalPrice: "₹4,575",
        discount: "75%",
        image: shopsaree14,
        colorOptions: ['bg-[#A51414]', 'bg-[#458754]'],
        expressShipping: false,
        isSale: false
    },
];

// --- Product Card Component ---
const ProductCard = ({ product }) => {
    // 🚀 સ્ટેટ અને લોજિકને કમ્પોનન્ટની અંદર મૂકો 🚀
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const isSlider = product.id === 1 && product.allImages && product.allImages.length > 1;

    const handleDotClick = (index) => {
        setCurrentImageIndex(index);
    };
    
    // ઇમેજ સોર્સ લોજિક
    const displayedImage = isSlider 
        ? product.allImages[currentImageIndex] 
        : product.image;

    return (
        // Card container: removed max-w-sm to allow grid to control width
        <div className="group w-full bg-white border border-gray-100 shadow-md transition duration-300 ease-in-out hover:shadow-xl cursor-pointer overflow-hidden">
            
            {/* --- Image Section --- */}
            <div className="relative">
                {/* 1. displayedImage નો ઉપયોગ કરીને ઇમેજ સોર્સ બદલો */}
                <img 
                    className="w-full object-cover aspect-[4/5] min-h-[227px] sm:min-h-[300px] lg:min-h-[350px] transition duration-300" 
                    src={displayedImage} 
                    alt={product.name} 
                />
                
                {/* Icons (Icons are now fixed and don't rely on complex hover logic) */}
                <div className="absolute top-3 right-3 flex flex-col space-y-2">
    {/*  Heart Icon */}
                <div className="absolute top-2 right-2 opacity-100  duration-300 z-10">
                 <button className="w-[20px] h-[20px] md:w-[20px] md:h-[20px] lg:w-[40px] lg:h-[40px] flex items-center justify-center bg-white text-black rounded-full border ">
                    <HeartIcon className="w-[12px] h-[12px] sm:w-[12px] sm:h-[12px] lg:w-[26px] lg:h-[24px] text-black" />
                  </button>
                </div>


                {/*  Shopping Bag Icon */}
                <div className="absolute top-[38px]  lg:top-[60px] right-2 opacity-100 duration-300 z-10">
                  <button className="w-[20px] h-[20px] md:w-[20px] md:h-[20px] lg:w-[40px] lg:h-[40px] flex items-center justify-center bg-white text-black rounded-full border ">
                    <ShoppingBagIcon className="w-[12px] h-[12px] sm:w-[12px] sm:h-[12px] lg:w-[26px] lg:h-[24px] text-black" />
                  </button>
                </div>
                </div>
                
                {/* 2. Product Dots (Slider Controls) */}
                {isSlider && (
                    <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-1 p-1 bg-black/20 rounded-full">
                        {product.allImages.map((_, index) => (
                            <div 
                                key={index}
                                className={`w-1.5 h-1.5 rounded-full cursor-pointer transition-colors duration-300 
                                    ${index === currentImageIndex ? 'bg-white' : 'bg-gray-400'}`}
                                // 3. Dot Click Handler
                                onClick={() => handleDotClick(index)}
                            ></div>
                        ))}
                    </div>
                )}
            </div> 

            {/* --- Product Details Section --- */}
            <div className="p-4">
                {product.expressShipping && (
                    <div className="mb-2 inline-block text-theme theme-bg-light text-[12px] sm:text-[14px] font-regular font-sans px-2 py-0.5 rounded-sm">
                        Express Shipping
                    </div>
                )}

                {product.isSale && ( 
                    <div className="mb-2 inline-block text-theme theme-bg-light text-[12px] sm:text-[14px] font-regular font-sans px-2 py-0.5 rounded-sm">
                        Sale
                    </div>
                )}     

                {/* Brand Name */}
                <h3 className="text-[14px] sm:text-[16px] font-regular font-sans text-black truncate py-0 sm:py-0.5">
                    {product.brand}
                </h3>
                
                {/* Product Name */}
                <p className="text-[12px] sm:text-[14px] text-[#989696] font-regular font-sans truncate py-0 sm:py-0.5">
                    {product.name}
                </p>

                {/* Pricing */}
                <div className="flex items-center space-x-2 mb-1 sm:mb-2 py-0.5">
                    <span className="text-[12px] sm:text-[16px] font-regular font-sans text-black py-0 sm:py-0.5">
                        {product.price}
                    </span>
                    <span className="text-[12px] sm:text-[14px] text-[#BCBCBC] line-through font-regular font-sans py-0 sm:py-0.5">
                        {product.originalPrice}
                    </span>
                    <span className="text-[12px] sm:text-[16px] font-regular font-sans text-theme">
                        {product.discount}
                    </span>
                </div>

                {/* Color Options */}
                <div className="flex space-x-1">
                    {product.colorOptions.map((colorClass, index) => (
                        <div 
                            key={index}
                            className={`w-[10px] h-[10px] sm:w-[16px] sm:h-[16px] ${colorClass} rounded-full border border-gray-200 cursor-pointer`}
                        ></div>
                    ))}
                </div>
            </div>
        </div>
    );
};

// --- Main Grid Component ---
const ProductGrid  = () => {
    return (
        <div className="py-10 ">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 md:gap-3 lg:gap-6 w-full mx-auto"> {/* px-4 for side spacing */}
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
                {/* --- Load More Button Section --- */}
                <div className="flex justify-center mt-10 ">
                    <button
                        className="text-[18px] theme-border font-inter text-theme w-[187px] h-[70px] sm:w-[220px] sm:h-[89px] font-medium rounded-[10px] shadow-lg transition duration-300 uppercase"
                        style={{
                            boxShadow: "inset 0px 0px 30px rgba(244, 50, 151, 0.25)",
                        }}
                    >
                        Load More
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductGrid;