import React, { useState } from 'react';

// --- Filter Modal Component (The big box in your image) ---
const FilterModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null; // Only render the modal when 'isOpen' is true

  // --- Mock data for the filters (You'd likely fetch this) ---
  const categories = [
    { name: 'Saree', count: 256, isChecked: true },
    { name: 'Cotton Kurti', count: 1026, isChecked: false },
    { name: 'Jewellery', count: 206, isChecked: false },
    { name: 'T-Shirts', count: 989, isChecked: false },
  ];

  const sizes = [
    { name: '4XL', isChecked: true }, { name: 'M', isChecked: false },
    { name: '3XL', isChecked: false }, { name: 'S', isChecked: false },
    { name: 'XXL', isChecked: false }, { name: 'XS', isChecked: false },
    { name: 'XL', isChecked: false }, { name: 'XXS', isChecked: false },
    { name: 'L', isChecked: false }, { name: 'All Size', isChecked: false },
  ];

  const colors = [
    { name: 'Black', hex: '#000000' }, { name: 'Peach', hex: '#FFE5B4' },
    { name: 'Brown', hex: '#A52A2A' }, { name: 'Red', hex: '#FF0000' },
    { name: 'Gray', hex: '#808080' }, { name: 'Orange', hex: '#FFA500' },
    { name: 'Green', hex: '#008000' }, { name: 'Pink', hex: '#FFC0CB' },
    { name: 'Marun', hex: '#800000' }, { name: 'Blue', hex: '#0000FF' },
    { name: 'White', hex: '#FFFFFF' }, { name: 'Purple', hex: '#800080' },
    { name: 'Rust', hex: '#B7410E' }, { name: 'Beige', hex: '#F5F5DC' },
    { name: 'Teal', hex: '#008080' }, { name: 'Msght', hex: '#FF00FF' },
  ];
  // -------------------------------------------------------------------

  // Helper component for filter sections
  const FilterSection = ({ title, children }) => (
    <div className="p-4 border-b last:border-b-0">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-semibold text-gray-800">{title}</h3>
        <span className="text-pink-500 cursor-pointer text-xl">
          &minus; {/* Minus icon or any other icon you use */}
        </span>
      </div>
      {children}
    </div>
  );

  // Helper component for the color swatch
  const ColorSwatch = ({ name, hex }) => (
    <div className="flex flex-col items-center cursor-pointer p-1">
      <div 
        className="w-5 h-5 rounded-full border border-gray-300 shadow-sm"
        style={{ backgroundColor: hex, border: hex === '#FFFFFF' ? '1px solid #ccc' : 'none' }}
        title={name}
      ></div>
      <span className="text-xs mt-1 text-gray-600">{name}</span>
    </div>
  );

  return (
    // Overlay for the background
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-start pt-10 overflow-auto" onClick={onClose}>
      
      {/* The actual Modal content container */}
      {/* 'e.stopPropagation()' prevents the click on the modal content from closing the modal */}
      <div className="bg-white rounded-xl shadow-2xl w-[90%] max-w-md my-8" onClick={(e) => e.stopPropagation()}>
        
        {/* Close and Header */}
        <div className="p-4 border-b flex justify-between items-center">
          <button className="text-gray-500 text-lg" onClick={onClose}>
            &times; **CLOSE**
          </button>
          <span className="text-pink-500 text-lg cursor-pointer">
            &times;
          </span>
        </div>

        {/* --- Category Filter --- */}
        <FilterSection title="Category">
          <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
            {categories.map((cat) => (
              <label key={cat.name} className="flex items-center space-x-2 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={cat.isChecked} 
                  className="form-checkbox text-pink-500 rounded border-gray-300 focus:ring-pink-500"
                  onChange={() => { /* Handle state change for category */ }}
                />
                <span>
                  {cat.name} <span className="text-gray-500">({cat.count})</span>
                </span>
              </label>
            ))}
          </div>
          <div className="mt-4 flex justify-between space-x-2">
            <button className="flex-1 py-2 rounded border border-gray-300 text-gray-700" onClick={onClose}>
              **Cancel**
            </button>
            <button className="flex-1 py-2 rounded bg-pink-500 text-white font-semibold">
              **Filter**
            </button>
          </div>
        </FilterSection>

        {/* --- Price Filter --- */}
        <FilterSection title="Price">
          <div className="flex flex-col items-center">
            {/* Simple range slider mock (you'd use a dedicated component here) */}
            <input 
              type="range" 
              min="0" max="5000" 
              value="1500" 
              className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer range-lg accent-pink-500" 
              onChange={() => {}}
            />
            <div className="flex w-full justify-between mt-3 space-x-4">
              <div className="flex-1">
                <p className="text-xs text-gray-500 mb-1">Max</p>
                <input type="text" defaultValue="Rs 500" className="w-full text-center py-2 border rounded-lg text-gray-700" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-500 mb-1">Min</p>
                <input type="text" defaultValue="Rs 2500" className="w-full text-center py-2 border rounded-lg text-gray-700" />
              </div>
            </div>
          </div>
        </FilterSection>

        {/* --- Size Filter --- */}
        <FilterSection title="Size">
          <div className="grid grid-cols-3 gap-2 text-sm text-gray-700">
            {sizes.map((size) => (
              <label key={size.name} className="flex items-center space-x-2 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={size.isChecked} 
                  className="form-checkbox text-pink-500 rounded border-gray-300 focus:ring-pink-500"
                  onChange={() => { /* Handle state change for size */ }}
                />
                <span>{size.name}</span>
              </label>
            ))}
          </div>
          <div className="mt-4 flex justify-between space-x-2">
            <button className="flex-1 py-2 rounded border border-gray-300 text-gray-700" onClick={onClose}>
              **Cancel**
            </button>
            <button className="flex-1 py-2 rounded bg-pink-500 text-white font-semibold">
              **Filter**
            </button>
          </div>
        </FilterSection>

        {/* --- Color Filter --- */}
        <FilterSection title="Color">
          <div className="grid grid-cols-6 gap-y-3 gap-x-2">
            {colors.map((color) => (
              <ColorSwatch key={color.name} name={color.name} hex={color.hex} />
            ))}
          </div>
        </FilterSection>

        {/* --- Brands Filter --- */}
        <FilterSection title="Brands">
          {/* Content for Brands filter goes here */}
          <div className="text-sm text-gray-500 italic">...Brand search/selection options...</div>
        </FilterSection>
        
      </div>
    </div>
  );
};


// --- Main Component where the button and modal are used ---
const ProductFilter = () => {
  // 1. State to control the visibility of the modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 2. Function to toggle the state (This is your 'onFilterClick')
  const onFilterClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="p-4">
      {/* This is the button/icon that opens the filter menu. 
        It matches the structure of the HTML you provided.
      */}
      <div 
        className="bg-pink-500 rounded-[10px] shadow-lg cursor-pointer transition duration-300 hover:shadow-xl text-white p-3 w-[140px] text-center"
        onClick={onFilterClick} 
      >
        **Open Filters** {/* Or an Icon here */}
      </div>

      {/* 3. The Modal Component is rendered here, passing the state and the close function.
      */}
      <FilterModal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
      />
      
      <p className="mt-4 text-gray-700">
        Filter status: **{isModalOpen ? 'OPEN' : 'CLOSED'}**
      </p>
    </div>
  );
};

export default ProductFilter;