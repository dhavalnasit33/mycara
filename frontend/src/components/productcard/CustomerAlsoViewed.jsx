import React, { useMemo } from "react";
import Row from "../ui/Row";
import { getRecentlyViewed } from "../utils/recentlyViewed";
import { getImageUrl } from "../utils/helper";
import prodimg from "../../assets/shopsaree4.jpg";
import prodimg1 from "../../assets/shopsaree2.jpg";

export default function CustomerAlsoViewed({ products = [], currentProductId = null }) {

  const recentIds = getRecentlyViewed();

  const displayList = useMemo(() => {
    const byId = products.reduce((acc, p) => {
      if (p?._id) acc[p._id] = p;
      return acc;
    }, {});
    const recent = recentIds.map(id => byId[id]).filter(Boolean);
    return (recent.length ? recent : products)
      .filter(p => p._id !== currentProductId)
      .slice(0, 3);
  }, [products, recentIds, currentProductId]);


  //right side same category product
  const usedSideProductIds = new Set();
  const productData = displayList.map(product => {
    // Main image (first variant)
    const mainImageUrl = product?.variants?.[0]?.images?.[0]
      ? getImageUrl(product.variants[0].images[0])
      : prodimg;

    // Category ID
    const categoryId = product?.category_id?._id ?? product?.category_id ?? null;

    // Filter same category product
    const sameCategoryProducts = products.filter(p => {
      if (!p || !categoryId) return false;
      const pCategoryId = p?.category_id?._id ?? p?.category_id ?? null;
      return (
        p._id !== product._id &&
        pCategoryId === categoryId &&
        !usedSideProductIds.has(p._id)
      );
    });

    // Take up to 2 side products
    const sideImages = sameCategoryProducts.slice(0, 2).map(p => {
      usedSideProductIds.add(p._id); // mark this product as used
      const imageUrl =
        p?.variants?.[0]?.images?.[0] ? getImageUrl(p.variants[0].images[0]) : prodimg1;
      return { imageUrl, productId: p._id };
    });

    return { ...product, mainImageUrl, sideImages };
  });

  return (
    <Row className="!max-w-[1155px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[15px]">
       {productData.map((product, index) => (
        <div key={product._id || index} className="bg-white rounded-[3px] box-shadow overflow-hidden p-[23px]">
          <div className="grid grid-cols-[2fr_1fr] gap-[7px] mb-[12px] h-auto">

            <a href={`/products/${product._id}`} target="_blank" rel="noopener noreferrer">
              <img
                src={product.mainImageUrl}
                alt={product?.name || product?.title || "product"}
                className="w-full h-full object-cover md:h-[325px]"
              />
            </a>

            <div className="grid grid-rows-2 gap-[7px]">
              {product.sideImages.map((side, idx) => (
                 <a href={`/products/${side.productId}`} key={side.id || side.productId || idx} target="_blank" rel="noopener noreferrer">
                  <img
                    src={side.imageUrl}
                    alt={`related-${idx}`}
                    className="w-full h-full object-cover md:h-[159px]"
                  />
                  </a>
              ))}
            </div>
          </div>
          <p className="text-p mb-[5px]">{product?.category.name}</p>
          <h3 className="text-14 sec-text-color">{product?.name || product?.title}</h3>
        </div>
      ))}
    </Row>
  );
}
