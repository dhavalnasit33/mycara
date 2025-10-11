// D:\mycara\frontend\src\components\shop\WomenCollections.jsx

import React, { useState } from 'react';
import ProductGrid from './ProductGrid';
import shopsaree1 from '../../assets/shopsaree1.jpg';
import shopsaree2 from '../../assets/shopsaree2.jpg';
import OriginalSortByIcon from "../icons/SortByIcon";
import { ChevronDown, X, Plus, Minus, ChevronLeftIcon } from 'lucide-react';
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import FilterIconComponent from "../icons/filter";
import { Link } from 'react-router-dom';
import Row from '../ui/Row';

const TEXT_COLOR_CLASS = "text-pink-600";
const BORDER_COLOR_CLASS = "border-pink-600";

const SortByIcon = (props) => (
    <OriginalSortByIcon {...props} className="h-4 w-4 md:text-gray-500" />
);

const CustomChevronDown = (props) => (
    <ChevronDown {...props} />
);

const Filter = (props) => (
    <FilterIconComponent {...props} />
);

// --- 1. Mobile Responsive UI (Filter Bar) ---
const MobileFilterBar = ({ sortBy, filterCount, onSortClick, onFilterClick }) => (
    <div className="flex justify-center items-center w-full mx-auto gap-4 sm:gap-2">
        <div className="rounded-[10px] cursor-pointer transition duration-300 border border-[#989696] drop-shadow-[0_0_4px_rgba(0,0,0,0.1)] bg-white w-[140px] sm:w-[180px] md:w-[200px] "
            onClick={onSortClick}
        >
            <div className="flex items-center justify-between py-2 px-3 sm:py-3 sm:px-4">
                <div>
                    <div className="text-base sm:text-lg font-inter font-semibold text-black/70">Sort By</div>
                    <div className="text-xs sm:text-sm font-inter font-medium mt-0.5 text-[#989696]">{sortBy}</div>
                </div>
                <SortByIcon className="h-5 w-5 sm:h-6 sm:w-6 text-black/70" />
            </div>
        </div>
        <div className={`bg-color rounded-[10px] shadow-lg cursor-pointer transition duration-300 hover:shadow-xl text-white w-[140px] sm:w-[180px] md:w-[200px]`}
            onClick={onFilterClick}
        >
            <div className="flex items-center justify-between py-2 px-3 sm:py-3 sm:px-4">
                <div>
                    <div className="text-base sm:text-lg font-inter font-semibold">Filter</div>
                    <div className="flex items-center mt-0.5">
                        <span className="text-xs sm:text-sm font-inter font-medium">Applied</span>
                        <span className="ml-2 px-2 py-0.5 bg-white text-black/70 font-semibold rounded-full text-xs">
                            {filterCount}
                        </span>
                    </div>
                </div>
                <Filter className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
            </div>
        </div>
    </div>
);

// --- 2. Desktop UI (Refactored to accept props) ---
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
                <option value="Popularity">Popularity</option>
                <option value="Newest">Newest</option>
                <option value="Price: Low to High">Price: Low to High</option>
                <option value="Price: High to Low">Price: High to Low</option>
            </select>
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
    { name: 'Black', hex: '#000000', border: true }, 
    { name: 'Peach', hex: '#FFD379' },
    { name: 'Brown', hex: '#964B00' },
    { name: 'Red', hex: '#E10404' },
    { name: 'Gray', hex: '#808080' },
    { name: 'Orange', hex: '#FF9000' },
    { name: 'Rust', hex: '#289E3A' }, 
    { name: 'Beige', hex: '#FFC0CB' }, 
    { name: 'Teal', hex: '#800080' },
    { name: 'Magnt', hex: '#FF00FF' }, 
    { name: 'Green', hex: '#008000' },
    { name: 'Pink', hex: '#A363E2' },
    { name: 'Maruti', hex: '#A0392F' },
    { name: 'Blue', hex: '#0000FF' },
    { name: 'White', hex: '#FFFFFF', border: true }, 
    { name: 'Purple', hex: '#800080' },
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

const SingleCard = ({ product }) => (
 <Link
    to="/products"
    className="block relative group overflow-hidden bg-white transition-transform duration-300 hover:scale-[1.02]"
  >
      <div className="w-full h-auto overflow-hidden">
        <img
          src={product.imageSrc}
          alt={product.name}
          className="w-full h-auto custom-lg:h-[553px]   transition-transform duration-500"
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

const PriceRangeFilter = ({ minPrice, maxPrice, setMinPrice, setMaxPrice, isMobile = false }) => {
    const MAX_PRICE = 5000;
    const DEFAULT_MIN = 500;
    const DEFAULT_MAX = 2500;
    const isRangeSelected = minPrice !== DEFAULT_MIN || maxPrice !== DEFAULT_MAX;

    const handleSliderChange = (e) => {
        const value = parseInt(e.target.value);

        if (e.target.id === 'min') {
            setMinPrice(Math.min(value, maxPrice - 100));
        } else if (e.target.id === 'max') {
            setMaxPrice(Math.max(value, minPrice + 100));
        }
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
                <div className="relative h-1 w-full bg-gray-200 rounded-full ">
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gray-200 rounded-full"></div>
                    <div
                        className={`absolute bg-color h-1 rounded-full top-0`}
                        style={{
                            left: `${(minPrice / MAX_PRICE) * 100}%`,
                            right: `${100 - (maxPrice / MAX_PRICE) * 100}%`,
                        }}
                    ></div>
                    <input
                        id="min"
                        type="range"
                        min="0"
                        max={MAX_PRICE}
                        value={minPrice}
                        onChange={handleSliderChange}

                        className="range-slider-thumb absolute top-0 w-full opacity-0 cursor-pointer"
                        style={{ zIndex: minPrice === MAX_PRICE ? 5 : 4 }}
                    />
                    <input
                        id="max"
                        type="range"
                        min="0"
                        max={MAX_PRICE}
                        value={maxPrice}
                        onChange={handleSliderChange}

                        className="range-slider-thumb absolute top-0 w-full opacity-0 cursor-pointer"
                    /> 
                    <div
                        className={`absolute w-4 h-4 rounded-full bg-color top-1/2 transform -translate-y-1/2 shadow-md`}
                        style={{ left: `${(minPrice / MAX_PRICE) * 100}%`, marginLeft: '-8px' }}
                    ></div>
                    <div
                        className={`absolute w-4 h-4 rounded-full bg-color top-1/2 transform -translate-y-1/2 shadow-md`}
                        style={{ left: `${(maxPrice / MAX_PRICE) * 100}%`, marginLeft: '-8px' }}
                    ></div>

                </div>
                <div className="block xl:flex justify-center text-center gap-[15px]">
                    <div className="flex flex-col items-center xl:items-start">
                        <span className="font-inter text-[#989696] text-[14px] font-regular">Min</span>
                        <div className="mt-2 w-[110px] h-[35px] flex items-center justify-center border border-gray-300 rounded-[30px] text-black font-inter text-[14px] font-regular">
                            Rs {minPrice}
                        </div>
                    </div>

                    <div className="flex flex-col items-center xl:items-end">
                        <span className="font-inter text-[#989696] text-[14px] font-regular">Max</span>
                        <div className="mt-2 w-[110px] h-[35px] flex items-center justify-center border border-gray-300 rounded-[30px] font-inter text-black  text-[14px] font-regular">
                            Rs {maxPrice}
                        </div>
                    </div>
                </div>
                {isMobile && (
                    <div className="flex gap-4 mt-4 pt-4 border-t border-gray-200 ">
                        <button
                            onClick={handleReset}
                            className="w-[100px] h-[40px] text-[18px] font-regular font-inter text-black/70 border border-[#989696] rounded-[3px] transition"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={() => console.log('Price Filter Applied')} // Actual application logic
                            className={`w-[100px] h-[40px] text-[18px] font-regular font-inter text-white bg-color rounded-[3px] transition shadow-md`}
                        >
                            Filter
                        </button>
                    </div>
                )}
            </div>
        </CollapsibleFilter>
    );
};

// --- New Mobile Filter Modal Component (Based on the image) ---
const MobileFilterModal = ({
    isOpen, onClose,
    selectedCategories, handleCategoryChange, handleResetCategories,
    selectedSizes, handleSizeChange, handleResetSizes,
    selectedColors, handleColorChange, handleResetColors,
    selectedBrands, handleBrandChange, handleResetBrands,
    selectedTypes, handleTypeChange, handleResetTypes,
    selectedFabrics, handleFabricChange, handleResetFabrics,
    selectedDiscounts, handleDiscountChange, handleResetDiscounts,
    selectedLabels, handleLabelChange, handleResetLabels,
    minPrice, setMinPrice, maxPrice, setMaxPrice,
}) => {
    if (!isOpen) return null;

    // const MobileFilterButtons = ({ onCancel, onFilter }) => (
    //     <div className="flex gap-4 mt-4 pt-4 border-t border-gray-200 ">
    //         <button
    //             onClick={onCancel}
    //             className="w-[100px] h-[40px] text-[18px] font-regular font-inter text-black/70 border border-[#989696] rounded-[3px] transition"
    //         >
    //             Cancel
    //         </button>
    //         <button
    //             onClick={onFilter}
    //             className={`w-[100px] h-[40px] text-[18px] font-regular font-inter text-white bg-color rounded-[3px] transition shadow-md`}
    //         >
    //             Filter
    //         </button>
    //     </div>
    // );

    return (
         <>
            <div  className="fixed inset-0 z-40 bg-black/60 lg:hidden transition-opacity duration-300" 
                onClick={onClose} >
            </div>
       
                   <div 
                className={`
                    fixed top-0 left-0 z-50 bg-white lg:hidden overflow-y-auto w-4/5 h-full max-w-md 
                    transition-transform duration-500 ease-in-out
                    ${isOpen ? 'translate-x-0' : '-translate-x-full'}
                `}
            >
            <div className="w-full h-full">

            <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-start items-center z-10">
                <button 
                    onClick={onClose} 
                    className="flex items-center space-x-1 p-1 font-inter text-base sm:text-lg font-semibold text-black/90 hover:text-black"
                >
                    <X className="w-5 h-5 text-black" />
                    CLOSE
                </button>
            </div>

                <div className="">
                    <CollapsibleFilter
                        title="Category"
                        defaultOpen={true}
                        isSelected={selectedCategories.length > 0}
                        showButtons={true}
                        onCancelClick={handleResetCategories}
                        onApplyClick={onClose} 
                    >
                       <div className="space-y-1 h-[130px] overflow-y-auto hide-scrollbar ">
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
                    </CollapsibleFilter>
                    <PriceRangeFilter
                        minPrice={minPrice}
                        maxPrice={maxPrice}
                        setMinPrice={setMinPrice}
                        setMaxPrice={setMaxPrice}
                        isMobile={true}
                    />
                    <CollapsibleFilter
                        title="Size"
                        isSelected={selectedSizes.length > 0}
                        showButtons={true}
                        onCancelClick={handleResetSizes}
                        onApplyClick={onClose} 
                    >
                        <div className="flex flex-wrap ">
                            {mockSizes.map(size => (
                                <SizeFilterItem
                                    key={size}
                                    name={size}
                                    isChecked={selectedSizes.includes(size)}
                                    onChange={() => handleSizeChange(size)}
                                />
                            ))}
                        </div>
                    </CollapsibleFilter>
                    <CollapsibleFilter
                        title="Color"
                        isSelected={selectedColors.length > 0}
                        showButtons={true}
                        onCancelClick={handleResetColors}
                        onApplyClick={onClose} 
                    >
                        <div className="">
                            <div className="flex flex-wrap">
                                {mockColors.map(color => (
                                    <ColorFilterItem
                                        key={color.name}
                                        name={color.name}
                                        hex={color.hex}
                                        border={color.border}
                                        isChecked={selectedColors.includes(color.name)}
                                        onChange={handleColorChange}
                                    />
                                ))}
                            </div>
                        </div>
                    </CollapsibleFilter>

                    <CollapsibleFilter
                        title="Brands"
                        isSelected={selectedBrands.length > 0}
                        showButtons={true}
                        onCancelClick={handleResetBrands}
                        onApplyClick={onClose}
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

                    {/* Type Filter */}
                    <CollapsibleFilter
                        title="Type"
                        isSelected={selectedTypes.length > 0}
                        showButtons={true}
                        onCancelClick={handleResetTypes}
                        onApplyClick={onClose}
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

                    <CollapsibleFilter
                        title="Fabric"
                        isSelected={selectedFabrics.length > 0}
                        showButtons={true}
                        onCancelClick={handleResetFabrics}
                        onApplyClick={onClose} 
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

                    <CollapsibleFilter
                        title="Discounts"
                        isSelected={selectedDiscounts.length > 0}
                        showButtons={true}
                        onCancelClick={handleResetDiscounts}
                        onApplyClick={onClose} 
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

                    <CollapsibleFilter
                        title="Product Label"
                        isSelected={selectedLabels.length > 0}
                        showButtons={true}
                        onCancelClick={handleResetLabels}
                        onApplyClick={onClose} 
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
                </div>
            </div>
        </div>
         </>
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

    const [sortBy, setSortBy] = useState('Popularity');

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

    const handleSortClick = () => console.log('Mobile Sort Clicked. Implement modal/popup logic here.');
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

    return (
        <div className=" w-full  py-2 px-3 lg:px-0 lg:py-10  ">
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


            <div className="flex justify-between items-center py-2  mb-4 lg:hidden">
                <div className=" w-full">
                    <div className="flex items-center py-2  space-x-2">
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
            <Row>
                <h1 className="text-[22px] font-semibold font-inter mb-2 ">Women's Collections</h1>
                <p className="text-sm text-gray-600 mb-8">
                    <span className="text-black border-b border-black lg:border-none"><Link to="/home">Home</Link></span>
                    <span className="text-black "> / </span>
                    <span className="font-regular text-[#989696]">Shop</span>
                </p>
            </Row>

            <Row className="flex flex-col custom-lg:flex-row gap-[30px]">

                <aside className="hidden custom-lg:block custom-lg:w-1/4 h-fit px-2 py-5 custom-lg:w-1/4 bg-white rounded-[20px] box-shadow">
                    <div className="p-4">
                        <h2 className="text-20px font-medium text-black lowercase ">Filter Products</h2>
                    </div>
                    <CollapsibleFilter
                        title="Category"
                        defaultOpen={true}

                        isSelected={isCategorySelected}
                        onReset={handleResetCategories}
                        showButtons={false}
                    >
                        <div className="space-y-1 px-2 overflow-y-auto">
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
                    </CollapsibleFilter>

                    <PriceRangeFilter
                        minPrice={minPrice}
                        maxPrice={maxPrice}
                        setMinPrice={setMinPrice}
                        setMaxPrice={setMaxPrice}
                        isMobile={false}
                    />

                    <CollapsibleFilter
                        title="Size"
                        defaultOpen={false}
                        isSelected={selectedSizes.length > 0}
                        onReset={handleResetSizes}
                        showButtons={false}
                    >
                        <div className="flex flex-wrap ">
                            {mockSizes.map(size => (
                                <SizeFilterItem
                                    key={size}
                                    name={size}
                                    isChecked={selectedSizes.includes(size)}
                                    onChange={() => handleSizeChange(size)}
                                />
                            ))}
                        </div>
                    </CollapsibleFilter>

                    <CollapsibleFilter
                        title="Color"
                        defaultOpen={false}
                        isSelected={selectedColors.length > 0}
                        onReset={handleResetColors}
                        showButtons={false}
                    >
                        <div className="p-2">
                            <div className="flex flex-wrap">
                                {mockColors.map(color => (
                                    <ColorFilterItem
                                        key={color.name}
                                        name={color.name}
                                        hex={color.hex}
                                        border={color.border}
                                        isChecked={selectedColors.includes(color.name)}
                                        onChange={handleColorChange}
                                    />
                                ))}
                            </div>
                        </div>
                    </CollapsibleFilter>

                    {/* Brands Filter (Desktop) */}
                    <CollapsibleFilter
                        title="Brands"
                        isSelected={selectedBrands.length > 0}
                        onReset={handleResetBrands}
                        showButtons={false}
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
                    <CollapsibleFilter
                        title="Type"
                        isSelected={selectedTypes.length > 0}
                        onReset={handleResetTypes}
                        showButtons={false}
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
                    <CollapsibleFilter
                        title="Fabric"
                        isSelected={selectedFabrics.length > 0}
                        onReset={handleResetFabrics}
                        showButtons={false}
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
                    <CollapsibleFilter
                        title="Discounts"
                        isSelected={selectedDiscounts.length > 0}
                        onReset={handleResetDiscounts}
                        showButtons={false}
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
                    <CollapsibleFilter
                        title="Product Label"
                        isSelected={selectedLabels.length > 0}
                        onReset={handleResetLabels}
                        showButtons={false}
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
                    <div className="p-4 mt-4 flex gap-4 border-t border-gray-200">
                        <button
                            onClick={handleClearAllFilters}
                            className="flex-1 h-10 text-base font-semibold font-inter text-black/70 border border-[#989696] rounded-[3px] transition"
                        >
                            Clear All
                        </button>
                        <button
                            onClick={() => console.log('Desktop Filters Applied')}
                            className={`flex-1 h-10 text-base font-semibold font-inter text-white bg-color rounded-[3px] transition shadow-md`}
                        >
                            Apply
                        </button>
                    </div>
                </aside>

                <main className="w-full custom-lg:w-3/4">
                    <div className="flex justify-between items-center mb-6">
                        <div className="hidden custom-lg:block text-sm text-gray-700">
                            Showing <span className="font-semibold">{showingResults}</span> results from total <span className="font-semibold">{totalResults}</span> for "<span className="font-bold">Saree</span>"
                        </div>
                        <div className=" sm:flex custom-lg:hidden">
                            <MobileFilterBar
                                sortBy={sortBy}
                                filterCount={filterCount}
                                onSortClick={handleSortClick}
                                onFilterClick={handleFilterClick}
                            />
                        </div>
                        <div className="hidden custom-lg:flex justify-end">
                            <DesktopSortBar sortBy={sortBy} setSortBy={setSortBy} />
                        </div>
                    </div>

                    {/* Active Filters Display */}
                    <div className="hidden sm:flex flex-wrap items-center gap-2 mb-6">
                        <span onClick={handleClearAllFilters} className={`text-[16px] font-sanss font-medium text-[#989696] mr-2 border-b border-[#989696] cursor-pointer`}>Clear Filters:</span>
                            {currentFilters.map((filter, index) => (
                            <span
                                key={index}
                                className={`theme-border ${TEXT_COLOR_CLASS} border border-gray-300 px-4 py-1 rounded-[5px] cursor-pointer inline-flex items-center `}
                                onClick={() => handleClearFilter(filter.type, filter.value)}
                            >
                                {filter.value}

                                <X className={`w-4 h-4 ml-2 ${TEXT_COLOR_CLASS}`} />
                            </span>
                        ))}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-1 custom-lg:grid-cols-2 gap-6 sm:gap-8">
                        {mockProducts.map(product => (
                            <SingleCard key={product.id} product={product} />
                        ))}
                    </div>
                    {/* <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 md:gap-3 lg:gap-6 w-full mx-auto"> */}
                    <ProductGrid />
                    {/* </div> */}

                </main>

            </Row>

        </div>
    );
};

export default WomenCollections;