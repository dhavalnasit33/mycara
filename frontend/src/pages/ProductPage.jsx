import React from "react";

import ProductGallery from "../components/productcard/ProductGallery";
import ProductInfo from "../components/productcard/ProductInfo";
import ProductTabs from "../components/productcard/ProductTabs";
import Section from "../components/ui/Section";
import Row from "../components/ui/Row";
import SectionHeading from "../components/ui/SectionHeading";
import SimilarProducts from "../components/productcard/SimilarProducts";
import CustomerAlsoViewed from "../components/productcard/CustomerAlsoViewed";
import Breadcrumb from "../components/ui/Breadcrumb";

export default function Product({product}) {

  return (
    <>
    <Section>
      <Row>
        <Breadcrumb/>
      </Row>
    <Row className=" grid grid-cols-1 lg:grid-cols-2 gap-[30px]">
      <ProductGallery  product={product}/>
      <div>
        <ProductInfo />
        <ProductTabs />
      </div>
    </Row>
    </Section>
    <Section>
      <Row>
        <SectionHeading title="Similer Products" />
      </Row>
        <SimilarProducts />
    </Section>
       <CustomerAlsoViewed/>
  
 </>
  );
}
