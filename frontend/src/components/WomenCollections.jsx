// src/components/WomenCollections.jsx

import React, { useState } from 'react';
import { ChevronDown, Sliders, X, Star, Plus, Minus } from 'lucide-react'; 
import { ChevronLeftIcon, MagnifyingGlassIcon, SlidersHorizontal, ChevronDown as LucideChevronDown, ListFilter} from '@heroicons/react/24/outline';


import FilterIconComponent from "./icons/filter"; // Import it with a unique, capitalized name

import ProductGrid from '../components/ProductGrid'; 

import shopsaree1 from '../assets/shopsaree1.jpg'; 
import shopsaree2 from '../assets/shopsaree2.jpg';

import OriginalSortByIcon from "./icons/SortByIcon"; 

import { IoCellular } from "react-icons/io5";
import { IoIosWifi } from "react-icons/io";
import Battery from "./icons/Battery";


const SortByIcon = (props) => (
  // Use the renamed imported component here
  <OriginalSortByIcon {...props} className="h-6 w-6  md:text-gray-500" />
);


// This replaces the user's custom ChevronDown (used in desktop select)
const CustomChevronDown = (props) => (
  <ChevronDown {...props} />
);

// This is the icon for the mobile "Filter" button
const Filter = (props) => ( // Keep this name for use in the bar
    // Use the capitalized imported icon component
    <FilterIconComponent {...props} /> 
);

// --- 1. Mobile Responsive UI (Refactored to accept props) ---
const MobileFilterBar = ({ sortBy, filterCount, onSortClick, onFilterClick }) => (
  <div className="flex justify-around items-center w-[450px]  gap-0">
    {/* Mobile Sort By Card */}
    <div 
        className="flex-1 max-w-[200px]  rounded-[10px]  cursor-pointer transition duration-300  border border-[#989696] drop-shadow-[0_0_4px_rgba(0,0,0,0.25)] "
        onClick={onSortClick} // Added click handler
    >
      <div className="flex items-center justify-between p-4 ">
        <div>
          <div className="text-[16px] font-inter font-semibold text-[rgba(0,0,0,0.7)]">Sort By</div>
          {/* Using passed prop 'sortBy' */}
          <div className="text-[12px] font-inter font-medium mt-0.5 text-[#989696]">{sortBy}</div>
        </div>
        {/* SortByIcon no upyog kariyo chhe */}
        <SortByIcon className="h-6 w-6 text-pink-500" />
      </div>
    </div>

    {/* Mobile Filter Card */}
    <div 
        className="flex-1 max-w-[200px] bg-color rounded-[10px] shadow-lg cursor-pointer transition duration-300 hover:shadow-xl text-white"
        onClick={onFilterClick} // Added click handler
    >
      <div className="flex items-center justify-between p-4">
        <div>
          <div className="text-[16px] font-inter font-semibold">Filter</div>
          <div className="flex items-center mt-0.5">
              <span className="text-[12px] font-inter font-medium">Applied</span>
              {/* Using passed prop 'filterCount' */}
              <span className="ml-2 px-2 py-0.5 bg-white text-[rgba(0,0,0,0.7)] font-semibold rounded-full text-[12px]">
                  {filterCount}
              </span>
          </div>
        </div>
        {/* Using the globally defined FilterIcon */}
        <Filter className="h-6 w-6 text-white" /> 
      </div>
    </div>
  </div>
);


// --- 2. Desktop UI (Refactored to accept props) ---
const DesktopSortBar = ({ sortBy, setSortBy }) => (
  <div className="flex items-center gap-2 cursor-pointer rounded px-3 py-2">
    {/* SortByIcon no upyog kariyo chhe */}
    <SortByIcon />
    <span className="text-base font-medium text-gray-700">Sort By</span>
    <div className="relative">
      <select
        // Using passed prop 'sortBy'
        value={sortBy}
        // Using passed prop 'setSortBy'
        onChange={(e) => setSortBy(e.target.value)}
        className="appearance-none bg-white border border-gray-300 text-gray-700 py-2 pl-3 pr-10 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 text-sm transition duration-150 ease-in-out"
      >
        <option value="Popularity">Popularity</option>
        <option value="Newest">Newest</option>
        <option value="Price: Low to High">Price: Low to High</option>
        <option value="Price: High to Low">Price: High to Low</option>
      </select>
      {/* Using the globally defined CustomChevronDown */}
      <CustomChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
    </div>
  </div>
);

// --------------------- Data Mockups ---------------------
const mockCategories = [
    { name: 'Saree', count: 256 },
    { name: 'Cotton Kurti', count: 1026 },
    { name: 'Jewellery', count: 206 },
    { name: 'T-Shirts', count: 989 },
    { name: 'Jeans', count: 1200 },
    { name: 'Shoes', count: 526 },
    { name: 'Westernwear', count: 1026 },
    { name: 'Crop Tops', count: 1539 },
    { name: 'Accessories', count: 4000 },
    { name: 'Bags', count: 200 },
    { name: 'SportsWear', count: 493 },
    { name: 'Indianwear', count: 5000 },
];

const mockSizes = ['4XL', '3XL', 'XXL', 'XL', 'L', 'M', 'S', 'XS', 'XXS', 'All Size'];

const mockColors = [
    { name: 'Black', class: 'bg-black' },
    { name: 'Peach', class: 'bg-orange-100' },
    { name: 'Brown', class: 'bg-amber-800' },
    { name: 'Red', class: 'bg-red-600' },
    { name: 'Gray', class: 'bg-gray-400' },
    { name: 'Orange', class: 'bg-orange-500' },
    { name: 'Rust', class: 'bg-red-800' },
    { name: 'Beige', class: 'bg-amber-200' },
    { name: 'Teal', class: 'bg-teal-500' },
    { name: 'Magnt', class: 'bg-fuchsia-600' },
    { name: 'Green', class: 'bg-green-600' },
    { name: 'Pink', class: 'bg-pink-500' },
    { name: 'Maruti', class: 'bg-red-900' },
    { name: 'Blue', class: 'bg-blue-600' },
    { name: 'White', class: 'bg-white border border-gray-300' },
    { name: 'Purple', class: 'bg-purple-600' },
];

const mockBrands = [
    { name: 'W', count: 50 },
    { name: 'Vero Moda', count: 120 },
    { name: 'Libas', count: 90 },
    { name: 'Global Desi', count: 200 },
    { name: 'Zudio', count: 350 },
    { name: 'Max', count: 180 },
];

// 👇 નવા ફિલ્ટર્સ માટેની ડેટા Mockups
const mockTypes = ['Casual', 'Ethnic', 'Party Wear', 'Formal', 'Sports'];
const mockFabrics = ['Cotton', 'Silk', 'Linen', 'Georgette', 'Rayon', 'Wool'];
const mockDiscounts = ['10% and above', '20% and above', '30% and above', '50% and above'];
const mockLabels = ['Bestseller', 'New Arrival', 'Limited Edition', 'Top Rated'];


const mockProducts = [
    {
        id: 1,
        name: 'CHECKED SAREE WITH HIGH NACK',
        price: 3599.00,
        imageSrc: shopsaree1, 
        isNew: true,
    },
    {
        id: 2,
        name: 'CHECKED SAREE WITH CRAPIO DETAIL',
        price: 2999.00,
        imageSrc: shopsaree2, 
        isNew: false,
    },
];

// --------------------- Sub-Components ---------------------

// Category, Brand, Type, Fabric, Discount, Label mate
const FilterItemCheckbox = ({ name, count, isChecked, onChange }) => (
  <label className="flex items-center justify-between cursor-pointer p-1 rounded ">
    <div className="flex items-center">
      <input
        type="checkbox"
        name={name}
        checked={isChecked}
        
        onChange={() => onChange(name)} 
        className=" w-5 h-5 rounded border border-gray-400 cursor-pointer appearance-none checked:bg-pink-600 checked:border-pink-600 checked:after:content-['✓'] checked:after:text-white checked:after:block checked:after:text-xs checked:after:text-center"/>
      <span className="ml-3 text-[14px] font-inter text-[rgba(0,0,0,0.7)]">{name}</span>
    </div>

    {count !== undefined && (
      <span className="text-[14px] font-regular font-inter text-[#989696]">{count}</span>
    )}
  </label>
);

// Size mate
const SizeFilterItem = ({ name, isChecked, onChange }) => (
  <label className="flex items-center cursor-pointer p-1  rounded w-1/2">
    <input
      type="checkbox"
      name={name}
      checked={isChecked}
      onChange={onChange}
      className="
        w-5 h-5 rounded border border-gray-400 cursor-pointer
        appearance-none
        checked:bg-pink-600 checked:border-pink-600
        checked:after:content-['✓'] checked:after:text-white checked:after:block checked:after:text-xs checked:after:text-center
      "
    />
    <span className="ml-3 text-[14px] font-inter text-[rgba(0,0,0,0.7)] font-regular">{name}</span>
  </label>
);


const ColorFilterItem = ({ name, colorClass, isChecked, onChange }) => (
    <div className="flex flex-col items-center p-1 cursor-pointer" onClick={() => onChange({ target: { name, checked: !isChecked } })}>
        <div 
            className={`w-[22px] h-[22px] rounded-full shadow-md ${colorClass} ${isChecked ? 'ring-2 ring-pink-500 ring-offset-2' : ''} transition-all duration-150`}
        >
        </div>
        <span className="text-[10px] text-[#989696] font-regular mt-1">{name}</span>
    </div>
);


const CollapsibleFilter = ({ title, isSelected, onReset, children }) => {
   
    const [isOpen, setIsOpen] = useState(true); 

    return (
        <div className="px-4 py-2  border-gray-200">
            <div 
                className="flex rounded-[10px] px-4 py-2 border items-center justify-between cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
            >
                <h3 className="font-medium font-inter text-black text-[14px]">{title}</h3>
                <div className="flex items-center space-x-2">
                   
                    {isOpen ? (
                        <Minus className="w-4 h-4 text-white bg-color" />
                    ) : (
                        <Plus className="w-4 h-4 text-white bg-color" />
                    )}
                </div>
            </div>
            
            {/* Filter Content */}
            {isOpen && (
                <div className="p-4 space-y-1">
                    {children}
                   
                </div>
            )}
        </div>
    );
};



const PriceFilter = ({ minPrice, maxPrice, onChangeMin, onChangeMax }) => (

    <div className="p-4 border-t border-gray-200">
            
                    <div className="px-3 rounded-[10px] bg-theme overflow-hidden">
                    <div className="flex items-center  py-3 justify-between">
                        <h3 className="font-medium font-inter text-black text-[14px]">Price</h3>
                    </div>
                   
                
        </div>
             <div className="relative pt-1">
                <input
                    type="range"
                    min="0"
                    max="5000"
                    value={minPrice}
                    onChange={onChangeMin}
                    className="w-full h-1 bg-transparent rounded-lg appearance-none cursor-pointer range-pink relative z-10"
                    style={{ '--tw-ring-color': '#ec4899', '--tw-ring-opacity': '1' }}
                />

                {/* Highlight (single line) */}
                <div
                    className="absolute px-3 top-1 h-1 bg-pink-600 rounded-lg opacity-50"
                    style={{
                    width: `${((maxPrice - minPrice) / 5000) * 100}%`,
                    left: `${(minPrice / 5000) * 100}%`
                    }}
                 />
   
        </div>
        <div className="flex px-3 mt-4 justify-between text-sm">
            <div className="flex flex-col items-start">
                <span className=" text-[14px] font-inter font-regular p-1 text-[#989696]">Max</span>
                <input 
                    type="number"
                    value={minPrice}
                    onChange={onChangeMin}
                    className="text-[14px] font-inter font-regular text-black border border-gray-300 rounded-[30px] p-1 w-[110px] text-center"
                />
            </div>
            <div className="flex flex-col items-start">
                <span className="text-[14px] font-inter font-regular p-1 text-[#989696]">Min</span>
                 <input 
                    type="number"
                    value={maxPrice}
                    onChange={onChangeMax}
                    className="text-[14px] font-inter font-regular text-black border border-gray-300 rounded-[30px] p-1 w-[110px] text-center"
                />
            </div>
        </div>
    </div>
);

// Component for a single product card
const ProductCard = ({ product }) => (
    // The main container needs to be 'relative' for the overlay to be 'absolute' to it
    <div className="relative group overflow-hidden">
        
        {/* 1. Image Container */}
        <div className="w-full h-auto  overflow-hidden">
            <img
                src={product.imageSrc} 
                alt={product.name}
                // Kept your image classes, adjusting h-[550px] for consistent sizing
                className="w-[450px] h-[490px] sm:w-full sm:h-[553px]  transition-transform duration-500"
            />
        </div>

       
       {/* // This is the modified overlay div for the ProductCard component */}
<div 
    className="absolute right-4 bottom-4 w-[350px] h-[250px] p-10 bg-white/70 backdrop-blur-sm transition-opacity duration-300 opacity-100
                flex flex-col justify-between" 
 
>
    

    <div className="flex justify-between items-start"> 
        
        {/* Text (Title) */}
        <div className="pr-4"> 
            <h3 className="text-[14px] font-medium font-inter tracking-wider text-black uppercase leading-tight">
                {product.name}
            </h3>
        </div>
        
        {/* The Add/Plus Button */}
<button className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full 
                   shadow-lg  transition duration-300 border border-white">
 
    <span className="text-lg font-bold text-black leading-none pb-0.5">+</span>
</button>
    </div>


    <div> 
        <p className="text-[14px] font-medium font-inter text-black">
            RS {product.price.toFixed(2)}
        </p>
    </div>
            
           
        </div>
    </div>
);

// --------------------- Main Component ---------------------
const WomenCollections = () => {
    // Filter States
    const [selectedCategories, setSelectedCategories] = useState(['Saree']);
    const [selectedSizes, setSelectedSizes] = useState(['4XL']);
    const [selectedColors, setSelectedColors] = useState([]);
    const [selectedBrands, setSelectedBrands] = useState([]);
    
    // 👇 નવા ફિલ્ટર્સના States
    const [selectedTypes, setSelectedTypes] = useState([]);
    const [selectedFabrics, setSelectedFabrics] = useState([]);
    const [selectedDiscounts, setSelectedDiscounts] = useState([]);
    const [selectedLabels, setSelectedLabels] = useState([]);

    const [minPrice, setMinPrice] = useState(500);
    const [maxPrice, setMaxPrice] = useState(2500);
    const [sortBy, setSortBy] = useState('Popularity');
      const filterCount = 0; // Placeholder for applied filter count
    
    // --- Filter Handlers ---
    const createToggleHandler = (setState) => (e) => {
        const { name, checked } = e.target;
        setState(prev =>
            checked ? [...prev, name] : prev.filter(item => item !== name)
        );
    };

    const handleCategoryChange = (categoryName) => {
    // આ ફંક્શન ઇવેન્ટ ઓબ્જેક્ટને બદલે સીધો categoryName (string) સ્વીકારે છે.
    // તેથી આમાં કોઈ ફેરફાર જરૂરી નથી.
    setSelectedCategories(prev => 
        prev.includes(categoryName)
            ? prev.filter(c => c !== categoryName)
            : [...prev, categoryName]
    );
};
    const handleSizeChange = createToggleHandler(setSelectedSizes);
    const handleColorChange = createToggleHandler(setSelectedColors);
    const handleBrandChange = createToggleHandler(setSelectedBrands);
    
      // Dummy handlers for mobile clicks
  const handleSortClick = () => console.log('Mobile Sort Clicked. Implement modal/popup logic here.');
  const handleFilterClick = () => console.log('Mobile Filter Clicked. Implement filter sidebar logic here.');
    
    const handleTypeChange = createToggleHandler(setSelectedTypes);
    const handleFabricChange = createToggleHandler(setSelectedFabrics);
    const handleDiscountChange = createToggleHandler(setSelectedDiscounts);
    const handleLabelChange = createToggleHandler(setSelectedLabels);


    const handleClearFilter = (filterType, value) => {
        if (filterType === 'category') setSelectedCategories(prev => prev.filter(cat => cat !== value));
        else if (filterType === 'size') setSelectedSizes(prev => prev.filter(size => size !== value));
        else if (filterType === 'color') setSelectedColors(prev => prev.filter(color => color !== value));
        else if (filterType === 'brand') setSelectedBrands(prev => prev.filter(brand => brand !== value));
   
        else if (filterType === 'type') setSelectedTypes(prev => prev.filter(item => item !== value));
        else if (filterType === 'fabric') setSelectedFabrics(prev => prev.filter(item => item !== value));
        else if (filterType === 'discount') setSelectedDiscounts(prev => prev.filter(item => item !== value));
        else if (filterType === 'label') setSelectedLabels(prev => prev.filter(item => item !== value));
    };

    // --- Reset Handlers ---
    const handleResetCategory = () => setSelectedCategories([]);
    const handleResetSizes = () => setSelectedSizes([]);
    const handleResetColors = () => setSelectedColors([]);
    const handleResetBrands = () => setSelectedBrands([]);
    
    const handleResetTypes = () => setSelectedTypes([]);
    const handleResetFabrics = () => setSelectedFabrics([]);
    const handleResetDiscounts = () => setSelectedDiscounts([]);
    const handleResetLabels = () => setSelectedLabels([]);

    const currentFilters = [
        ...selectedCategories.map(cat => ({ type: 'category', value: cat })),
        ...selectedSizes.map(size => ({ type: 'size', value: size })),
        ...selectedColors.map(color => ({ type: 'color', value: color })),
        ...selectedBrands.map(brand => ({ type: 'brand', value: brand })),
      
        ...selectedTypes.map(type => ({ type: 'type', value: type })),
        ...selectedFabrics.map(fabric => ({ type: 'fabric', value: fabric })),
        ...selectedDiscounts.map(discount => ({ type: 'discount', value: discount })),
        ...selectedLabels.map(label => ({ type: 'label', value: label })),
    ];
    
    const totalResults = 100;
    const showingResults = mockProducts.length;

    return (
        <div className="container w-full max-w-[1440px] mx-auto py-2 sm:py-14  px-4 sm:px-0 ">
            
             <div className="flex justify-between items-center py-2  mb-4 lg:hidden">
                 {/* Left Side - Time */}
                 
  <div className="  w-full">
      {/* -------- Status Bar (Top Row) -------- */}
      <div className="flex justify-between items-center py-2 ">
        {/* Left Side - Time */}
        <div className="sfpro  text-black">9:41</div>

        {/* Right Side - Icons */}
        <div className="flex items-center space-x-3">
          <IoCellular className="w-6 h-6 text-black cursor-pointer" />
          <IoIosWifi className="w-6 h-6 text-black cursor-pointer" />
          <Battery className="w-7 h-5 text-GRAY cursor-pointer" />
        </div>
      </div>
        
         <div className="flex items-center py-2  space-x-2">
{/* Left Arrow Icon (Wrapped in a responsive button) */}
    <button className="flex items-center justify-center w-8 h-8 rounded-[3px] border border-[#D2AF9F] shadow-sm bg-white/70 backdrop-blur-sm">
        <ChevronLeftIcon className="w-5 h-5 text-black cursor-pointer" />
    </button>
        
        {/* Search Bar */}
<div className="flex-1 mx-3 relative">
    <input 
        type="text" 
        placeholder="Women's Fashion.." 
         className="w-full h-11 bg-white border border-white rounded-[3px] pl-10 pr-4 text-sm font-regular focus:outline-none shadow-[0_0_4px_rgba(0,0,0,0.25)]"
    />
  
    <MagnifyingGlassIcon className="absolute left-2 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
    </div>
    </div>
    </div>
    </div>

            <h1 className="text-22px font-semibold font-inter mb-2 ">Women's Collections</h1>
            <p className="text-sm text-gray-600 mb-8">
                <span className="text-black border-b border-black lg:border-none">Home</span>
                <span className="text-black "> / </span>
                <span className="font-regular text-[#989696]">Shop</span>
            </p>

            {/* Main Content: Filter Sidebar and Products Grid */}
            <div className="flex flex-col lg:flex-row gap-8">

                {/* 1. Filter Sidebar */}
                <aside className="hidden lg:block lg:w-1/4 h-fit px-2 py-5 lg:w-1/4 bg-white  rounded-lg border border-gray-200">
                    <div className="p-4">
                        <h2 className="text-20px font-medium text-black lowercase ">Filter Products</h2>
                    </div>

                    {/* Category Filter Section */}
                <div className="px-4">
                    <div className="px-3 rounded-[10px] bg-theme overflow-hidden">
                    <div className="flex items-center  py-3 justify-between">
                        <h3 className="font-medium font-inter text-black text-[14px]">Category</h3>
                    </div>
                    </div>
                </div>



                         <div className="p-4">
                        
                        <div className="space-y-1  px-2 overflow-y-auto">
                            {mockCategories.map(cat => (
                                <FilterItemCheckbox
                                    key={cat.name}
                                    name={cat.name}
                                    count={cat.count}
                                    isChecked={selectedCategories.includes(cat.name)}
                                    onChange={handleCategoryChange}
                                />
                            ))}
                        </div>
                        <div className="flex gap-4 mt-4">
                            <button
                                onClick={handleResetCategory}
                                className="w-[100px] h-[40px]  text-[18px] font-regular font-inter text-black/70 border border-[#989696] rounded-[3px]  transition"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleResetCategory}
                                className=" w-[100px] h-[40px]  text-[18px] font-regular font-inter text-white bg-color rounded-[3px]  transition"
                            >
                                Reset
                            </button>
                        </div>
                    </div>
                    
                    {/* Price Filter Section */}
                    <PriceFilter
                        minPrice={minPrice}
                        maxPrice={maxPrice}
                        onChangeMin={(e) => setMinPrice(Number(e.target.value))}
                        onChangeMax={(e) => setMaxPrice(Number(e.target.value))}
                    />
                    <div className="flex gap-4 p-4 border-b border-gray-200">
                         <button
                            onClick={() => {setMinPrice(500); setMaxPrice(2500);}}
                            className="w-[100px] h-[40px]  text-[18px] font-regular font-inter text-black/70 border border-[#989696] rounded-[3px]  transition"
                        >
                            Cancel
                        </button>
                        <button
                             onClick={() => {setMinPrice(500); setMaxPrice(2500);}}
                            className="w-[100px] h-[40px]  text-[18px] font-regular font-inter text-white bg-color rounded-[3px]  transition"
                        >
                            Reset
                        </button>
                    </div>
                    
                    {/* Size Filter Section */}
              <div className="p-4 border-t border-gray-200">
                    <div className="px-3 rounded-[10px] bg-theme overflow-hidden">
                    <div className="flex items-center  py-3 justify-between">
                        <h3 className="font-medium font-inter text-black text-[14px] text-black text-[14px]">Size</h3>
                    </div>
                   
                
        </div>
                        <div className="flex flex-wrap p-4"> 
                            {mockSizes.map(size => (
                                <SizeFilterItem
                                    key={size}
                                    name={size}
                                    isChecked={selectedSizes.includes(size)}
                                    onChange={handleSizeChange}
                                />
                            ))}
                        </div>
                        <div className="flex gap-4 mt-4">
                            <button
                                onClick={handleResetSizes}
                                className="w-[100px] h-[40px]  text-[18px] font-regular font-inter text-black/70 border border-[#989696] rounded-[3px]  transition"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleResetSizes}
                                className="w-[100px] h-[40px]  text-[18px] font-regular font-inter text-white bg-color rounded-[3px]  transition"
                            >
                                Reset
                            </button>
                        </div>
                    </div>
                    
                    {/* Color Filter Section (Non-collapsible in the image) */}
                    <div className="p-4 border-t border-gray-200">
                        <div className="px-3 rounded-[10px] bg-theme overflow-hidden">
                         <div className="flex items-center  py-3 justify-between">
                        <h3 className="font-medium font-inter text-black text-[14px]  ">Color</h3>
                    </div>
</div>
                        <div className="p-4 flex flex-wrap gap-x-2 gap-y-4 justify-start"> 
                            {mockColors.map(color => (
                                <ColorFilterItem
                                    key={color.name}
                                    name={color.name}
                                    colorClass={color.class}
                                    isChecked={selectedColors.includes(color.name)}
                                    onChange={handleColorChange}
                                />
                            ))}
                        </div>
                        <div className="border-t border-gray-200"></div>
                        
                    </div>

                    {/* Brands Filter Section (Collapsible - as per your new image) */}
                    <CollapsibleFilter 
                        title="Brands" 
                        isSelected={selectedBrands.length > 0} 
                        onReset={handleResetBrands}
                    >
                        {mockBrands.map(brand => (
                            <FilterItemCheckbox
                                key={brand.name}
                                name={brand.name}
                                count={brand.count}
                                isChecked={selectedBrands.includes(brand.name)}
                                onChange={handleBrandChange}
                            />
                        ))}
                    </CollapsibleFilter>
                    
                    {/* 👇 Type Filter Section */}
                    <CollapsibleFilter 
                        title="Type" 
                        isSelected={selectedTypes.length > 0} 
                        onReset={handleResetTypes}
                    >
                        {mockTypes.map(type => (
                            <FilterItemCheckbox
                                key={type}
                                name={type}
                                isChecked={selectedTypes.includes(type)}
                                onChange={handleTypeChange}
                            />
                        ))}
                    </CollapsibleFilter>

                    {/* 👇 Fabric Filter Section */}
                    <CollapsibleFilter 
                        title="Fabric" 
                        isSelected={selectedFabrics.length > 0} 
                        onReset={handleResetFabrics}
                    >
                        {mockFabrics.map(fabric => (
                            <FilterItemCheckbox
                                key={fabric}
                                name={fabric}
                                isChecked={selectedFabrics.includes(fabric)}
                                onChange={handleFabricChange}
                            />
                        ))}
                    </CollapsibleFilter>

                    {/* 👇 Discounts Filter Section */}
                    <CollapsibleFilter 
                        title="Discounts" 
                        isSelected={selectedDiscounts.length > 0} 
                        onReset={handleResetDiscounts}
                    >
                        {mockDiscounts.map(discount => (
                            <FilterItemCheckbox
                                key={discount}
                                name={discount}
                                isChecked={selectedDiscounts.includes(discount)}
                                onChange={handleDiscountChange}
                            />
                        ))}
                    </CollapsibleFilter>

                    {/* 👇 Product Label Filter Section */}
                    <CollapsibleFilter 
                        title="Product Label" 
                        isSelected={selectedLabels.length > 0} 
                        onReset={handleResetLabels}
                    >
                        {mockLabels.map(label => (
                            <FilterItemCheckbox
                                key={label}
                                name={label}
                                isChecked={selectedLabels.includes(label)}
                                onChange={handleLabelChange}
                            />
                        ))}
                    </CollapsibleFilter>
                    {/* End of new filters */}


                </aside>

                {/* 2. Products Listing Area (Same as before) */}
                <main className="w-full lg:w-3/4">

                    {/* Top Bar: Results and Sorting */}
                    <div className="flex justify-between items-center mb-6">
                        <div className="hidden sm:block text-sm text-gray-700">
                            Showing <span className="font-semibold">{showingResults}</span> results from total <span className="font-semibold">{totalResults}</span> for "<span className="font-bold">Saree</span>"
                        </div>
                        {/* --- Mobile UI: Visible on small screens, Hidden on medium/large screens --- */}
          <div className="md:hidden flex">
            {/* Passing state and handlers as props */}
            <MobileFilterBar 
              sortBy={sortBy} 
              filterCount={filterCount} 
              onSortClick={handleSortClick}
              onFilterClick={handleFilterClick}
            />
          </div>

          {/* --- Desktop UI: Hidden on small screens, Visible on medium/large screens --- */}
          <div className="hidden md:flex justify-end">
            {/* Passing state and setter as props */}
            <DesktopSortBar sortBy={sortBy} setSortBy={setSortBy} />
          </div>
</div>
                {/* Active Filters Display */}
                <div className="hidden sm:block flex flex-wrap items-center gap-2 mb-6">
                <span className="text-[16px] font-sanss font-medium text-[#989696] mr-2 border-b border-[#989696]">Clear Filters:</span>
                {/* Clear All Filters બટન ઉમેરી શકાય છે, જો જરૂર હોય તો */}

                {currentFilters.map((filter, index) => (
                <span
                key={index}
                className="theme-border text-color px-4 py-1 rounded-[5px] cursor-pointer
                                                    inline-flex items-center "
                onClick={() => handleClearFilter(filter.type, filter.value)}
                >
                {filter.value}

                <X className="w-4 h-4 ml-2 text-color" />
                </span>
                ))}
                </div>

                    {/* Products Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {mockProducts.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                    <ProductGrid />

                </main>
               
            </div>
             
        </div>
    );
};

export default WomenCollections;