// D:\mycara\frontend\src\components\shop\WomenCollections.jsx
import { Link } from 'react-router-dom';

import React, { useEffect, useState } from 'react';

import { ChevronDown, Sliders, X, Star, Plus, Minus } from 'lucide-react';
import { ChevronLeftIcon, MagnifyingGlassIcon, SlidersHorizontal, ChevronDown as LucideChevronDown, ListFilter } from '@heroicons/react/24/outline';
import CheckedIcon from "../icons/checked"; // your SVG component
import FilterIconComponent from "../icons/filter"; // Import it with a unique, capitalized name
import MobileFilterBar from './MobileFilterBar';

import ProductGrid from "./ProductGrid";

import SortByPage from './SortByPage'; 

import PlusIcon from "../icons/plus";
import MobileFilterModal from "./MobileFilterModal";
import DesktopFilters from './DesktopFilters';

import OriginalSortByIcon from "../icons/SortByIcon";

import { mockProducts} from './shopData';
import TrendingCard from './TrandingCard';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../features/products/productsThunk';


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



// ---------- Desktop Sort Bar ----------
const DesktopSortBar = ({ sortBy, setSortBy }) => (
    <div className="flex items-center gap-2 cursor-pointer rounded px-3 py-2">
        <SortByIcon />
        <span className="text-[16px] font-medium text-[#989696] font-sans">Sort By</span>
        <div className="relative">
          <select
  value={sortBy}
  onChange={(e) => setSortBy(e.target.value)}
  className="
    appearance-none 
    bg-white 
    text-black 
    py-2 
    pl-3 
    pr-10 
    rounded-[3px]
    shadow-[0_0_4px_0_rgba(0,0,0,0.25)] 
    focus:outline-none 
    focus:ring-2 
    focus:ring-[#F43297] 
    text-[16px]
    transition 
    duration-150 
    ease-in-out
  "
>

                <option value="popularity">Popularity</option>
                <option value="latest">Newest</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="rating">Average Rating</option>
                <option value="discounts">Discounts</option>
            </select>
            <CustomChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-black pointer-events-none" />
        </div>
    </div>
);
// ---------- Filter Item Components ----------
// --------------------- Sub-Components ---------------------
// --------------------- FilterItemCheckbox ---------------------
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
    <div
      className={`w-[15px] h-[15px] rounded border flex items-center justify-center
        ${isChecked ? 'bg-color border-color' : 'bg-white border-gray-400'}
      `}
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

const CollapsibleFilter = ({
  title,
  isSelected,
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
                            <button
                                onClick={onApplyClick || onReset}
                                className={`w-[100px] h-[40px] text-[18px] font-regular font-inter text-white bg-color rounded-[3px] transition shadow-md hidden lg:flex items-center justify-center`}
                            >
                                Reset
                            </button>
                             {/* Mobile: Filter (Apply) */}
                                <button
                                onClick={onApplyClick || onReset}
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

// <<<<<<< HEAD
// // ---------- Product Card ----------
// const ProductCard = ({ product }) => (
//  <Link
//     to="/products"
//     className="block relative group overflow-hidden bg-white transition-transform duration-300 "
//   >
//       <div className="w-full h-auto overflow-hidden">
//         <img
//           src={product.imageSrc}
//           alt={product.name}
//           className="w-full h-full object-cover aspect-[4/5] sm:aspect-square transition-transform duration-500"
//         />
//       </div>
//     <div className="absolute right-2 bottom-2 sm:right-4 sm:bottom-4
//                     w-11/12 max-w-[350px] h-[210px] lg:h-[231px] p-3 sm:p-5
//                     bg-white/70 backdrop-blur-sm transition-opacity duration-300 opacity-100
//                     flex flex-col justify-between">
//       <div className="flex justify-between items-start">
//         <div className="p-4">
//           <h3 className="text-[14px]  font-medium font-inter tracking-wider text-black uppercase leading-[23px]">
//             {product.name}
//           </h3>
//         </div>
//          <div className="p-4">
//      <button className="flex-shrink-0 flex items-center justify-center w-8 h-8  rounded-full transition duration-300 border border-white">
//   <PlusIcon className="w-[10px] h-[10px] text-black" />
// </button>
//         </div>
//       </div>
//       <div><div className="flex flex-col items-end pr-[30px]">
//   <p className="text-[14px] font-medium font-inter text-black">
//     RS {product.price ? product.price.toFixed(2) : "0.00"}
//   </p>
// </div>

//       </div>
//     </div>
//  </Link>
// );

// =======
// >>>>>>> 05356209fcdb09ac6cf464f3c1ddc506b82b0aaa

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
            <div className=" space-y-6  overflow-y-auto px-3 py-3">
                <div className="relative h-1 w-full rounded-full" style={{ backgroundColor: "rgba(210, 175, 159, 0.3)" }}>


               



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




// --------------------- Main Component ---------------------
const WomenCollections = ({products}) => {
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
   

    const [isSortOpen, setIsSortOpen] = useState(false);
    const [selectedSort, setSelectedSort] = useState('popularity'); // 'popularity' is a good default
    const [currentSortValue, setCurrentSortValue] = useState('popularity'); // 'popularity' is the value used by SortByPage
    const [isSortByOpen, setIsSortByOpen] = useState(false); 
    const [currentSortLabel, setCurrentSortLabel] = useState('Popularity');
    
    // --- New Mobile State ---
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

//      const dispatch = useDispatch();
//   const { items: products = [], loading = false, error = null } = useSelector(
//   (state) => state.products || {}
// );
//   useEffect(() => {
//     dispatch(fetchProducts());
//   }, [dispatch]);


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


    const handleSortClick = () => {
        setIsSortByOpen(true);
    };


    const handleCloseSortBy = () => {
        setIsSortByOpen(false);
    };


    const handleSelectSort = (value, label) => {
        setCurrentSortValue(value);
        setCurrentSortLabel(label);
        
        // handleCloseSortBy(); // bottom sheet off 
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
     const showingResults = products.length;

   

    return (
        <div className=" w-full container-1440 mx-auto lg:mt-[80px] py-3 px-3">
               

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

           
                <div className="mb-3 lg:hidden">
   
                         {/* MobileFilterBar - અહીં onSortClick Pass થાય છે */}
        
                <MobileFilterBar
                    sortBy={currentSortLabel} // ✅ અહીં currentSortLabel દેખાશે
                    filterCount={filterCount}
                    onSortClick={handleSortClick} // ✅ ક્લિક થતાં handleSortClick (setIsSortByOpen(true)) Call થશે
                    onFilterClick={handleFilterClick}
                    isHidden={isSortByOpen}
                />
            
            
   
            <SortByPage
        isOpen={isSortByOpen}
        onClose={() => setIsSortByOpen(false)} // ✅ closes modal and shows MobileFilterBar
        selectedSort={currentSortValue}
        onSelectSort={(value, label) => {
            setCurrentSortValue(value);
            setCurrentSortLabel(label);
            setIsSortByOpen(false); // ✅ hide modal after selection
        }}
    />
            </div>
            <div className="flex flex-col lg:flex-row gap-[30px]">
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
                        <div className="hidden lg:block text-[16px] ">
  <span className="text-[#989696] font-inter">Showing </span>
  <span className="font-medium text-black font-inter">{showingResults}</span>
  <span className="text-[#989696] font-inter"> results from total </span>
  <span className="font-medium text-black font-inter">{totalResults}</span>
  <span className="text-[#989696] font-inter"> for "</span>
  <span className="font-medium text-black font-inter">Saree</span>
  <span className="text-[#989696] font-inter">"</span>
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
                            <TrendingCard key={product.id} product={product} />
                        ))}
                    </div>
                    
                    <ProductGrid />
               

                </main>

            </div>



        </div>
    );
};

export default WomenCollections;