import React from 'react';

import shopsaree3 from '../assets/shopsaree3.jpg';
import shopsaree4 from '../assets/shopsaree4.jpg';
import shopsaree5 from '../assets/shopsaree5.jpg';
import shopsaree6 from '../assets/shopsaree6.jpg';
import shopsaree7 from '../assets/shopsaree7.jpg';
import shopsaree8 from '../assets/shopsaree8.jpg';
import shopsaree9 from '../assets/shopsaree9.jpg';
import shopsaree10 from '../assets/shopsaree10.jpg';
import shopsaree11 from '../assets/shopsaree11.jpg';
import shopsaree12 from '../assets/shopsaree12.jpg';
import shopsaree13 from '../assets/shopsaree13.jpg';
import shopsaree14 from '../assets/shopsaree14.jpg';
// assets
import ShoppingBagIcon from "./icons/ShoppingBagIcon";
import HeartIcon from "./icons/HeartIcon";


const products = [
       {
        id: 1,
        brand: "Phataakaa",
        name: "Women Plain Tar Work Fancy Saree",
        price: "₹1,137",
        originalPrice: "₹4,575",
        discount: "75%",
        image: shopsaree3,
        colorOptions: ['bg-[#A51414]', 'bg-[#458754]'],
        expressShipping: true,
        isSale: false // Sale નથી
    },
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
        isSale: true // Example: Sale છે
    },
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
        id: 5, // ⭐ આ પ્રોડક્ટમાં ફેરફાર છે ⭐
        brand: "Gajara Gang",
        name: "Women Plain Tar Work Fancy Saree",
        price: "₹1,137",
        originalPrice: "₹4,575",
        discount: "75%",
        image: shopsaree7, 
        colorOptions: ['bg-[#A51414]', 'bg-[#458754]'],
        expressShipping: false, // Express Shipping નથી
        isSale: true // ⭐ અહીં 'Sale' ઉમેરવામાં આવ્યું છે ⭐
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
        id: 8, // ⭐ આ પ્રોડક્ટમાં ફેરફાર છે ⭐
        brand: "Gajara Gang",
        name: "Women Plain Tar Work Fancy Saree",
        price: "₹1,137",
        originalPrice: "₹4,575",
        discount: "75%",
        image: shopsaree10, 
        colorOptions: ['bg-[#A51414]', 'bg-[#458754]'],
        expressShipping: false, // Express Shipping નથી
        isSale: false // ⭐ અહીં 'Sale' ઉમેરવામાં આવ્યું છે ⭐
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
        id: 11, // ⭐ આ પ્રોડક્ટમાં ફેરફાર છે ⭐
        brand: "Gajara Gang",
        name: "Women Plain Tar Work Fancy Saree",
        price: "₹1,137",
        originalPrice: "₹4,575",
        discount: "75%",
        image: shopsaree13, 
        colorOptions: ['bg-[#16D5FF]', 'bg-[#E45BE7]', 'bg-[#ECF01D]'],
        expressShipping: false, // Express Shipping નથી
        isSale: true // ⭐ અહીં 'Sale' ઉમેરવામાં આવ્યું છે ⭐
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
  return (
    // Card container with shadow and hover effect
    <div className="w-full max-w-sm bg-white border border-gray-100 shadow-md transition duration-300 ease-in-out hover:shadow-xl cursor-pointer  overflow-hidden">
      
      {/* --- Image Section --- */}
      <div className="relative">
        <img 
          className="w-full h-96 object-cover transition duration-500 group-hover:scale-95" 
          src={product.image} 
          alt={product.name} 
        />
        
        {/* Wishlist & Bag Icons */}
        <div className="absolute top-3 right-3 flex flex-col space-y-2">
          {/* Wishlist Icon (Heart) */}
                {/* Heart Icon */}
                <div className="absolute top-1 right-1 opacity-100 group-hover:opacity-0 transition-opacity duration-300 z-10">
                  <button className="p-2 bg-white text-black rounded-full border  transition">
                    <HeartIcon width={28} height={26} />
                  </button>
                </div>

                {/* Shopping Bag Icon */}
                <div className="absolute top-[50px] right-1 opacity-100 group-hover:opacity-0 transition-opacity duration-300 z-10">
                  <button className="p-2 bg-white text-black rounded-full border  transition">
                    <ShoppingBagIcon width={28} height={26} />
                  </button>
                </div>
        </div>


        
        {/* Product Dots for the first card (can be a carousel indicator) */}
        {product.id === 1 && (
          <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-1">
            <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
          </div>
        )}
      </div>

      {/* --- Product Details Section --- */}
      <div className="p-4">


        {product.expressShipping && (
          <div className="mb-2 inline-block text-theme theme-bg-light  text-[14px] font-regular font-sans px-2 py-0.5 rounded-sm">
            Express Shipping
          </div>
        )}

        {product.isSale && ( // જો Express Shipping ન હોય અને isSale હોય તો આ દેખાશે
           <div className="mb-2 inline-block text-theme theme-bg-light  text-[14px] px-3 font-regular font-sans px-2 py-0.5 rounded-sm">
               Sale
            </div>
        )}      

        {/* Brand Name */}
        <h3 className="text-[16px] font-regular font-sans text-black truncate py-0.5">
          {product.brand}
        </h3>
        
        {/* Product Name */}
        <p className="text-[14px] text-[#989696] font-regular font-sans  truncate py-0.5">
          {product.name}
        </p>

        {/* Pricing */}
        <div className="flex items-center space-x-2 mb-3 py-0.5">
          {/* Current Price */}
          <span className="text-[16px] font-regular font-sans text-black py-0.5">
            {product.price}
          </span>
          {/* Original Price (Strikethrough) */}
          <span className="text-[14px] text-[#BCBCBC] line-through font-regular font-sans py-0.5">
            {product.originalPrice}
          </span>
          {/* Discount Percentage */}
          <span className="text-[16px] font-regular font-sans text-theme">
            {product.discount}
          </span>
        </div>

        {/* Color Options */}
        <div className="flex space-x-1">
          {product.colorOptions.map((colorClass, index) => (
            <div 
              key={index}
              className={`w-[16px] h-[16px] ${colorClass} rounded-full border border-gray-200 cursor-pointer`}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- Main Grid Component ---
const ProductGrid = () => {
  return (
    <div className="py-10 ">
      <div className="max-w-7xl mx-auto">
        {/* Grid layout for the products */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
          {/* --- Load More Button Section --- */}
           <div className="flex justify-center mt-10 ">
  <button
    className="theme-border font-inter text-theme w-[220px] h-[89px] font-medium rounded-[10px] shadow-lg transition duration-300 uppercase"
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