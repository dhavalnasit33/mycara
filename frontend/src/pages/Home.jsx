import React, { useEffect } from "react";


import Hero from "../components/home/Hero";

import CategoriesSection from "../components/home/CategoriesSection";
import NewArrivals from "../components/home/NewArrivals";
import FeaturedProducts from "../components/home/FeaturedProducts";
import TrendingClothes from "../components/home/TrendingClothes";
import HeroBanner from '../components/home/HeroBanner';
import Bestsellers from '../components/home/Bestsellers';
import RecommendedSection from '../components/home/RecommendedSection';
import BannerClothes from '../components/home/bannerclothes.jsx';
import Features from '../components/home/Features.jsx';
import Row from "../components/ui/Row.jsx";
import SectionHeading from "../components/ui/SectionHeading.jsx";
import Section from "../components/ui/Section.jsx";
import { useDispatch } from "react-redux";
import { fetchPages } from "../features/pages/pagesThunk.js";




const Home = () => {

    const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPages());
  }, [dispatch]);


  return (
    <div>
      <Hero />
      
      <Section>
        <Row className="pt-[25px] md:pt-[50px]">
            {/* <SectionHeading title=" Shop By Categories" /> */}
           <SectionHeading page="Home" sectionKey="content" />

          </Row>
          <Row>
        <CategoriesSection />
        </Row>
      </Section>
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





