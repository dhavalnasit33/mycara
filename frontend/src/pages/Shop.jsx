//D:\mycara\frontend\src\pages\Shop.jsxShop.jsx

import React from "react";
import Hero from "../components/Hero"; // pages folder thi components folder
import CategoriesSection from "../components/CategoriesSection";
import NewArrivals  from "../components/NewArrivals";
import FeaturedProducts from "../components/FeaturedProducts";
import TrendingClothes from "../components/TrendingClothes";
import HeroBanner from '../components/HeroBanner';
const Shop = () => {
  return (
    <div>
      <Hero />
      <CategoriesSection />
       <NewArrivals />
       <FeaturedProducts />
        <TrendingClothes />
        <HeroBanner />
    </div>
  );
};

export default Shop;
