import React from "react";

// Import your filter components
import { CollapsibleFilter, FilterItemCheckbox, SizeFilterItem, ColorFilterItem, PriceRangeFilter } from './WomenCollections';

// Import mock data
import {
  mockCategories,
  mockSizes,
  mockColors,
  mockBrands,
  mockTypes,
  mockFabrics,
  mockDiscounts,
  mockLabels
} from './shopData';

const DesktopFilters = ({
  selectedCategories, handleCategoryChange, handleResetCategories,
  selectedSizes, handleSizeChange, handleResetSizes,
  selectedColors, handleColorChange, handleResetColors,
  selectedBrands, handleBrandChange, handleResetBrands,
  selectedTypes, handleTypeChange, handleResetTypes,
  selectedFabrics, handleFabricChange, handleResetFabrics,
  selectedDiscounts, handleDiscountChange, handleResetDiscounts,
  selectedLabels, handleLabelChange, handleResetLabels,
  minPrice, setMinPrice, maxPrice, setMaxPrice,
  isCategorySelected
}) => {
  return (
    <aside className="hidden lg:block lg:w-1/4 h-fit px-2 py-5 bg-white rounded-[20px] box-shadow">
      <div className="p-4">
        <h2 className="text-20px font-medium text-black lowercase">Filter Products</h2>
      </div>

      {/* Category */}
      <CollapsibleFilter
        title="Category"
        defaultOpen={true}
        isSelected={isCategorySelected}
        onReset={handleResetCategories}
        showButtons={true}
      >
        <div className="space-y-1 overflow-y-auto px-3 py-3">
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

      {/* Price */}
      <PriceRangeFilter
        minPrice={minPrice}
        maxPrice={maxPrice}
        setMinPrice={setMinPrice}
        setMaxPrice={setMaxPrice}
        isMobile={false}
      />

      {/* Size */}
      <CollapsibleFilter
        title="Size"
        defaultOpen={true}
        isSelected={selectedSizes.length > 0}
        onReset={handleResetSizes}
        showButtons={true}
      >
        <div className="flex flex-wrap px-3 py-3">
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

      {/* Color */}
      <CollapsibleFilter
        title="Color"
        defaultOpen={true}
        isSelected={selectedColors.length > 0}
        onReset={handleResetColors}
        showButtons={true}
      >
        
          <div className="flex flex-wrap px-3 py-3">
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
        
      </CollapsibleFilter>

      {/* Brands */}
      <CollapsibleFilter
        title="Brands"
        isSelected={selectedBrands.length > 0}
        onReset={handleResetBrands}
        showButtons={true}
      >
         <div className=" px-3 py-3">
        {mockBrands.map(brand => (
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

      {/* Type */}
      <CollapsibleFilter
        title="Type"
        isSelected={selectedTypes.length > 0}
        onReset={handleResetTypes}
        showButtons={true}
      >
         <div className=" px-3 py-3">
        {mockTypes.map(type => (
          <FilterItemCheckbox
            key={type}
            name={type}
            isChecked={selectedTypes.includes(type)}
            onChange={handleTypeChange}
          />
        ))}
        </div>
      </CollapsibleFilter>

      {/* Fabric */}
      <CollapsibleFilter
        title="Fabric"
        isSelected={selectedFabrics.length > 0}
        onReset={handleResetFabrics}
        showButtons={true}
      >
        <div className=" px-3 py-3">
        {mockFabrics.map(fabric => (
          <FilterItemCheckbox
            key={fabric}
            name={fabric}
            isChecked={selectedFabrics.includes(fabric)}
            onChange={handleFabricChange}
          />
        ))}
        </div>
      </CollapsibleFilter>

      {/* Discounts */}
      <CollapsibleFilter
        title="Discounts"
        isSelected={selectedDiscounts.length > 0}
        onReset={handleResetDiscounts}
        showButtons={true}
      >
        <div className=" px-3 py-3">
        {mockDiscounts.map(discount => (
          <FilterItemCheckbox
            key={discount}
            name={discount}
            isChecked={selectedDiscounts.includes(discount)}
            onChange={handleDiscountChange}
          />
        ))}
        </div>
      </CollapsibleFilter>

      {/* Product Labels */}
      <CollapsibleFilter
        title="Product Label"
        isSelected={selectedLabels.length > 0}
        onReset={handleResetLabels}
        showButtons={true}
      >
        <div className=" px-3 py-3">
        {mockLabels.map(label => (
          <FilterItemCheckbox
            key={label}
            name={label}
            isChecked={selectedLabels.includes(label)}
            onChange={handleLabelChange}
          />
        ))}
        </div>
      </CollapsibleFilter>
    </aside>
  );
};

export default DesktopFilters;
