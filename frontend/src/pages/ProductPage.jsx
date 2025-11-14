import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { fetchProductById, fetchProducts } from "../features/products/productsThunk";
import Section from "../components/ui/Section";
import Row from "../components/ui/Row";
import SectionHeading from "../components/ui/SectionHeading";
import Breadcrumb from "../components/ui/Breadcrumb";
import ProductGallery from "../components/productcard/ProductGallery";
import ProductInfo from "../components/productcard/ProductInfo";
import ProductTabs from "../components/productcard/ProductTabs";
import SimilarProducts from "../components/productcard/SimilarProducts";
import CustomerAlsoViewed from "../components/productcard/CustomerAlsoViewed";
import { fetchPages } from "../features/pages/pagesThunk";

export default function Product() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { product, products, loading,error } = useSelector((state) => state.products);

  useEffect(() => {
    if (id) dispatch(fetchProductById(id));
  }, [id, dispatch]);

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchPages());
  }, [dispatch]);

  if (loading) return <p className="text-center py-10">Loading product...</p>;
  if (error) return <p className="text-center text-red-500 py-10">{error}</p>;
  if (!product) return <p className="text-center py-10">No Product Found.</p>;

  return (
    <>
      <Section>
        <Row>
          <Breadcrumb />
        </Row>

        <Row className="grid grid-cols-1 lg:grid-cols-2 gap-[30px]">
          <ProductGallery product={product} />
          <div>
            <ProductInfo product={product} />
            <ProductTabs />
          </div>
        </Row>
      </Section>

      <Section>
        <Row>
          <SectionHeading page="products"  order="2" index="0"   />
        </Row>
        <SimilarProducts product={product} products={products} />
      </Section>

      <Section>
        <Row>
          <SectionHeading page="products"  order="2" index="1" />
        </Row>
        <CustomerAlsoViewed />
      </Section>
    </>
  );
}
