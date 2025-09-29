import React from "react";
import Shop from "./Shop";

import Hero from "../components/Hero";
import CategoriesSection from "../components/CategoriesSection";
import NewArrivals from "../components/NewArrivals";
import FeaturedProducts from "../components/FeaturedProducts";
import TrendingClothes from "../components/TrendingClothes";
import HeroBanner from '../components/HeroBanner';
import Bestsellers from '../components/Bestsellers';
import RecommendedSection from '../components/RecommendedSection';
import BannerClothes from '../components/bannerclothes.jsx';
import Features from '../components/Features.jsx';


const Home = () => {
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

export default Home;





