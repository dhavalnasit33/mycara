//D:\mycara\frontend\src\pages\Shop.jsxShop.jsx

import React from "react";
import Hero from "../components/Hero"; // pages folder thi components folder
import CategoriesSection from "../components/CategoriesSection";
import NewArrivals  from "../components/NewArrivals";
import FeaturedProducts from "../components/FeaturedProducts";
import TrendingClothes from "../components/TrendingClothes";
import HeroBanner from '../components/HeroBanner';
import Bestsellers from '../components/Bestsellers';
import RecommendedSection from '../components/RecommendedSection';
import BannerClothes from '../components/bannerclothes.jsx'; // Adjust path if needed
import Features from '../components/Features.jsx';

const Shop = () => {
  return (
    <div>
      <Hero />
      <CategoriesSection />
       <NewArrivals />
       <FeaturedProducts />
        <TrendingClothes />
        <HeroBanner />
         <Bestsellers />
         <RecommendedSection />
         <BannerClothes />
         <Features />
    </div>
  );
};

export default Shop;
