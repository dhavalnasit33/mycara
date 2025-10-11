// MobileFilterBar.jsx
import React from 'react';

// તમારે આ આઇકન્સને યોગ્ય રીતે Import કરવા પડશે
const OriginalSortByIcon = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18M3 12h18M3 18h18"/></svg>;
const ChevronDown = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>;
const FilterIconComponent = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>;


// ---------- Icon Wrappers ----------
const SortByIcon = (props) => (<OriginalSortByIcon {...props} className="h-4 w-4 md:text-gray-500" />);
const CustomChevronDown = (props) => ( <ChevronDown {...props} />);
const Filter = (props) => (<FilterIconComponent {...props} />);

// ---------- Mobile Filter Bar ----------
const MobileFilterBar = ({ sortBy, filterCount, onSortClick, onFilterClick }) => {
    
    return (
        // Fixed at the bottom of the screen
        <div className="fixed bottom-0 left-0 right-0 p-3 bg-white shadow-[0_-5px_15px_rgba(0,0,0,0.05)] z-40">
            <div className="flex justify-center items-center w-full mx-auto gap-4 sm:gap-2 max-w-lg">
                
                {/* Sort By Button - KEY CLICK EVENT */}
                <div 
                    className="flex-1 rounded-[10px] cursor-pointer transition duration-300 border border-[#989696] drop-shadow-[0_0_4px_rgba(0,0,0,0.1)] bg-white w-[140px] sm:w-[180px] md:w-[200px]"
                    onClick={onSortClick} // <<< આના પર ક્લિક કરવાથી બૉટમ શીટ ખુલશે
                >
                    <div className="flex items-center justify-between py-2 px-3 sm:py-3 sm:px-4">
                        <div>
                            <div className="text-base sm:text-lg font-inter font-semibold text-black/70">Sort By</div>
                            <div className="text-xs sm:text-sm font-inter font-medium mt-0.5 text-[#989696]">{sortBy}</div>
                        </div>
                        <SortByIcon className="h-5 w-5 sm:h-6 sm:w-6 text-black/70" />
                    </div>
                </div>

                {/* Filter Button */}
                <div 
                    className={`bg-blue-600 rounded-[10px] shadow-lg cursor-pointer transition duration-300 hover:shadow-xl text-white w-[140px] sm:w-[180px] md:w-[200px]`}
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
        </div>
    );
};

export default MobileFilterBar;