// D:\mycara\frontend\src\pages\Shop.jsx
import React from 'react';
import ShopBanner from '../components/ShopBanner'; 


import WomenCollections from '../components/WomenCollections'; 

const Shop = () => {
    return (
        <div className="shop-page-container">
            
              <ShopBanner />
            <WomenCollections />
        </div>
        
    );
};

export default Shop;