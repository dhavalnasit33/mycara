// // D:\mycara\frontend\src\components\shop\WomenCollections.jsx
import { Link } from 'react-router-dom';

import React, { useEffect, useMemo, useState } from 'react';

import { ChevronDown, X, Plus, Minus } from 'lucide-react';
import { ChevronLeftIcon, MagnifyingGlassIcon, ChevronDown as HeroChevronDown } from '@heroicons/react/24/outline';
import CheckedIcon from "../icons/checked"; 
import MobileFilterBar from './MobileFilterBar';
import ProductGrid from "./ProductGrid";
import TrandingCard from "./TrandingCard"

import SortByPage from './SortByPage'; 

import MobileFilterModal from "./MobileFilterModal";
import DesktopFilters from './DesktopFilters';

import OriginalSortByIcon from "../icons/SortByIcon";

import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../features/products/productsThunk';
import Row from '../ui/Row';


export { CollapsibleFilter, FilterItemCheckbox, SizeFilterItem, ColorFilterItem, PriceRangeFilter };

// // ---------- Icon Wrappers ----------
// const SortByIcon = (props) => (<OriginalSortByIcon {...props} className="h-4 w-4 md:text-gray-500" />);
// const CustomChevronDown = (props) => ( <ChevronDown {...props} />);


// // ---------- Desktop Sort Bar ----------
// const DesktopSortBar = ({ sortBy, setSortBy }) => (
//     <div className="flex items-center gap-2 cursor-pointer rounded px-3 py-2">
//         <SortByIcon />
//         <span className="text-[16px] font-medium text-[#989696] font-sans">Sort By</span>
//         <div className="relative">
//             <select value={sortBy}  onChange={(e) => setSortBy(e.target.value)}
//                 className=" appearance-none   bg-white text-black py-2  pl-3 pr-10 rounded-[3px] box-shadow focus:outline-none focus:ring-2 focus:ring-[#F43297] text-[16px]
//                     transition duration-150 ease-in-out " 
//             >
//                <option value="popularity">Popularity</option>
//                 <option value="latest">Newest</option>
//                 <option value="price_asc">Price: Low to High</option>
//                 <option value="price_desc">Price: High to Low</option>
//                 <option value="rating">Average Rating</option>
//                 <option value="discounts">Discounts</option>
//             </select>
//             <CustomChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-black pointer-events-none" />
//         </div>
//     </div>
// );

// // --------------------- FilterItemCheckbox ---------------------
// const FilterItemCheckbox = ({ name, count, isChecked, onChange }) => (
//     <label className="flex items-center justify-between cursor-pointer p-1 rounded ">
//         <div className="flex items-center">
//                   {/* Custom checkbox box */}
//             <div className={`w-[15px] h-[15px] rounded border flex items-center justify-center
//                 ${isChecked ? 'bg-color border-color' : 'bg-white border-gray-400'}
//             `}>
//                 {isChecked && <CheckedIcon className="w-3 h-3 text-white" />}
//             </div>

//             {/* Hidden native input for accessibility */}
//             <input
//                 type="checkbox"
//                 name={name}
//                 checked={isChecked}
//                 onChange={() => onChange(name)}
//                 className="absolute w-[15px] h-[15px] opacity-0 cursor-pointer"
//             />
//                     <span className="ml-3 text-[14px] font-inter text-[rgba(0,0,0,0.7)]">{name}</span>
//         </div>

//         {count !== undefined && (
//             <span className="text-[14px] font-regular font-inter text-[#989696]">{count}</span>
//         )}
//     </label>
// );

// // --------------------- SizeFilterItem ---------------------
// const SizeFilterItem = ({ name, isChecked, onChange }) => (
//     <label className="flex items-center cursor-pointer p-1 rounded w-1/2 relative">
//         {/* Custom checkbox */}
//         <div className={`w-[15px] h-[15px] rounded border flex items-center justify-center
//             ${isChecked ? 'bg-color border-color' : 'bg-white border-gray-400'} `}
//         >
//             {isChecked && <CheckedIcon className="w-3 h-3 pointer-events-none" />}
//         </div>

//         {/* Hidden input */}
//         <input
//         type="checkbox"
//         name={name}
//         checked={isChecked}
//         onChange={onChange}
//         className="absolute w-[15px] h-[15px] opacity-0 cursor-pointer"
//         />

//         <span className="ml-3 text-[14px] font-inter text-[rgba(0,0,0,0.7)] font-regular">
//         {name}
//         </span>
//   </label>
// );
// // --------------------- ColorFilterItem ---------------------
// const ColorFilterItem = ({ name, hex, isChecked, onChange, border }) => {
//     const dropShadowStyle = `drop-shadow(0px 0px 4px rgba(0, 0, 0, 0.25))`;
//     return (
//         <div className="flex flex-col items-center p-1 cursor-pointer w-1/6"
//             onClick={() => onChange(name)}
//         >
//             <div className={`w-[22px] h-[22px] rounded-full transition-all duration-150
//                 ${border ? 'border border-gray-300' : ''}
//                 ${isChecked ? `ring-2 ring-pink-500 ring-offset-2` : ''}`}
//                 style={{ backgroundColor: hex, filter: dropShadowStyle }}
//             >
//             </div>
//             <span className="text-[10px] text-[#989696] font-regular mt-1">{name}</span>
//         </div>
//     );
// };

// // ---------- Collapsible Filter ----------

// const CollapsibleFilter = ({
//   title,
//   onReset,
//   children,
//   onCancelClick,
//   onApplyClick,
//   defaultOpen = false,
//   showButtons = true,
// }) => {
//   const [isOpen, setIsOpen] = useState(defaultOpen);

//   const handleToggle = () => {
//     setIsOpen(!isOpen);
//   };

//   const handleClose = () => {
//     setIsOpen(false);
//     if (onCancelClick) onCancelClick();
//   };
    
//     return (
//         <div className="px-[10px] py-[0px] lg:px-[15px] lg:py-[10px] border-gray-200">
//            <div
//                 className={`flex items-center justify-between cursor-pointer rounded-[10px] px-4 py-3 transition-all duration-300
//                     ${isOpen 
//                     ? 'bg-[rgba(210,175,159,0.3)]  border-transparent' 
//                     : 'bg-transparent border border-white shadow-[0_0_4px_rgba(0,0,0,0.3)]'
//                     }`}
//                 onClick={handleToggle}
//              >
//                 <h3 className="font-medium font-inter text-black text-[14px]">{title}</h3>
//                 <div className="flex items-center space-x-2">
//                     <div className="flex items-center space-x-2">
//                         {isOpen ? (
//                             <Minus className={`w-4 h-4 text-white bg-color`} />
//                         ) : (
//                             <Plus className={`w-4 h-4 text-white bg-color`} />
//                         )}
//                     </div>
//                 </div>
//             </div>

//             {isOpen && (
//                 <div className=" space-y-1 py-2">
//                     {children}
//                     {showButtons && (
//                         <div className="flex gap-4  py-[20px] border-b border-[#BCBCBC] ">
//                             <button onClick={onCancelClick || handleClose}
//                                 className="w-[100px] h-[40px] text-[18px] font-regular font-inter text-black/70 border border-[#989696] rounded-[3px] transition"
//                             > Cancel
//                             </button>
//                             <button onClick={onApplyClick || onReset}
//                                 className={`w-[100px] h-[40px] text-[18px] font-regular font-inter text-white bg-color rounded-[3px] transition shadow-md hidden lg:flex items-center justify-center`}
//                             >
//                                 Reset
//                             </button>
//                              {/* Mobile: Filter (Apply) */}
//                             <button onClick={onApplyClick || onReset}
//                                 className="w-[100px] h-[40px] text-[18px] font-regular font-inter text-white bg-color rounded-[3px] transition shadow-md flex lg:hidden items-center justify-center"
//                              >
//                                 Filter
//                             </button>
//                         </div>
//                     )}
//                 </div>
//             )}
//         </div>
//     );
// };

// // // ---------- Price Range Filter ----------
// const PriceRangeFilter = ({ minPrice, maxPrice, setMinPrice, setMaxPrice, isMobile = false }) => {
//     const MAX_PRICE = 5000;
//     const DEFAULT_MIN = 500;
//     const DEFAULT_MAX = 2500;
//     const isRangeSelected = minPrice !== DEFAULT_MIN || maxPrice !== DEFAULT_MAX;

//     // --- Handle Min Slider ---
//     const handleMinChange = (e) => {
//         const value = Math.min(Number(e.target.value), maxPrice - 1); // cannot go above max
//         setMinPrice(value);
//     };

//     // --- Handle Max Slider ---
//     const handleMaxChange = (e) => {
//         const value = Math.max(Number(e.target.value), minPrice + 1); // cannot go below min
//         setMaxPrice(value);
//     };

//     const handleReset = () => {
//         setMinPrice(DEFAULT_MIN);
//         setMaxPrice(DEFAULT_MAX);
//     };

//     return (
//         <CollapsibleFilter
//             title="Price"
//             defaultOpen={!isMobile}
//             isSelected={isRangeSelected}
//             onReset={handleReset}
//             showButtons={false}
//         >
//             <div className=" space-y-6  overflow-y-auto px-3 py-3">
//                 <div className="relative h-1 w-full rounded-full" style={{ backgroundColor: "rgba(210, 175, 159, 0.3)" }}>

//                     {/* Highlighted range */}
//                     <div className="absolute h-1 bg-color rounded-full top-0"
//                         style={{ left: `${(minPrice / MAX_PRICE) * 100}%`,
//                                     right: `${100 - (maxPrice / MAX_PRICE) * 100}%`,
//                                 }}
//                     ></div>

//                     {/* Min slider */}
//                     <input
//                         type="range"
//                         min="0"
//                         max={MAX_PRICE}
//                         value={minPrice}
//                         onChange={handleMinChange}
//                         className="absolute top-0 w-full h-[3px] opacity-0 cursor-pointer z-20"
//                     />

//                     {/* Max slider */}
//                     <input
//                         type="range"
//                         min="0"
//                         max={MAX_PRICE}
//                         value={maxPrice}
//                         onChange={handleMaxChange}
//                         className="absolute top-0 w-full h-[3px] opacity-0 cursor-pointer z-30"
//                     />

//                         {/* Min thumb */}
//                     <div className="absolute w-[12px] h-[12px] rounded-full bg-color top-1/2 transform -translate-y-1/2 shadow-md flex items-center justify-center"
//                         style={{ left: `calc(${(minPrice / MAX_PRICE) * 100}% - 8px)` }}
//                     >
//                         <div className="w-1.5 h-1.5 rounded-full bg-white"></div> {/* small white dot */}
//                     </div>

//                     {/* Max thumb */}
//                     <div className="absolute w-[12px] h-[12px] rounded-full bg-color top-1/2 transform -translate-y-1/2 shadow-md flex items-center justify-center"
//                         style={{ left: `calc(${(maxPrice / MAX_PRICE) * 100}% - 8px)` }}
//                     >
//                         <div className="w-1.5 h-1.5 rounded-full bg-white"></div> {/* small white dot */}
//                     </div>

//                 </div>

//                 {/* Price Labels */}
//                 <div className="flex justify-between text-center">
//                     <div className="flex flex-col items-start">
//                         <span className="font-inter text-[#989696] text-[14px] font-regular">Min</span>
//                         <div className="mt-2 w-[100px] h-[40px] flex items-center justify-center border border-gray-300 rounded-full text-black font-inter text-[14px] font-regular">
//                             Rs {minPrice}
//                         </div>
//                     </div>

//                     <div className="flex flex-col items-end">
//                         <span className="font-inter text-[#989696] text-[14px] font-regular">Max</span>
//                         <div className="mt-2 w-[100px] h-[40px] flex items-center justify-center border border-gray-300 rounded-full font-inter text-black text-[14px] font-regular">
//                             Rs {maxPrice}
//                         </div>
//                     </div>
//                 </div>

//                 {isMobile && (
//                     <div className="flex gap-4 mt-4 pt-4 border-t border-gray-200">
//                         <button
//                             onClick={handleReset}
//                             className="w-[100px] h-[40px] text-[18px] font-regular font-inter text-black/70 border border-[#989696] rounded-[3px] transition"
//                         >
//                             Cancel
//                         </button>
//                         <button
//                             onClick={() => console.log('Price Filter Applied')}
//                             className="w-[100px] h-[40px] text-[18px] font-regular font-inter text-white bg-color rounded-[3px] transition shadow-md"
//                         >
//                             Filter
//                         </button>
//                     </div>
//                 )}
//             </div>
//         </CollapsibleFilter>
//     );
// };


// // --------------------- Main Component ---------------------
// const WomenCollections = () => {
//     // Filter States

    // const dispatch = useDispatch();
    // const { products = [], loading } = useSelector((state) => state.products);

    // // ✅ Fetch once when the component mounts
    // useEffect(() => {
    //     dispatch(fetchProducts());
    // }, [dispatch]);

//     const trendingProducts = products.filter((product) =>
//         product.variants?.some((variant) => variant.is_trending)
//     );

//     const [selectedCategories, setSelectedCategories] = useState([]);

//     const [selectedSizes, setSelectedSizes] = useState([]);
//     const [selectedColors, setSelectedColors] = useState([]);
//     const [selectedBrands, setSelectedBrands] = useState([]);

//     const [selectedTypes, setSelectedTypes] = useState([]);
//     const [selectedFabrics, setSelectedFabrics] = useState([]);
//     const [selectedDiscounts, setSelectedDiscounts] = useState([]);
//     const [selectedLabels, setSelectedLabels] = useState([]);

//     const [minPrice, setMinPrice] = useState(500);
//     const [maxPrice, setMaxPrice] = useState(2500);
//     const [product] = useState([]); 

//         // --- NEW SORT STATES ---
//     const [currentSortValue, setCurrentSortValue] = useState('popularity'); // 'popularity' is the value used by SortByPage
//     const [isSortByOpen, setIsSortByOpen] = useState(false); 
//     const [currentSortLabel, setCurrentSortLabel] = useState('Popularity');
    
//     // --- New Mobile State ---
//     const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);


//     const calculateFilterCount = () => {
//         let count = selectedCategories.length + selectedSizes.length + selectedColors.length + selectedBrands.length +
//             selectedTypes.length + selectedFabrics.length + selectedDiscounts.length + selectedLabels.length;

//         if (minPrice !== 500 || maxPrice !== 2500) {
//             count += 1;
//         }
//         return count;
//     };

//     const filterCount = calculateFilterCount(); 
//     // --- Filter Handlers ---
//     const createToggleHandler = (setState) => (name) => { 
//         setState(prev =>
//             prev.includes(name)
//                 ? prev.filter(item => item !== name)
//                 : [...prev, name]
//         );
//     };

//     const handleCategoryChange = createToggleHandler(setSelectedCategories);
//     const handleSizeChange = createToggleHandler(setSelectedSizes);

//     const handleColorChange = createToggleHandler(setSelectedColors);

//     const handleBrandChange = createToggleHandler(setSelectedBrands);
//     const handleTypeChange = createToggleHandler(setSelectedTypes);
//     const handleFabricChange = createToggleHandler(setSelectedFabrics);
//     const handleDiscountChange = createToggleHandler(setSelectedDiscounts);
//     const handleLabelChange = createToggleHandler(setSelectedLabels);


//     const handleSortClick = () => {
//         setIsSortByOpen(true);
//     };


//     const handleFilterClick = () => {
//         setIsMobileFilterOpen(true);
//     }
//     const handleCloseMobileFilter = () => {
//         setIsMobileFilterOpen(false);
//     }
//     const handleApplyAllFilters = () => {
//         console.log("Applying all filters and closing modal.");
//         setIsMobileFilterOpen(false);
//     };


//     const handleClearFilter = (filterType, value) => {
//         if (filterType === 'category') setSelectedCategories(prev => prev.filter(cat => cat !== value));
//         else if (filterType === 'size') setSelectedSizes(prev => prev.filter(size => size !== value));
//         else if (filterType === 'color') setSelectedColors(prev => prev.filter(color => color !== value));
//         else if (filterType === 'brand') setSelectedBrands(prev => prev.filter(brand => brand !== value));

//         else if (filterType === 'type') setSelectedTypes(prev => prev.filter(item => item !== value));
//         else if (filterType === 'fabric') setSelectedFabrics(prev => prev.filter(item => item !== value));
//         else if (filterType === 'discount') setSelectedDiscounts(prev => prev.filter(item => item !== value));
//         else if (filterType === 'label') setSelectedLabels(prev => prev.filter(item => item !== value));
//     };

//     // --- Reset Handlers ---
//     const handleResetCategories = () => setSelectedCategories([]);
//     const handleResetSizes = () => setSelectedSizes([]);
//     const handleResetColors = () => setSelectedColors([]);
//     const handleResetBrands = () => setSelectedBrands([]);

//     const handleResetTypes = () => setSelectedTypes([]);
//     const handleResetFabrics = () => setSelectedFabrics([]);
//     const handleResetDiscounts = () => setSelectedDiscounts([]);
//     const handleResetLabels = () => setSelectedLabels([]);
//     const handleResetPrice = () => { setMinPrice(500); setMaxPrice(2500); }; 

//     // --- Clear All Filters ---
//     const handleClearAllFilters = () => {
//         handleResetCategories();
//         handleResetSizes();
//         handleResetColors();
//         handleResetBrands();
//         handleResetTypes();
//         handleResetFabrics();
//         handleResetDiscounts();
//         handleResetLabels();
//         handleResetPrice();
//     };

//     const currentFilters = [
//         ...selectedCategories.map(cat => ({ type: 'category', value: cat })),
//         ...selectedSizes.map(size => ({ type: 'size', value: size })),
//         ...selectedColors.map(color => ({ type: 'color', value: color })),
//         ...selectedBrands.map(brand => ({ type: 'brand', value: brand })),

//         ...selectedTypes.map(type => ({ type: 'type', value: type })),
//         ...selectedFabrics.map(fabric => ({ type: 'fabric', value: fabric })),
//         ...selectedDiscounts.map(discount => ({ type: 'discount', value: discount })),
//         ...selectedLabels.map(label => ({ type: 'label', value: label })),
//         ...(minPrice !== 500 || maxPrice !== 2500 ? [{ type: 'price', value: `Rs ${minPrice} - Rs ${maxPrice}` }] : []),
//     ];

//     const isCategorySelected = selectedCategories.length > 0;
//     const totalResults = 100;
//      const showingResults = product.length;
   

//     return (
//         <Row className=" w-full container-1440 mx-auto lg:mt-[80px] py-3 px-3">
//             <MobileFilterModal
//                 isOpen={isMobileFilterOpen}
//                 onClose={handleCloseMobileFilter}
//                 selectedCategories={selectedCategories} handleCategoryChange={handleCategoryChange} handleResetCategories={handleResetCategories}
//                 selectedSizes={selectedSizes} handleSizeChange={handleSizeChange} handleResetSizes={handleResetSizes}
//                 selectedColors={selectedColors} handleColorChange={handleColorChange} handleResetColors={handleResetColors}
//                 selectedBrands={selectedBrands} handleBrandChange={handleBrandChange} handleResetBrands={handleResetBrands}
//                 selectedTypes={selectedTypes} handleTypeChange={handleTypeChange} handleResetTypes={handleResetTypes}
//                 selectedFabrics={selectedFabrics} handleFabricChange={handleFabricChange} handleResetFabrics={handleResetFabrics}
//                 selectedDiscounts={selectedDiscounts} handleDiscountChange={handleDiscountChange} handleResetDiscounts={handleResetDiscounts}
//                 selectedLabels={selectedLabels} handleLabelChange={handleLabelChange} handleResetLabels={handleResetLabels}
//                 minPrice={minPrice} setMinPrice={setMinPrice} maxPrice={maxPrice} setMaxPrice={setMaxPrice}
//                 applyAllFilters={handleApplyAllFilters}
//                 onClearAll={handleClearAllFilters} //
//             />
    
//             <div className="flex justify-between items-center py-2 mb-4 lg:hidden">
//                 <div className=" w-full">
//                     <div className="flex items-center py-2 space-x-2">
//                         <button className="flex items-center justify-center w-8 h-8 rounded-[3px] border border-[#D2AF9F] shadow-sm bg-white/70 backdrop-blur-sm">
//                             <ChevronLeftIcon className="w-5 h-5 text-black cursor-pointer" />
//                         </button>

//                         <div className="flex-1 mx-3 relative">
//                             <input
//                                 type="text"
//                                 placeholder="Women's Fashion.."
//                                 className="w-full h-11 bg-white border border-white rounded-[3px] pl-10 pr-4 text-sm font-regular focus:outline-none shadow-[0_0_4px_rgba(0,0,0,0.25)]"
//                             />
//                             <MagnifyingGlassIcon className="absolute left-2 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             <h1 className="text-[22px] font-semibold font-inter mb-2 ">Women's Collections</h1>
//             <p className="text-sm text-gray-600 mb-8">
//                 <span className="text-black border-b border-black lg:border-none"><Link to="/home">Home</Link></span>
//                 <span className="text-black "> / </span>
//                 <span className="font-regular text-[#989696]">Shop</span>
//             </p>
//             <div className="mb-3 lg:hidden">
//                 <MobileFilterBar
//                     sortBy={currentSortLabel} 
//                     filterCount={filterCount}
//                     onSortClick={handleSortClick} 
//                     onFilterClick={handleFilterClick}
//                     isHidden={isSortByOpen}
//                 />
//                 <SortByPage
//                     isOpen={isSortByOpen}
//                     onClose={() => setIsSortByOpen(false)} 
//                     selectedSort={currentSortValue}
//                     onSelectSort={(value, label) => {
//                         setCurrentSortValue(value);
//                         setCurrentSortLabel(label);
//                         setIsSortByOpen(false); 
//                     }}
//                 />
//             </div>
//             <div className="flex flex-col lg:flex-row gap-[30px]">
//             <DesktopFilters
//                     selectedCategories={selectedCategories}
//                     handleCategoryChange={handleCategoryChange}
//                     handleResetCategories={handleResetCategories}
//                     selectedSizes={selectedSizes}
//                     handleSizeChange={handleSizeChange}
//                     handleResetSizes={handleResetSizes}
//                     selectedColors={selectedColors}
//                     handleColorChange={handleColorChange}
//                     handleResetColors={handleResetColors}
//                     selectedBrands={selectedBrands}
//                     handleBrandChange={handleBrandChange}
//                     handleResetBrands={handleResetBrands}
//                     selectedTypes={selectedTypes}
//                     handleTypeChange={handleTypeChange}
//                     handleResetTypes={handleResetTypes}
//                     selectedFabrics={selectedFabrics}
//                     handleFabricChange={handleFabricChange}
//                     handleResetFabrics={handleResetFabrics}
//                     selectedDiscounts={selectedDiscounts}
//                     handleDiscountChange={handleDiscountChange}
//                     handleResetDiscounts={handleResetDiscounts}
//                     selectedLabels={selectedLabels}
//                     handleLabelChange={handleLabelChange}
//                     handleResetLabels={handleResetLabels}
//                     minPrice={minPrice}
//                     setMinPrice={setMinPrice}
//                     maxPrice={maxPrice}
//                     setMaxPrice={setMaxPrice}
//                     isCategorySelected={selectedCategories.length > 0}
//                 />
//                 <main className="w-full lg:w-3/4">
//                     <div className="flex justify-between items-center mb-6">
//                         <div className="hidden lg:block text-[16px] sec-text-color ">
//                             Showing  <span className="font-medium text-black">
//                             {showingResults}</span> results from total <span className="font-medium text-black">{totalResults}
//                             </span> for “<span className="font-medium text-black">Saree</span>“
//                         </div>

//                         <div className=" sm:flex lg:hidden">
        
//                         </div>
//                         <div className="hidden lg:flex justify-end">
//                             <DesktopSortBar sortBy={currentSortValue} setSortBy={setCurrentSortValue} />
//                         </div>
//                     </div>

//                     {/* Active Filters Display */}
//                     <div className="hidden sm:flex flex-wrap items-center gap-2 mb-6">
//                         <span onClick={handleClearAllFilters} className={`text-[16px] font-sanss font-medium text-[#989696] mr-2 border-b border-[#989696] cursor-pointer`}>Clear Filters:</span>
//                             {currentFilters.map((filter, index) => (
//                             <span
//                                 key={index}
//                                 className={`theme-border min-w-[110px] text-theme border px-[10px] py-[5px] rounded-[10px] cursor-pointer flex items-center justify-between`}
//                                 onClick={() => handleClearFilter(filter.type, filter.value)}
//                             >
//                                 {filter.value}

//                                 <X className={`w-4 h-4 ml-2 text-theme `} />
//                             </span>
//                         ))}
//                     </div>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-[30px] ">
//                         {loading ? (
//                             <p>Loading...</p>
//                         ) : trendingProducts.length > 0 ? (
//                             trendingProducts.slice(0, 2).map((product) => (
//                             <TrandingCard key={product._id || product.id} product={product} />
//                             ))
//                         ) : (
//                             <p>No trending products found.</p>
//                         )}
//                     </div>
//                     <ProductGrid />
//                 </main>
//             </div>
//         </Row>
//     );
// };

// export default WomenCollections;
// src/components/shop/WomenCollections.jsx
// import React, { useEffect, useMemo, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchProducts } from "../../features/products/productsThunk";
// import MobileFilterModal from "./MobileFilterModal";
// import MobileFilterBar from "./MobileFilterBar";
// import SortByPage from "./SortByPage";
// import DesktopFilters from "./DesktopFilters";
// import TrandingCard from "./TrandingCard";
// import ProductGrid from "./ProductGrid";

const FilterItemCheckbox = ({ name, count, isChecked, onChange }) => (
    <label className="flex items-center justify-between cursor-pointer p-1 rounded ">
        <div className="flex items-center">
                  {/* Custom checkbox box */}
            <div className={`w-[15px] h-[15px] rounded border flex items-center justify-center
                ${isChecked ? 'bg-color border-color' : 'bg-white border-gray-400'}
            `}>
                {isChecked && <CheckedIcon className="w-3 h-3 text-white" />}
            </div>

            {/* Hidden native input for accessibility */}
            <input
                type="checkbox"
                name={name}
                checked={isChecked}
                onChange={() => onChange(name)}
                className="absolute w-[15px] h-[15px] opacity-0 cursor-pointer"
            />
                    <span className="ml-3 text-[14px] font-inter text-[rgba(0,0,0,0.7)]">{name}</span>
        </div>

        {count !== undefined && (
            <span className="text-[14px] font-regular font-inter text-[#989696]">{count}</span>
        )}
    </label>
);

// --------------------- SizeFilterItem ---------------------
const SizeFilterItem = ({ name, isChecked, onChange }) => (
    <label className="flex items-center cursor-pointer p-1 rounded w-1/2 relative">
        {/* Custom checkbox */}
        <div className={`w-[15px] h-[15px] rounded border flex items-center justify-center
            ${isChecked ? 'bg-color border-color' : 'bg-white border-gray-400'} `}
        >
            {isChecked && <CheckedIcon className="w-3 h-3 pointer-events-none" />}
        </div>

        {/* Hidden input */}
        <input
        type="checkbox"
        name={name}
        checked={isChecked}
        onChange={onChange}
        className="absolute w-[15px] h-[15px] opacity-0 cursor-pointer"
        />

        <span className="ml-3 text-[14px] font-inter text-[rgba(0,0,0,0.7)] font-regular">
        {name}
        </span>
  </label>
);
// --------------------- ColorFilterItem ---------------------
const ColorFilterItem = ({ name, hex, isChecked, onChange, border }) => {
    const dropShadowStyle = `drop-shadow(0px 0px 4px rgba(0, 0, 0, 0.25))`;
    return (
        <div className="flex flex-col items-center p-1 cursor-pointer w-1/6"
            onClick={() => onChange(name)}
        >
            <div className={`w-[22px] h-[22px] rounded-full transition-all duration-150
                ${border ? 'border border-gray-300' : ''}
                ${isChecked ? `ring-2 ring-pink-500 ring-offset-2` : ''}`}
                style={{ backgroundColor: hex, filter: dropShadowStyle }}
            >
            </div>
            <span className="text-[10px] text-[#989696] font-regular mt-1">{name}</span>
        </div>
    );
};

// ---------- Collapsible Filter ----------

const CollapsibleFilter = ({
  title,
  onReset,
  children,
  onCancelClick,
  onApplyClick,
  defaultOpen = false,
  showButtons = true,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleClose = () => {
    setIsOpen(false);
    if (onCancelClick) onCancelClick();
  };
    
    return (
        <div className="px-[10px] py-[0px] lg:px-[15px] lg:py-[10px] border-gray-200">
           <div
                className={`flex items-center justify-between cursor-pointer rounded-[10px] px-4 py-3 transition-all duration-300
                    ${isOpen 
                    ? 'bg-[rgba(210,175,159,0.3)]  border-transparent' 
                    : 'bg-transparent border border-white shadow-[0_0_4px_rgba(0,0,0,0.3)]'
                    }`}
                onClick={handleToggle}
             >
                <h3 className="font-medium font-inter text-black text-[14px]">{title}</h3>
                <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-2">
                        {isOpen ? (
                            <Minus className={`w-4 h-4 text-white bg-color`} />
                        ) : (
                            <Plus className={`w-4 h-4 text-white bg-color`} />
                        )}
                    </div>
                </div>
            </div>

            {isOpen && (
                <div className=" space-y-1 py-2">
                    {children}
                    {showButtons && (
                        <div className="flex gap-4  py-[20px] border-b border-[#BCBCBC] ">
                            <button onClick={onCancelClick || handleClose}
                                className="w-[100px] h-[40px] text-[18px] font-regular font-inter text-black/70 border border-[#989696] rounded-[3px] transition"
                            > Cancel
                            </button>
                            <button onClick={onApplyClick || onReset}
                                className={`w-[100px] h-[40px] text-[18px] font-regular font-inter text-white bg-color rounded-[3px] transition shadow-md hidden lg:flex items-center justify-center`}
                            >
                                Reset
                            </button>
                             {/* Mobile: Filter (Apply) */}
                            <button onClick={onApplyClick || onReset}
                                className="w-[100px] h-[40px] text-[18px] font-regular font-inter text-white bg-color rounded-[3px] transition shadow-md flex lg:hidden items-center justify-center"
                             >
                                Filter
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

// // ---------- Price Range Filter ----------
const PriceRangeFilter = ({ minPrice, maxPrice, setMinPrice, setMaxPrice, isMobile = false }) => {
    const MAX_PRICE = 5000;
    const DEFAULT_MIN = 500;
    const DEFAULT_MAX = 2500;
    const isRangeSelected = minPrice !== DEFAULT_MIN || maxPrice !== DEFAULT_MAX;

    // --- Handle Min Slider ---
    const handleMinChange = (e) => {
        const value = Math.min(Number(e.target.value), maxPrice - 1); // cannot go above max
        setMinPrice(value);
    };

    // --- Handle Max Slider ---
    const handleMaxChange = (e) => {
        const value = Math.max(Number(e.target.value), minPrice + 1); // cannot go below min
        setMaxPrice(value);
    };

    const handleReset = () => {
        setMinPrice(DEFAULT_MIN);
        setMaxPrice(DEFAULT_MAX);
    };

    return (
        <CollapsibleFilter
            title="Price"
            defaultOpen={!isMobile}
            isSelected={isRangeSelected}
            onReset={handleReset}
            showButtons={false}
        >
            <div className=" space-y-6  overflow-y-auto px-3 py-3">
                <div className="relative h-1 w-full rounded-full" style={{ backgroundColor: "rgba(210, 175, 159, 0.3)" }}>

                    {/* Highlighted range */}
                    <div className="absolute h-1 bg-color rounded-full top-0"
                        style={{ left: `${(minPrice / MAX_PRICE) * 100}%`,
                                    right: `${100 - (maxPrice / MAX_PRICE) * 100}%`,
                                }}
                    ></div>

                    {/* Min slider */}
                    <input
                        type="range"
                        min="0"
                        max={MAX_PRICE}
                        value={minPrice}
                        onChange={handleMinChange}
                        className="absolute top-0 w-full h-[3px] opacity-0 cursor-pointer z-20"
                    />

                    {/* Max slider */}
                    <input
                        type="range"
                        min="0"
                        max={MAX_PRICE}
                        value={maxPrice}
                        onChange={handleMaxChange}
                        className="absolute top-0 w-full h-[3px] opacity-0 cursor-pointer z-30"
                    />

                        {/* Min thumb */}
                    <div className="absolute w-[12px] h-[12px] rounded-full bg-color top-1/2 transform -translate-y-1/2 shadow-md flex items-center justify-center"
                        style={{ left: `calc(${(minPrice / MAX_PRICE) * 100}% - 8px)` }}
                    >
                        <div className="w-1.5 h-1.5 rounded-full bg-white"></div> {/* small white dot */}
                    </div>

                    {/* Max thumb */}
                    <div className="absolute w-[12px] h-[12px] rounded-full bg-color top-1/2 transform -translate-y-1/2 shadow-md flex items-center justify-center"
                        style={{ left: `calc(${(maxPrice / MAX_PRICE) * 100}% - 8px)` }}
                    >
                        <div className="w-1.5 h-1.5 rounded-full bg-white"></div> {/* small white dot */}
                    </div>

                </div>

                {/* Price Labels */}
                <div className="flex justify-between text-center">
                    <div className="flex flex-col items-start">
                        <span className="font-inter text-[#989696] text-[14px] font-regular">Min</span>
                        <div className="mt-2 w-[100px] h-[40px] flex items-center justify-center border border-gray-300 rounded-full text-black font-inter text-[14px] font-regular">
                            Rs {minPrice}
                        </div>
                    </div>

                    <div className="flex flex-col items-end">
                        <span className="font-inter text-[#989696] text-[14px] font-regular">Max</span>
                        <div className="mt-2 w-[100px] h-[40px] flex items-center justify-center border border-gray-300 rounded-full font-inter text-black text-[14px] font-regular">
                            Rs {maxPrice}
                        </div>
                    </div>
                </div>

                {isMobile && (
                    <div className="flex gap-4 mt-4 pt-4 border-t border-gray-200">
                        <button
                            onClick={handleReset}
                            className="w-[100px] h-[40px] text-[18px] font-regular font-inter text-black/70 border border-[#989696] rounded-[3px] transition"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={() => console.log('Price Filter Applied')}
                            className="w-[100px] h-[40px] text-[18px] font-regular font-inter text-white bg-color rounded-[3px] transition shadow-md"
                        >
                            Filter
                        </button>
                    </div>
                )}
            </div>
        </CollapsibleFilter>
    );
};



const WomenCollections = () => {

  const { products = [], loading } = useSelector((state) => state.products || {});

  const dispatch = useDispatch();
    // ✅ Fetch once when the component mounts
    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

  // --- fetch products once on mount ---
 

// frontend filtering
// const filteredProducts = products.filter(product => {
//     return (
//       (!selectedCategory || product.category === selectedCategory) &&
//       (!selectedSize || product.size?.includes(selectedSize)) &&
//       (!selectedColor || product.color === selectedColor)
//     );
// });


  // --- filter selection state (kept here) ---
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedFabrics, setSelectedFabrics] = useState([]);
  const [selectedDiscounts, setSelectedDiscounts] = useState([]);
  const [selectedLabels, setSelectedLabels] = useState([]);

  const [minPrice, setMinPrice] = useState(500);
  const [maxPrice, setMaxPrice] = useState(2500);

  // sort state
  const [currentSortValue, setCurrentSortValue] = useState("popularity");
  const [currentSortLabel, setCurrentSortLabel] = useState("Popularity");

  // mobile filter modal
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [isSortByOpen, setIsSortByOpen] = useState(false);

  // helper toggles
  const createToggleHandler = (setState) => (name) => {
    setState((prev) => (prev.includes(name) ? prev.filter((p) => p !== name) : [...prev, name]));
  };

  const handleCategoryChange = createToggleHandler(setSelectedCategories);
  const handleSizeChange = createToggleHandler(setSelectedSizes);
  const handleColorChange = createToggleHandler(setSelectedColors);
  const handleBrandChange = createToggleHandler(setSelectedBrands);
  const handleTypeChange = createToggleHandler(setSelectedTypes);
  const handleFabricChange = createToggleHandler(setSelectedFabrics);
  const handleDiscountChange = createToggleHandler(setSelectedDiscounts);
  const handleLabelChange = createToggleHandler(setSelectedLabels);

  const handleClearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedSizes([]);
    setSelectedColors([]);
    setSelectedBrands([]);
    setSelectedTypes([]);
    setSelectedFabrics([]);
    setSelectedDiscounts([]);
    setSelectedLabels([]);
    setMinPrice(500);
    setMaxPrice(2500);
  };

  // Build currentFilters list for display
  const currentFilters = useMemo(() => {
    const arr = [
      ...selectedCategories.map((v) => ({ type: "category", value: v })),
      ...selectedSizes.map((v) => ({ type: "size", value: v })),
      ...selectedColors.map((v) => ({ type: "color", value: v })),
      ...selectedBrands.map((v) => ({ type: "brand", value: v })),
      ...selectedTypes.map((v) => ({ type: "type", value: v })),
      ...selectedFabrics.map((v) => ({ type: "fabric", value: v })),
      ...selectedDiscounts.map((v) => ({ type: "discount", value: v })),
      ...selectedLabels.map((v) => ({ type: "label", value: v })),
    ];
    if (minPrice !== 500 || maxPrice !== 2500) {
      arr.push({ type: "price", value: `Rs ${minPrice} - Rs ${maxPrice}` });
    }
    return arr;
  }, [
    selectedCategories,
    selectedSizes,
    selectedColors,
    selectedBrands,
    selectedTypes,
    selectedFabrics,
    selectedDiscounts,
    selectedLabels,
    minPrice,
    maxPrice,
  ]);

  // Utility helpers to extract properties from product defensively
  const productCategoryName = (p) => p?.category?.name || p?.category_name || "";
  const productBrandNames = (p) =>
    (p?.variants || []).flatMap((v) => {
      // brand might be array or object
      const brand = v?.brand || v?.brands || v?.brand_id;
      if (!brand) return [];
      if (Array.isArray(brand)) return brand.map((b) => b?.name || b);
      if (typeof brand === "object") return [brand?.name].filter(Boolean);
      return [String(brand)];
    });

  const productTypeNames = (p) =>
    (p?.variants || []).flatMap((v) => {
      const t = v?.type || v?.types;
      if (!t) return [];
      if (Array.isArray(t)) return t.map((x) => x?.name || x);
      if (typeof t === "object") return [t?.name].filter(Boolean);
      return [String(t)];
    });

  const productFabricNames = (p) =>
    (p?.variants || []).flatMap((v) => {
      const f = v?.fabric || v?.fabrics;
      if (!f) return [];
      if (Array.isArray(f)) return f.map((x) => x?.name || x);
      if (typeof f === "object") return [f?.name].filter(Boolean);
      return [String(f)];
    });

  const productSizes = (p) =>
    (p?.variants || []).flatMap((v) => {
      const s = v?.sizes || v?.size || v?.available_sizes;
      if (!s) return [];
      if (Array.isArray(s)) return s.map((x) => (typeof x === "object" ? x?.name || x : x));
      return [String(s)];
    });

  const productColors = (p) =>
    (p?.variants || []).flatmap((v) => {
      const c = v?.color || v?.colors || v?.colour;
      if (!c) return [];
      if (Array.isArray(c)) return c.map((x) => (typeof x === "object" ? x?.name || x : x));
      return [String(c)];
    });

  const productDiscountId = (p) => p?.discount_id || p?.discount || null;
  const productLabelNames = (p) =>
    (p?.variants || []).flatMap((v) => v?.labels || []).map((l) => (typeof l === "object" ? l?.name || l : l));

  // Check if product matches selected filters
  const matchesFilters = (p) => {
    // Category
    if (selectedCategories.length > 0) {
      const cat = productCategoryName(p);
      if (!selectedCategories.includes(cat)) return false;
    }

    // Sizes
    if (selectedSizes.length > 0) {
      const sizes = productSizes(p);
      if (!selectedSizes.some((s) => sizes.includes(s))) return false;
    }

    // Colors
    if (selectedColors.length > 0) {
      const colors = productColors(p);
      if (!selectedColors.some((c) => colors.includes(c))) return false;
    }

    // Brands
    if (selectedBrands.length > 0) {
      const brands = productBrandNames(p);
      if (!selectedBrands.some((b) => brands.includes(b))) return false;
    }

    // Types
    if (selectedTypes.length > 0) {
      const types = productTypeNames(p);
      if (!selectedTypes.some((t) => types.includes(t))) return false;
    }

    // Fabrics
    if (selectedFabrics.length > 0) {
      const fabrics = productFabricNames(p);
      if (!selectedFabrics.some((f) => fabrics.includes(f))) return false;
    }

    // Discounts (if discount list uses id or name)
    if (selectedDiscounts.length > 0) {
      const did = productDiscountId(p);
      // try match by id or name
      if (!selectedDiscounts.includes(String(did))) {
        // also check discount name on product if available
        if (!selectedDiscounts.includes(p?.discount_name || "")) return false;
      }
    }

    // Labels
    if (selectedLabels.length > 0) {
      const labels = productLabelNames(p);
      if (!selectedLabels.some((l) => labels.includes(l))) return false;
    }

    // Price check: try to read a numeric price (prefer variant price if exists)
    const priceCandidates = [
      p?.price,
      p?.selling_price,
      p?.variants?.[0]?.price,
      p?.variants?.[0]?.selling_price,
      p?.variants?.[0]?.mrp,
    ].filter(Boolean);

    const price = priceCandidates.length ? Number(priceCandidates[0]) : null;
    if (price != null) {
      if (price < minPrice || price > maxPrice) return false;
    } else {
      // If price is not available, we will not exclude (or you can choose to exclude)
    }

    return true;
  };

  // Apply filters + sorting via useMemo
  const filteredProducts = useMemo(() => {
    if (!Array.isArray(products)) return [];

    let out = products.filter((p) => matchesFilters(p));

    // Sorting
    const sortVal = currentSortValue;
    out = out.slice(); // copy
    if (sortVal === "latest") {
      // attempt to use createdAt or updatedAt
      out.sort((a, b) => new Date(b?.createdAt || b?.updatedAt || 0) - new Date(a?.createdAt || a?.updatedAt || 0));
    } else if (sortVal === "price_asc") {
      out.sort((a, b) => {
        const pa = Number(a?.variants?.[0]?.selling_price || a?.selling_price || a?.price || 0);
        const pb = Number(b?.variants?.[0]?.selling_price || b?.selling_price || b?.price || 0);
        return pa - pb;
      });
    } else if (sortVal === "price_desc") {
      out.sort((a, b) => {
        const pa = Number(a?.variants?.[0]?.selling_price || a?.selling_price || a?.price || 0);
        const pb = Number(b?.variants?.[0]?.selling_price || b?.selling_price || b?.price || 0);
        return pb - pa;
      });
    } else if (sortVal === "rating") {
      out.sort((a, b) => (b?.rating || 0) - (a?.rating || 0));
    } else if (sortVal === "discounts") {
      out.sort((a, b) => (b?.discount_percentage || 0) - (a?.discount_percentage || 0));
    } else {
      // popularity or fallback
      out.sort((a, b) => (b?.popularity_score || b?.sold_count || 0) - (a?.popularity_score || a?.sold_count || 0));
    }

    return out;
  }, [
    products,
    selectedCategories,
    selectedSizes,
    selectedColors,
    selectedBrands,
    selectedTypes,
    selectedFabrics,
    selectedDiscounts,
    selectedLabels,
    minPrice,
    maxPrice,
    currentSortValue,
  ]);

  // UI helpers
  const filterCount = currentFilters.length;
  const trendingProducts = products.filter((p) => (p.variants || []).some((v) => v.is_trending));
  const showingResults = filteredProducts.length;
  const totalResults = products.length;

  // handlers for mobile & sort
  const handleOpenMobileFilter = () => setIsMobileFilterOpen(true);
  const handleCloseMobileFilter = () => setIsMobileFilterOpen(false);
  const handleApplyAllFilters = () => {
    setIsMobileFilterOpen(false);
  };

  return (
    <Row >
      <MobileFilterModal
        isOpen={isMobileFilterOpen}
        onClose={handleCloseMobileFilter}
        selectedCategories={selectedCategories}
        handleCategoryChange={handleCategoryChange}
        handleResetCategories={() => setSelectedCategories([])}
        selectedSizes={selectedSizes}
        handleSizeChange={handleSizeChange}
        handleResetSizes={() => setSelectedSizes([])}
        selectedColors={selectedColors}
        handleColorChange={handleColorChange}
        handleResetColors={() => setSelectedColors([])}
        selectedBrands={selectedBrands}
        handleBrandChange={handleBrandChange}
        handleResetBrands={() => setSelectedBrands([])}
        selectedTypes={selectedTypes}
        handleTypeChange={handleTypeChange}
        handleResetTypes={() => setSelectedTypes([])}
        selectedFabrics={selectedFabrics}
        handleFabricChange={handleFabricChange}
        handleResetFabrics={() => setSelectedFabrics([])}
        selectedDiscounts={selectedDiscounts}
        handleDiscountChange={handleDiscountChange}
        handleResetDiscounts={() => setSelectedDiscounts([])}
        selectedLabels={selectedLabels}
        handleLabelChange={handleLabelChange}
        handleResetLabels={() => setSelectedLabels([])}
        minPrice={minPrice}
        setMinPrice={setMinPrice}
        maxPrice={maxPrice}
        setMaxPrice={setMaxPrice}
        applyAllFilters={handleApplyAllFilters}
        onClearAll={handleClearAllFilters}
      />

      <div className="flex justify-between items-center py-2 mb-4 lg:hidden">
        <div className="w-full">
          {/* mobile search & back button - left as-is */}
        </div>
      </div>

      <h1 className="text-[22px] font-semibold font-inter mb-2">Women's Collections</h1>

      <div className="mb-3 lg:hidden">
        <MobileFilterBar sortBy={currentSortLabel} filterCount={filterCount} onSortClick={() => setIsSortByOpen(true)} onFilterClick={handleOpenMobileFilter} />
        <SortByPage
          isOpen={isSortByOpen}
          onClose={() => setIsSortByOpen(false)}
          selectedSort={currentSortValue}
          onSelectSort={(value, label) => {
            setCurrentSortValue(value);
            setCurrentSortLabel(label);
            setIsSortByOpen(false);
          }}
        />
      </div>

      <div className="flex flex-col lg:flex-row gap-[30px]">
        <DesktopFilters
          products={products} // pass full product list for counts
          selectedCategories={selectedCategories}
          handleCategoryChange={handleCategoryChange}
          handleResetCategories={() => setSelectedCategories([])}
          selectedSizes={selectedSizes}
          handleSizeChange={handleSizeChange}
          handleResetSizes={() => setSelectedSizes([])}
          selectedColors={selectedColors}
          handleColorChange={handleColorChange}
          handleResetColors={() => setSelectedColors([])}
          selectedBrands={selectedBrands}
          handleBrandChange={handleBrandChange}
          handleResetBrands={() => setSelectedBrands([])}
          selectedTypes={selectedTypes}
          handleTypeChange={handleTypeChange}
          handleResetTypes={() => setSelectedTypes([])}
          selectedFabrics={selectedFabrics}
          handleFabricChange={handleFabricChange}
          handleResetFabrics={() => setSelectedFabrics([])}
          selectedDiscounts={selectedDiscounts}
          handleDiscountChange={handleDiscountChange}
          handleResetDiscounts={() => setSelectedDiscounts([])}
          selectedLabels={selectedLabels}
          handleLabelChange={handleLabelChange}
          handleResetLabels={() => setSelectedLabels([])}
          minPrice={minPrice}
          setMinPrice={setMinPrice}
          maxPrice={maxPrice}
          setMaxPrice={setMaxPrice}
          isCategorySelected={selectedCategories.length > 0}
        />

        <main className="w-full lg:w-3/4">
          <div className="flex justify-between items-center mb-6">
            <div className="hidden lg:block text-[16px] sec-text-color">
              Showing <span className="font-medium text-black">{showingResults}</span> results from total <span className="font-medium text-black">{totalResults}</span>
            </div>

            <div className="hidden lg:flex justify-end">
              {/* Desktop sort UI - use currentSortValue setter */}
              <div className="flex items-center gap-2 cursor-pointer rounded px-3 py-2">
                <span className="text-[16px] font-medium text-[#989696] font-sans">Sort By</span>
                <div className="relative">
                  <select
                    value={currentSortValue}
                    onChange={(e) => setCurrentSortValue(e.target.value)}
                    className="appearance-none bg-white text-black py-2 pl-3 pr-10 rounded-[3px] focus:outline-none"
                  >
                    <option value="popularity">Popularity</option>
                    <option value="latest">Newest</option>
                    <option value="price_asc">Price: Low to High</option>
                    <option value="price_desc">Price: High to Low</option>
                    <option value="rating">Average Rating</option>
                    <option value="discounts">Discounts</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Active Filters chips */}
          <div className="hidden sm:flex flex-wrap items-center gap-2 mb-6">
            <span onClick={handleClearAllFilters} className="text-[16px] font-sanss font-medium text-[#989696] mr-2 border-b border-[#989696] cursor-pointer">
              Clear Filters:
            </span>
            {currentFilters.map((filter, idx) => (
              <span
                key={idx}
                className="theme-border min-w-[110px] text-theme border px-[10px] py-[5px] rounded-[10px] cursor-pointer flex items-center justify-between"
                onClick={() => {
                  // remove single filter on click
                  const { type, value } = filter;
                  if (type === "category") setSelectedCategories((p) => p.filter((x) => x !== value));
                  if (type === "size") setSelectedSizes((p) => p.filter((x) => x !== value));
                  if (type === "color") setSelectedColors((p) => p.filter((x) => x !== value));
                  if (type === "brand") setSelectedBrands((p) => p.filter((x) => x !== value));
                  if (type === "type") setSelectedTypes((p) => p.filter((x) => x !== value));
                  if (type === "fabric") setSelectedFabrics((p) => p.filter((x) => x !== value));
                  if (type === "discount") setSelectedDiscounts((p) => p.filter((x) => x !== value));
                  if (type === "label") setSelectedLabels((p) => p.filter((x) => x !== value));
                  if (type === "price") {
                    setMinPrice(500);
                    setMaxPrice(2500);
                  }
                }}
              >
                {filter.value}
                <span className="ml-2">×</span>
              </span>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-[30px]">
            {loading ? <p>Loading...</p> : trendingProducts.length > 0 ? trendingProducts.slice(0, 2).map((p) => <TrandingCard key={p._id || p.id} product={p} />) : <p>No trending products found.</p>}
          </div>

          {/* Product grid receives filteredProducts */}
          <ProductGrid products={filteredProducts} />
        </main>
      </div>
    </Row>
  );
};

export default WomenCollections;
