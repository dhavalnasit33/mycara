import React from 'react';
import SecondarySection from '../components/ui/SecondarySection';
import shopbg from '../assets/shopBannerImage.jpg';
import WomenCollections from '../components/shop/WomenCollections';
const Shop = () => {
    return (
        <>
            <div className="hidden lg:flex relative">
                <SecondarySection
                    heading="Shop"
                    subText="Shop the latest trends and seasonal specials."
                    backgroundImage={shopbg}
                />
            </div>
            <WomenCollections />
        </>
    );
};
export default Shop;