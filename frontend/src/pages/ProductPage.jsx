import React from "react";

import ProductGallery from "../components/productcard/ProductGallery";
import ProductInfo from "../components/productcard/ProductInfo";
import ProductTabs from "../components/productcard/ProductTabs";
import img1 from "../assets/gallary1.png";
import img2 from "../assets/gallary2.png";
import img3 from "../assets/gallary3.png";
import Section from "../components/ui/Section";
import Row from "../components/ui/Row";

export default function Product() {
  const images = [img1, img2, img3];


  return (
    <Section>
    <Row className=" grid grid-cols-1 lg:grid-cols-2 gap-[30px]">
      <ProductGallery images={images} />
      <div>
        <ProductInfo />
        <ProductTabs />
      </div>
    </Row>
    </Section>
  );
}
