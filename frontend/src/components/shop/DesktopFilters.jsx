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
        defaultOpen={false}
        isSelected={selectedSizes.length > 0}
        onReset={handleResetSizes}
        showButtons={false}
      >
        <div className="flex flex-wrap">
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

      {/* Brands */}
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

      {/* Type */}
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

      {/* Fabric */}
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

      {/* Discounts */}
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

      {/* Product Labels */}
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
    </aside>
  );
};

export default DesktopFilters;
