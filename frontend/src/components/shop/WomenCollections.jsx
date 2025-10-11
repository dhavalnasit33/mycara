// D:\mycara\frontend\src\components\shop\WomenCollections.jsx
import { Link } from 'react-router-dom';

import React, { useState } from 'react';

import { ChevronDown, Sliders, X, Star, Plus, Minus } from 'lucide-react';
import { ChevronLeftIcon, MagnifyingGlassIcon, SlidersHorizontal, ChevronDown as LucideChevronDown, ListFilter } from '@heroicons/react/24/outline';

import FilterIconComponent from "../icons/filter"; // Import it with a unique, capitalized name

import ProductGrid from './ProductGrid';
import SortByPage from './SortByPage'; 

import MobileFilterModal from "./MobileFilterModal";
import DesktopFilters from './DesktopFilters';

import OriginalSortByIcon from "../icons/SortByIcon";

import { mockProducts} from './shopData';


export { CollapsibleFilter, FilterItemCheckbox, SizeFilterItem, ColorFilterItem, PriceRangeFilter };

// --- Utility function to convert Sort Value to Display Label ---
const getSortLabel = (sortValue) => {
    switch (sortValue) {
        case 'popularity': return 'Popularity';
        case 'latest': return 'Newest'; // Mapped 'latest' to 'Newest' for display
        case 'rating': return 'Average Rating';
        case 'price_asc': return 'Price L-H';
        case 'price_desc': return 'Price H-L';
        case 'discounts': return 'Discounts';
        default: return 'Popularity';
    }
};

const BORDER_COLOR_CLASS = "border-pink-600";

// ---------- Icon Wrappers ----------
const SortByIcon = (props) => (<OriginalSortByIcon {...props} className="h-4 w-4 md:text-gray-500" />);
const CustomChevronDown = (props) => ( <ChevronDown {...props} />);
const Filter = (props) => (<FilterIconComponent {...props} />);

// ---------- Mobile Filter Bar ----------

// --- 1. Mobile Responsive UI (Filter Bar) ---
// const MobileFilterBar = ({ sortBy, filterCount, onSortClick, onFilterClick }) => (
//     <div className="flex justify-center items-center w-full mx-auto gap-4 sm:gap-2">
//         <div className="rounded-[10px] cursor-pointer transition duration-300 border border-[#989696] drop-shadow-[0_0_4px_rgba(0,0,0,0.1)] bg-white w-[140px] sm:w-[180px] md:w-[200px] "
//             onClick={onSortClick}
//         >
//             <div className="flex items-center justify-between py-2 px-3 sm:py-3 sm:px-4">
//                 <div>
//                     <div className="text-base sm:text-lg font-inter font-semibold text-black/70">Sort By</div>
//                     <div className="text-xs sm:text-sm font-inter font-medium mt-0.5 text-[#989696]">{sortBy}</div>
//                 </div>
//                 <SortByIcon className="h-5 w-5 sm:h-6 sm:w-6 text-black/70" />
//             </div>
//         </div>
//         <div className={`bg-color rounded-[10px] shadow-lg cursor-pointer transition duration-300 hover:shadow-xl text-white w-[140px] sm:w-[180px] md:w-[200px]`}
//             onClick={onFilterClick}
//         >
//             <div className="flex items-center justify-between py-2 px-3 sm:py-3 sm:px-4">
//                 <div>
//                     <div className="text-base sm:text-lg font-inter font-semibold">Filter</div>
//                     <div className="flex items-center mt-0.5">
//                         <span className="text-xs sm:text-sm font-inter font-medium">Applied</span>
//                         <span className="ml-2 px-2 py-0.5 bg-white text-black/70 font-semibold rounded-full text-xs">
//                             {filterCount}
//                         </span>
//                     </div>
//                 </div>
//                 <Filter className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
//             </div>
//         </div>
//     </div>
// );


// ---------- Desktop Sort Bar ----------
const DesktopSortBar = ({ sortBy, setSortBy }) => (
    <div className="flex items-center gap-2 cursor-pointer rounded px-3 py-2">
        <SortByIcon />
        <span className="text-base font-medium text-gray-700">Sort By</span>
        <div className="relative">
            <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-white border border-gray-300 text-gray-700 py-2 pl-3 pr-10 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 text-sm transition duration-150 ease-in-out"
            >
                <option value="popularity">Popularity</option>
                <option value="latest">Newest</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="rating">Average Rating</option>
                <option value="discounts">Discounts</option>
            </select>
            <CustomChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
        </div>
    </div>
);
// ---------- Filter Item Components ----------
// --------------------- Sub-Components ---------------------
// --------------------- FilterItemCheckbox ---------------------
const FilterItemCheckbox = ({ name, count, isChecked, onChange }) => (
    <label className="flex items-center justify-between cursor-pointer p-1 rounded ">
        <div className="flex items-center">
            <input
                type="checkbox"
                name={name}
                checked={isChecked}

                onChange={() => onChange(name)}
                className={` w-[15px] h-[15px] rounded border border-gray-400 cursor-pointer appearance-none checked:bg-color checked:bg-pink-600 checked:border-pink-600 checked:after:content-['✓'] checked:after:text-white checked:after:block checked:after:text-xs checked:after:text-center`} />
            <span className="ml-3 text-[14px] font-inter text-[rgba(0,0,0,0.7)]">{name}</span>
        </div>

        {count !== undefined && (
            <span className="text-[14px] font-regular font-inter text-[#989696]">{count}</span>
        )}
    </label>
);

// --------------------- SizeFilterItem ---------------------
const SizeFilterItem = ({ name, isChecked, onChange }) => (
    <label className="flex items-center cursor-pointer p-1 rounded w-1/2">
        <input
            type="checkbox"
            name={name}
            checked={isChecked}
            onChange={onChange}
            className={`
             w-5 h-5 rounded border border-gray-400 cursor-pointer
             appearance-none
             checked:bg-color checked:${BORDER_COLOR_CLASS}
             checked:after:content-['✓'] checked:after:text-white checked:after:block checked:after:text-xs checked:after:text-center
           `}
        />
        <span className="ml-3 text-[14px] font-inter text-[rgba(0,0,0,0.7)] font-regular">{name}</span>
    </label>
);

// --------------------- ColorFilterItem ---------------------
const ColorFilterItem = ({ name, hex, isChecked, onChange, border }) => {
    const dropShadowStyle = `drop-shadow(0px 0px 4px rgba(0, 0, 0, 0.25))`;
    return (
        <div
            className="flex flex-col items-center p-1 cursor-pointer w-1/6"
            onClick={() => onChange(name)}
        >
            <div
                className={`w-[22px] h-[22px] rounded-full transition-all duration-150
                     ${border ? 'border border-gray-300' : ''}
                     ${isChecked ? `ring-2 ring-pink-500 ring-offset-2` : ''}
                 `}
                style={{
                    backgroundColor: hex,
                    filter: dropShadowStyle
                }}
            >
            </div>
            <span className="text-[10px] text-[#989696] font-regular mt-1">{name}</span>
        </div>
    );
};

// ---------- Collapsible Filter ----------
const CollapsibleFilter = ({ title, isSelected, onReset, children, onCancelClick, onApplyClick, defaultOpen = false, showButtons = true }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);
    const handleToggle = () => {
        setIsOpen(!isOpen);
    };
    const handleClose = () => {
        setIsOpen(false);
        if (onCancelClick) {
            onCancelClick();
        }
    };

    
    return (
        <div className="px-4 py-2 border-gray-200">
            <div className={` border rounded-[10px] px-4 py-3 items-center justify-between cursor-pointer flex
                 ${isOpen ? 'border-transparent' : 'border-gray-200'}
                 `}
                style={{

                    backgroundColor: isOpen ? 'rgba(210, 175, 159, 0.3)' : 'transparent'
                }}
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
                <div className="p-4 space-y-1">
                    {children}
                    {showButtons && (
                        <div className="flex gap-4 mt-4 pt-4 border-t border-gray-200 ">
                            <button onClick={onCancelClick || handleClose}
                                className="w-[100px] h-[40px] text-[18px] font-regular font-inter text-black/70 border border-[#989696] rounded-[3px] transition"
                            > Cancel
                            </button>
                            <button
                                onClick={onApplyClick || onReset}
                                className={`w-[100px] h-[40px] text-[18px] font-regular font-inter text-white bg-color rounded-[3px] transition shadow-md`}
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

// ---------- Product Card ----------
const ProductCard = ({ product }) => (
 <Link
    to="/products"
    className="block relative group overflow-hidden bg-white transition-transform duration-300 hover:scale-[1.02]"
  >
      <div className="w-full h-auto overflow-hidden">
        <img
          src={product.imageSrc}
          alt={product.name}
          className="w-full h-full object-cover aspect-[4/5] sm:aspect-square transition-transform duration-500"
        />
      </div>
    <div className="absolute right-2 bottom-2 sm:right-4 sm:bottom-4
                    w-11/12 max-w-[350px] h-[210px] lg:h-[231px] p-3 sm:p-5
                    bg-white/70 backdrop-blur-sm transition-opacity duration-300 opacity-100
                    flex flex-col justify-between">
      <div className="flex justify-between items-start">
        <div className="pr-2 sm:pr-4">
          <h3 className="text-xs sm:text-sm font-medium font-inter tracking-wider text-black uppercase leading-tight">
            {product.name}
          </h3>
        </div>
        <button className="flex-shrink-0 flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 rounded-full shadow-lg transition duration-300 border border-white bg-pink-500/10 hover:bg-pink-500/20">
          <span className="text-lg font-bold text-black leading-none pb-0.5">+</span>
        </button>
      </div>
      <div>
        <p className="text-sm font-medium font-inter text-black">
          RS {product.price ? product.price.toFixed(2) : "0.00"}
        </p>
      </div>
    </div>
 </Link>
);


// ---------- Price Range Filter ----------
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
            <div className="px-2 py-2 space-y-6">
                <div className="relative h-1 w-full bg-gray-200 rounded-full">
                    {/* Highlighted range */}
                    <div
                        className="absolute h-1 bg-color rounded-full top-0"
                        style={{
                            left: `${(minPrice / MAX_PRICE) * 100}%`,
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
    {/* Min thumb */}
<div
    className="absolute w-[12px] h-[12px] rounded-full bg-color top-1/2 transform -translate-y-1/2 shadow-md flex items-center justify-center"
    style={{ left: `calc(${(minPrice / MAX_PRICE) * 100}% - 8px)` }}
>
    <div className="w-1.5 h-1.5 rounded-full bg-white"></div> {/* small white dot */}
</div>

{/* Max thumb */}
<div
    className="absolute w-[12px] h-[12px] rounded-full bg-color top-1/2 transform -translate-y-1/2 shadow-md flex items-center justify-center"
    style={{ left: `calc(${(maxPrice / MAX_PRICE) * 100}% - 8px)` }}
>
    <div className="w-1.5 h-1.5 rounded-full bg-white"></div> {/* small white dot */}
</div>

                </div>

                {/* Price Labels */}
                <div className="flex justify-between text-center">
                    <div className="flex flex-col items-start">
                        <span className="font-inter text-[#989696] text-[14px] font-regular">Min</span>
                        <div className="mt-2 w-[100px] h-[40px] flex items-center justify-center border border-gray-300 rounded-lg text-black font-inter text-[14px] font-regular">
                            Rs {minPrice}
                        </div>
                    </div>

                    <div className="flex flex-col items-end">
                        <span className="font-inter text-[#989696] text-[14px] font-regular">Max</span>
                        <div className="mt-2 w-[100px] h-[40px] flex items-center justify-center border border-gray-300 rounded-lg font-inter text-black text-[14px] font-regular">
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




// --------------------- Main Component ---------------------
const WomenCollections = () => {
    // Filter States
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

        // --- NEW SORT STATES ---
   const [currentSortValue, setCurrentSortValue] = useState('popularity'); // 'popularity' is the value used by SortByPage
    const [isSortSheetOpen, setIsSortSheetOpen] = useState(false); // State for the SortByPage modal

       const [isSortOpen, setIsSortOpen] = useState(false);
    const [selectedSort, setSelectedSort] = useState('popularity'); // 'popularity' is a good default

    // --- New Mobile State ---
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);


    const calculateFilterCount = () => {
        let count = selectedCategories.length + selectedSizes.length + selectedColors.length + selectedBrands.length +
            selectedTypes.length + selectedFabrics.length + selectedDiscounts.length + selectedLabels.length;

        if (minPrice !== 500 || maxPrice !== 2500) {
            count += 1;
        }
        return count;
    };

    const filterCount = calculateFilterCount(); 
    // --- Filter Handlers ---
    const createToggleHandler = (setState) => (name) => { 
        setState(prev =>
            prev.includes(name)
                ? prev.filter(item => item !== name)
                : [...prev, name]
        );
    };

    const handleCategoryChange = createToggleHandler(setSelectedCategories);
    const handleSizeChange = createToggleHandler(setSelectedSizes);

    const handleColorChange = createToggleHandler(setSelectedColors);

    const handleBrandChange = createToggleHandler(setSelectedBrands);
    const handleTypeChange = createToggleHandler(setSelectedTypes);
    const handleFabricChange = createToggleHandler(setSelectedFabrics);
    const handleDiscountChange = createToggleHandler(setSelectedDiscounts);
    const handleLabelChange = createToggleHandler(setSelectedLabels);

     // --- SORT HANDLERS (New Logic) ---
            const handleSortClick = () => {
            setIsSortSheetOpen(true); // Open the Sort By Bottom Sheet
            };
            
           const handleSelectSort = (sortValue) => {
    setSelectedSort(sortValue);
    setIsSortOpen(false); // Close the bottom sheet after selection
    // You would typically call an API or update a global state here to fetch/sort products
    console.log(`Sorting products by: ${sortValue}`); 
};
    
    const handleFilterClick = () => {
        setIsMobileFilterOpen(true);
    }
    const handleCloseMobileFilter = () => {
        setIsMobileFilterOpen(false);
    }
    const handleApplyAllFilters = () => {
        console.log("Applying all filters and closing modal.");
        setIsMobileFilterOpen(false);
    };


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
    const handleResetCategories = () => setSelectedCategories([]);
    const handleResetSizes = () => setSelectedSizes([]);
    const handleResetColors = () => setSelectedColors([]);
    const handleResetBrands = () => setSelectedBrands([]);

    const handleResetTypes = () => setSelectedTypes([]);
    const handleResetFabrics = () => setSelectedFabrics([]);
    const handleResetDiscounts = () => setSelectedDiscounts([]);
    const handleResetLabels = () => setSelectedLabels([]);
    const handleResetPrice = () => { setMinPrice(500); setMaxPrice(2500); }; 

    // --- Clear All Filters ---
    const handleClearAllFilters = () => {
        handleResetCategories();
        handleResetSizes();
        handleResetColors();
        handleResetBrands();
        handleResetTypes();
        handleResetFabrics();
        handleResetDiscounts();
        handleResetLabels();
        handleResetPrice();
    };

    const currentFilters = [
        ...selectedCategories.map(cat => ({ type: 'category', value: cat })),
        ...selectedSizes.map(size => ({ type: 'size', value: size })),
        ...selectedColors.map(color => ({ type: 'color', value: color })),
        ...selectedBrands.map(brand => ({ type: 'brand', value: brand })),

        ...selectedTypes.map(type => ({ type: 'type', value: type })),
        ...selectedFabrics.map(fabric => ({ type: 'fabric', value: fabric })),
        ...selectedDiscounts.map(discount => ({ type: 'discount', value: discount })),
        ...selectedLabels.map(label => ({ type: 'label', value: label })),
        ...(minPrice !== 500 || maxPrice !== 2500 ? [{ type: 'price', value: `Rs ${minPrice} - Rs ${maxPrice}` }] : []),
    ];

    const isCategorySelected = selectedCategories.length > 0;
    const totalResults = 100;
    const showingResults = mockProducts.length;

     const currentSortLabel = getSortLabel(currentSortValue);

    return (
        <div className=" w-full container-1440 mx-auto py-2 px-3 lg:px-0 lg:py-10  ">
            <MobileFilterModal
                isOpen={isMobileFilterOpen}
                onClose={handleCloseMobileFilter}
                selectedCategories={selectedCategories} handleCategoryChange={handleCategoryChange} handleResetCategories={handleResetCategories}
                selectedSizes={selectedSizes} handleSizeChange={handleSizeChange} handleResetSizes={handleResetSizes}
                selectedColors={selectedColors} handleColorChange={handleColorChange} handleResetColors={handleResetColors}
                selectedBrands={selectedBrands} handleBrandChange={handleBrandChange} handleResetBrands={handleResetBrands}
                selectedTypes={selectedTypes} handleTypeChange={handleTypeChange} handleResetTypes={handleResetTypes}
                selectedFabrics={selectedFabrics} handleFabricChange={handleFabricChange} handleResetFabrics={handleResetFabrics}
                selectedDiscounts={selectedDiscounts} handleDiscountChange={handleDiscountChange} handleResetDiscounts={handleResetDiscounts}
                selectedLabels={selectedLabels} handleLabelChange={handleLabelChange} handleResetLabels={handleResetLabels}
                minPrice={minPrice} setMinPrice={setMinPrice} maxPrice={maxPrice} setMaxPrice={setMaxPrice}
                applyAllFilters={handleApplyAllFilters}
                onClearAll={handleClearAllFilters} //
            />


            <div className="flex justify-between items-center py-2 mb-4 lg:hidden">
                <div className=" w-full">

                   

                    <div className="flex items-center py-2 space-x-2">
                        <button className="flex items-center justify-center w-8 h-8 rounded-[3px] border border-[#D2AF9F] shadow-sm bg-white/70 backdrop-blur-sm">
                            <ChevronLeftIcon className="w-5 h-5 text-black cursor-pointer" />
                        </button>

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

            <h1 className="text-[22px] font-semibold font-inter mb-2 ">Women's Collections</h1>
            <p className="text-sm text-gray-600 mb-8">
                <span className="text-black border-b border-black lg:border-none"><Link to="/home">Home</Link></span>
                <span className="text-black "> / </span>
                <span className="font-regular text-[#989696]">Shop</span>
            </p>

            <div className="flex flex-col lg:flex-row gap-[30px]">
 {/* <MobileFilterBar
                    sortBy={currentSortLabel} // ✅ અહીંયા સુધારો કર્યો છે: currentSortLabel પાસ કર્યું
                    filterCount={filterCount}
                    onSortClick={handleSortClick}
                    onFilterClick={handleFilterClick}
                     /> */}
            <DesktopFilters
                    selectedCategories={selectedCategories}
                    handleCategoryChange={handleCategoryChange}
                    handleResetCategories={handleResetCategories}
                    selectedSizes={selectedSizes}
                    handleSizeChange={handleSizeChange}
                    handleResetSizes={handleResetSizes}
                    selectedColors={selectedColors}
                    handleColorChange={handleColorChange}
                    handleResetColors={handleResetColors}
                    selectedBrands={selectedBrands}
                    handleBrandChange={handleBrandChange}
                    handleResetBrands={handleResetBrands}
                    selectedTypes={selectedTypes}
                    handleTypeChange={handleTypeChange}
                    handleResetTypes={handleResetTypes}
                    selectedFabrics={selectedFabrics}
                    handleFabricChange={handleFabricChange}
                    handleResetFabrics={handleResetFabrics}
                    selectedDiscounts={selectedDiscounts}
                    handleDiscountChange={handleDiscountChange}
                    handleResetDiscounts={handleResetDiscounts}
                    selectedLabels={selectedLabels}
                    handleLabelChange={handleLabelChange}
                    handleResetLabels={handleResetLabels}
                    minPrice={minPrice}
                    setMinPrice={setMinPrice}
                    maxPrice={maxPrice}
                    setMaxPrice={setMaxPrice}
                    isCategorySelected={selectedCategories.length > 0}
                />

                <main className="w-full lg:w-3/4">
                    <div className="flex justify-between items-center mb-6">
                        <div className="hidden lg:block text-sm text-gray-700">
                            Showing <span className="font-semibold">{showingResults}</span> results from total <span className="font-semibold">{totalResults}</span> for "<span className="font-bold">Saree</span>"
                        </div>
                        <div className=" sm:flex lg:hidden">
        
                        </div>
                        <div className="hidden lg:flex justify-end">
                            <DesktopSortBar sortBy={currentSortValue} setSortBy={setCurrentSortValue} />
                        </div>
                    </div>

                    {/* Active Filters Display */}
                    <div className="hidden sm:flex flex-wrap items-center gap-2 mb-6">
                        <span onClick={handleClearAllFilters} className={`text-[16px] font-sanss font-medium text-[#989696] mr-2 border-b border-[#989696] cursor-pointer`}>Clear Filters:</span>
                            {currentFilters.map((filter, index) => (
                            <span
                                key={index}
                                className={`theme-border text-theme  border border-gray-300 px-4 py-1 rounded-[5px] cursor-pointer inline-flex items-center `}
                                onClick={() => handleClearFilter(filter.type, filter.value)}
                            >
                                {filter.value}

                                <X className={`w-4 h-4 ml-2 text-theme `} />
                            </span>
                        ))}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                        {mockProducts.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                    
                    <ProductGrid />
               

                </main>

            </div>
                             {/* MOBILE BOTTOM BAR (FIXED) */}
           
            
            {/* SORT BY BOTTOM SHEET MODAL (NEW ADDITION) */}

<SortByPage 
    isOpen={isSortOpen}
    onClose={() => setIsSortOpen(false)}
    selectedSort={selectedSort} // <-- This is the correct state variable
    onSelectSort={handleSelectSort}
/>
        </div>
    );
};

export default WomenCollections;