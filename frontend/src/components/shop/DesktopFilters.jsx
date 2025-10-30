import React, { useEffect } from "react";

// Import your filter components
import { CollapsibleFilter, FilterItemCheckbox, SizeFilterItem, ColorFilterItem, PriceRangeFilter } from './WomenCollections';

// Import mock data
import {

  mockTypes,
  mockFabrics,
  mockDiscounts,
  mockLabels
} from './shopData';
import { fetchCategories } from "../../features/categories/categoriesThunk";
import { useDispatch, useSelector } from "react-redux";
import { fetchSizes } from "../../features/sizes/sizesThunk";
import { fetchColors } from "../../features/colors/colorsThunk";
import { fetchBrands } from "../../features/brands/brandsThunk";

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

    const dispatch = useDispatch();

  // Redux data
  const { items: categories = [], loading: catLoading } = useSelector(
    (state) => state.categories || {}
  );
    const { products, loading, error } = useSelector((state) => state.products);
   const { sizes: sizes =[], loading: sizeLoading} = useSelector((state) => state.sizes);
    const { colors: color =[], loading: colorLoading} = useSelector((state) => state.colors);
     const { brands: brands =[], loading: brandLoading} = useSelector((state) => state.brands);

   useEffect(() => {
      dispatch(fetchCategories());
       dispatch(fetchSizes());
        dispatch(fetchColors());
         dispatch(fetchBrands());
    }, [dispatch]);
  

    //category count
  const categoryCounts = products.reduce((acc, product) => {
    const catId = product.category?._id;
    if (catId) {
      acc[catId] = (acc[catId] || 0) + 1;
    }
    return acc;
  }, {});

  //brandcount
  const brandCounts = products.reduce((acc, product) => {
  const variantBrand = product.variants?.[0]?.brand?.[0];
  const brandId = variantBrand?._id;
  if (brandId) {
    acc[brandId] = (acc[brandId] || 0) + 1;
  }
  return acc;
}, {});


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
          {catLoading ? (
            <p className="text-sm text-gray-500">Loading categories...</p>
          ) : categories.length > 0 ? (
            categories.map((cat) => (
              <FilterItemCheckbox
                key={cat._id}
                name={cat.name}
                count={categoryCounts[cat._id] || 0}
                isChecked={selectedCategories.includes(cat.name)}
                onChange={handleCategoryChange}
              />
            ))
          ) : (
            <p className="text-sm text-gray-500">No categories found.</p>
          )}
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
        <div className="grid grid-cols-2 gap-2 px-3 py-3">
          {sizeLoading ? (
            <p className="text-sm text-gray-500">Loading categories...</p>
          ) : sizes.length > 0 ? (
            sizes.map((size) => (
              <FilterItemCheckbox
                key={size._id}
                name={size.name}
                isChecked={selectedSizes.includes(size.name)}
                onChange={handleSizeChange}
              />
            ))
          ) : (
            <p className="text-sm text-gray-500">No sizes found.</p>
          )}
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
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-y-5 gap-x-3 px-3 py-3">
          {colorLoading ? (
            <p className="text-sm text-gray-500 col-span-full">Loading colors...</p>
          ) : Array.isArray(color) && color.length > 0 ? (
            color.map((clr) => (
              <div
                key={clr._id || clr.name}
                className="flex flex-col items-center cursor-pointer"
                onClick={() => handleColorChange(clr.name)}
              >
                <div
                  className={`w-[22px] h-[22px] rounded-full box-shadow ${
                    selectedColors.includes(clr.name)
                      ? "ring-2 ring-offset-1 ring-black"
                      : ""
                  } transition-transform duration-200`}
                  style={{ backgroundColor: clr.code }}
                ></div>
                <p className="text-[10px] sec-text-color mt-1 text-center">
                  {clr.name}
                </p>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500 col-span-full">No colors found.</p>
          )}
        </div>

      </CollapsibleFilter>

      {/* Brands */}
      <CollapsibleFilter
        title="Brands"
        isSelected={selectedBrands.length > 0}
        onReset={handleResetBrands}
        showButtons={true}
      >
        <div className="space-y-1 overflow-y-auto px-3 py-3">
          {brandLoading ? (
            <p className="text-sm text-gray-500">Loading brands...</p>
          ) : brands.length > 0 ? (
            brands.map((brand) => (
              <FilterItemCheckbox
                key={brand._id}
                name={brand.name}
                count={brandCounts[brand._id] || 0}
                isChecked={selectedBrands.includes(brand.name)}
                onChange={handleBrandChange}
              />
            ))
          ) : (
            <p className="text-sm text-gray-500">No brands found.</p>
          )}
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
