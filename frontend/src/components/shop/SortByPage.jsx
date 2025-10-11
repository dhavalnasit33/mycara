// SortByPage.jsx
import React from 'react';

import CloseIcon from '../icons/CloseIcon';

import { FaRegStar } from "react-icons/fa"; 
import PopularityIcon from '../icons/PopularityIcon'; 
import RatingIcon from '../icons/Rating';
import PriceIcon from '../icons/PriceIcon';
import PriceHigh from '../icons/PriceHigh';
import DiscountIcon from '../icons/DiscountIcon';

const LatestIcon = FaRegStar;


const SortByPage = ({ isOpen, onClose, selectedSort, onSelectSort }) => {
    if (!isOpen) return null;

    const sortOptions = [
        { label: 'Popularity', value: 'popularity', icon: PopularityIcon },
        { label: 'Latest', value: 'latest', icon: LatestIcon  },
        { label: 'Average Rating', value: 'rating', icon: RatingIcon },
        { label: 'Price Low to High', value: 'price_asc', icon: PriceIcon },
        { label: 'Price High to Low', value: 'price_desc', icon: PriceHigh },
        { label: 'Discounts', value: 'discounts', icon: DiscountIcon },
    ];

    return (
        // Overlay / Backdrop
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div 
                className="fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300" 
                onClick={onClose}
            ></div>

            {/* Bottom Sheet Content: transition-transform થી નીચેથી ઉપર આવવાનું એનિમેશન મળે છે. */}
            <div className={`fixed bottom-0 w-full transition-transform duration-500 ease-out 
                ${isOpen ? 'translate-y-0' : 'translate-y-full'} 
                p-6 bg-white rounded-t-3xl shadow-2xl max-h-[80vh]`}>
                
                {/* Header (Title and Close 'X' icon) */}
                <div className="flex justify-between items-center pb-4">
                    <h2 className="text-xl font-bold text-gray-900">Sort By</h2>
                    {/* Close button at top right, matching the look in your screenshot's full app view. */}
                    <button 
                        onClick={onClose} 
                        className="p-1 rounded-full text-gray-400 hover:bg-gray-100 transition duration-150"
                        aria-label="Close sort options"
                    >
                         <CloseIcon className="h-6 w-6" />
                    </button>
                </div>
                
                {/* Sort Options List (Scrollable if content is long) */}
                <div className="mt-2 space-y-1 max-h-[60vh] overflow-y-auto">
                    {sortOptions.map((option) => {
                        const isSelected = selectedSort === option.value;
                        return (
                            <div
                                key={option.value}
                                className={`flex items-center justify-between py-3 px-1 cursor-pointer transition duration-200 
                                    ${isSelected ? 'bg-pink-50' : 'hover:bg-gray-50'}`} // Pink background for selection
                                onClick={() => onSelectSort(option.value)}
                            >
                                <div className="flex items-center gap-4">
                                    <option.icon className={`h-5 w-5 ${isSelected ? 'text-pink-600' : 'text-gray-600'}`} />
                                    <span className={`text-lg font-medium ${isSelected ? 'text-pink-600' : 'text-gray-800'}`}>
                                        {option.label}
                                    </span>
                                </div>
                                
                                {/* Radio Button (Pink checked style) */}
                                <div className={`h-5 w-5 rounded-full border-2 flex items-center justify-center 
                                    ${isSelected ? 'border-pink-600' : 'border-gray-300'}`}
                                >
                                    {isSelected && (
                                        <div className="h-2.5 w-2.5 rounded-full bg-pink-600"></div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
                {/* Safe Area for bottom of phone */}
                <div className="h-4"></div>
            </div>
        </div>
    );
};

export default SortByPage;