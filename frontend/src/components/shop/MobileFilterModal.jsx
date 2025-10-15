import React from "react";
import { X } from "lucide-react"; // make sure lucide-react is installed

import { CollapsibleFilter, FilterItemCheckbox, SizeFilterItem, ColorFilterItem, PriceRangeFilter } from './WomenCollections';


import {
    mockCategories,
    mockSizes,
    mockColors,
    mockBrands,
    mockTypes,
    mockFabrics,
    mockDiscounts,
    mockLabels,
    
} from './shopData';


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

    return (
        <>
            <div
                className="fixed inset-0 z-40 bg-black/60 lg:hidden transition-opacity duration-300"
                onClick={onClose}
            ></div>

            <div
                className={`
                    fixed top-0 left-0 z-50 bg-white lg:hidden overflow-y-auto w-4/5 h-full max-w-md
                    transition-transform duration-500 ease-in-out
                    ${isOpen ? "translate-x-0" : "-translate-x-full"}
                `}
            >
                <div className="w-full h-full">
                    <div className="sticky top-0 bg-white  px-2 py-4 flex justify-start items-center z-10">
                        <button
                            onClick={onClose}
                            className="flex items-center space-x-1 p-1 font-inter text-base sm:text-lg font-semibold text-black/70 hover:text-black gap-3"
                        >
                            <X className="w-5 h-5 text-black" />
                            CLOSE
                        </button>
                    </div>

                    <div className=" space-y-4 py-[10px] ">
                        <CollapsibleFilter
                            title="Category"
                            defaultOpen={true}
                            isSelected={selectedCategories.length > 0}
                            showButtons={true}
                            onCancelClick={handleResetCategories}
                            onApplyClick={onClose}
                        >
                            <div className="space-y-1 h-[130px] overflow-y-auto hide-scrollbar">
                                <div className=" px-3 py-3">
                                {mockCategories.map((cat) => (
                                    <FilterItemCheckbox
                                        key={cat.name}
                                        name={cat.name}
                                        count={cat.count}
                                        isChecked={selectedCategories.includes(cat.name)}
                                        onChange={handleCategoryChange}
                                    />
                                ))}
                            </div></div>
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
                            isSelected={selectedSizes.length > 0}
                            showButtons={true}
                            onCancelClick={handleResetSizes}
                            onApplyClick={onClose}
                        >
                            <div className="flex flex-wrap px-3 py-3">
                                {mockSizes.map((size) => (
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
                             <div className="flex flex-wrap px-3 py-3">
                                {mockColors.map((color) => (
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
                        </CollapsibleFilter>

                        {/* Brands Filter */}
                        <CollapsibleFilter
                            title="Brands"
                            isSelected={selectedBrands.length > 0}
                            showButtons={true}
                            onCancelClick={handleResetBrands}
                            onApplyClick={onClose}
                        >
                            <div className=" px-3 py-3">
                            {mockBrands.map((brand) => (
                                <FilterItemCheckbox
                                    key={brand.name}
                                    name={brand.name}
                                    count={brand.count}
                                    isChecked={selectedBrands.includes(brand.name)}
                                    onChange={handleBrandChange}
                                />
                            ))}
                            </div>
                        </CollapsibleFilter>

                        {/* Type Filter */}
                        <CollapsibleFilter
                            title="Type"
                            isSelected={selectedTypes.length > 0}
                            showButtons={true}
                            onCancelClick={handleResetTypes}
                            onApplyClick={onClose}
                        >
                            <div className=" px-3 py-3">
                            {mockTypes.map((type) => (
                                <FilterItemCheckbox
                                    key={type}
                                    name={type}
                                    isChecked={selectedTypes.includes(type)}
                                    onChange={handleTypeChange}
                                />
                            ))}
                            </div>
                        </CollapsibleFilter>

                        <CollapsibleFilter
                            title="Fabric"
                            isSelected={selectedFabrics.length > 0}
                            showButtons={true}
                            onCancelClick={handleResetFabrics}
                            onApplyClick={onClose}
                        >
                             <div className=" px-3 py-3">
                            {mockFabrics.map((fabric) => (
                                <FilterItemCheckbox
                                    key={fabric}
                                    name={fabric}
                                    isChecked={selectedFabrics.includes(fabric)}
                                    onChange={handleFabricChange}
                                />
                            ))}
                            </div>
                        </CollapsibleFilter>

                        <CollapsibleFilter
                            title="Discounts"
                            isSelected={selectedDiscounts.length > 0}
                            showButtons={true}
                            onCancelClick={handleResetDiscounts}
                            onApplyClick={onClose}
                        >
                            <div className=" px-3 py-3">
                            {mockDiscounts.map((discount) => (
                                <FilterItemCheckbox
                                    key={discount}
                                    name={discount}
                                    isChecked={selectedDiscounts.includes(discount)}
                                    onChange={handleDiscountChange}
                                />
                            ))}
                            </div>
                        </CollapsibleFilter>

                        <CollapsibleFilter
                            title="Product Label"
                            isSelected={selectedLabels.length > 0}
                            showButtons={true}
                            onCancelClick={handleResetLabels}
                            onApplyClick={onClose}
                        >
                            <div className=" px-3 py-3">
                            {mockLabels.map((label) => (
                                <FilterItemCheckbox
                                    key={label}
                                    name={label}
                                    isChecked={selectedLabels.includes(label)}
                                    onChange={handleLabelChange}
                                />
                            ))}
                            </div>
                        </CollapsibleFilter>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MobileFilterModal;
