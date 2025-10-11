
import React from 'react';
import SecondarySection from '../components/ui/SecondarySection'; 
import shopbg from '../assets/shopBannerImage.jpg';

import WomenCollections from '../components/shop/WomenCollections'; 


const Shop = () => {
    return (
<<<<<<< HEAD
        <div>
              <ShopBanner />
              
=======
        <>
            <div className="hidden lg:flex relative">
                <SecondarySection 
                    heading="Shop"
                    subText="Shop the latest trends and seasonal specials."
                    backgroundImage={shopbg} 
                />
            </div>
>>>>>>> bb961bde4301c04c294824f51451179071434630
            <WomenCollections />
        </>
        
    );
};

export default Shop;