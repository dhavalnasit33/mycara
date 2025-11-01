// import React, { useEffect, useMemo, useState } from "react";
// import Slider from "react-slick";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchProductById } from "../../features/products/productsThunk";
// import { useParams } from "react-router-dom";
// import { getImageUrl } from "../utils/helper";
// import { fetchColors } from "../../features/colors/colorsThunk";

// const colors = [
//     "#BCBCBC", "#D2AF9F", "#F43297"
// ];

// export default function ProductGallery() {
//   const { id } = useParams();
//   const dispatch = useDispatch();

//   const { product } = useSelector((state) => state.products);
//   const [currentImage, setCurrentImage] = useState(null);
//   const [productColors, setProductColors] = useState([]);


//   // ✅ Fetch product by ID
//   useEffect(() => {
//     if (id) {
//       dispatch(fetchProductById(id));
//     }
//   }, [id, dispatch]);


//   // ✅ Merge all images (main + variant)
//   const fullImageUrls = useMemo(() => {
//     if (!product?._id || product?._id !== id) return [];
//     const mainImages = product?.images || [];
//     const variantImages =
//       product?.variants?.length > 0
//         ? product.variants.flatMap((v) => v.images || [])
//         : [];
//     const allImages = [...new Set([...mainImages, ...variantImages])];
//     return allImages.map((img) => getImageUrl(img));
//   }, [product, id]);


//   useEffect(() => {
//     if (fullImageUrls.length > 0) setCurrentImage(fullImageUrls[0]);
//     else setCurrentImage(null);
//   }, [fullImageUrls]);

//   const sliderSettings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     arrows: false,
//     appendDots: (dots) => (
//       <div className="w-full relative">
//         <ul className="absolute left-1/2 transform -translate-x-1/2 flex justify-center rounded-full">
//           {dots}
//         </ul>
//       </div>
//     ),
//     customPaging: () => (
//       <div className="w-[10px] h-[10px] rounded-full border border-[#D2AF9F] transition-all duration-300"></div>
//     ),
//   };

//   return (
//     <div className="flex flex-col md:flex-row gap-[30px]">
//       {/* ✅ Thumbnail List */}
//       <div
//         className="hidden md:flex md:flex-col gap-[20px] h-[727px] overflow-y-auto hide-scrollbar p-1"
//         style={{
//           scrollBehavior: "smooth",
//           msOverflowStyle: "none",
//           scrollbarWidth: "none",
//         }}
//       >
//         {fullImageUrls.map((img, index) => (
//           <img
//             key={index}
//             src={img}
//             alt={`Thumbnail ${index}`}
//             onClick={() => setCurrentImage(img)}
//             className={`w-[160px] h-[208px] object-cover rounded-[3px] cursor-pointer transition-all duration-200 ${
//               currentImage === img
//                 ? "ring-1 ring-[#F43297] scale-[1.02]"
//                 : "opacity-50 hover:opacity-100"
//             }`}
//           />
//         ))}
//       </div>

//       {/* ✅ Main Image + Dynamic Colors */}
//       <div className="hidden md:block flex-1">
//         {currentImage && (
//           <img
//             key={currentImage}
//             src={currentImage}
//             alt="Main product"
//             className="w-full h-[727px] rounded-[10px] object-cover transition-all duration-300 ease-in-out"
//           />
//         )}

//         {/* ✅ Display All Product Colors */}
//         <div className="flex gap-[8px] mt-[30px] justify-center">
//           {colors.map((color, index) => (
//             <span
//               key={index}
//               className="w-[24px] h-[24px] rounded-full "
//               style={{ backgroundColor: color }}
//               title={color}
//             ></span>
//           ))}
//         </div>
//       </div>

//       {/* ✅ Mobile Slider */}
//       <div className="block md:hidden w-full rounded-[10px]">
//         <Slider {...sliderSettings}>
//           {fullImageUrls.map((img, index) => (
//             <div key={index}>
//               <img src={img} alt={`Slide ${index}`} className="w-full h-auto" />
//             </div>
//           ))}
//         </Slider>
//       </div>
//     </div>
//   );
// }
import React, { useEffect, useMemo, useState } from "react";
import Slider from "react-slick";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductById } from "../../features/products/productsThunk";
import { useParams } from "react-router-dom";
import { getImageUrl } from "../utils/helper";
import { fetchColors } from "../../features/colors/colorsThunk";

const colors = [
    "#BCBCBC", "#D2AF9F", "#F43297"
];

export default function ProductGallery() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { product } = useSelector((state) => state.products);
  const [currentImage, setCurrentImage] = useState(null);
  const [productColors, setProductColors] = useState([]);


  // ✅ Fetch product by ID
  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(id));
    }
  }, [id, dispatch]);


  // ✅ Merge all images (main + variant)
  const fullImageUrls = useMemo(() => {
    if (!product?._id || product?._id !== id) return [];
    const mainImages = product?.images || [];
    const variantImages =
      product?.variants?.length > 0
        ? product.variants.flatMap((v) => v.images || [])
        : [];
    const allImages = [...new Set([...mainImages, ...variantImages])];
    return allImages.map((img) => getImageUrl(img));
  }, [product, id]);


  useEffect(() => {
    if (fullImageUrls.length > 0) setCurrentImage(fullImageUrls[0]);
    else setCurrentImage(null);
  }, [fullImageUrls]);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    appendDots: (dots) => (
      <div className="w-full relative">
        <ul className="absolute left-1/2 transform -translate-x-1/2 flex justify-center rounded-full">
          {dots}
        </ul>
      </div>
    ),
    customPaging: () => (
      <div className="w-[10px] h-[10px] rounded-full border border-[#D2AF9F] transition-all duration-300"></div>
    ),
  };

  return (
    <div className="flex flex-col md:flex-row gap-[30px]">
      {/* ✅ Thumbnail List */}
      <div
        className="hidden md:flex md:flex-col gap-[20px] h-[727px] overflow-y-auto hide-scrollbar p-1"
        style={{
          scrollBehavior: "smooth",
          msOverflowStyle: "none",
          scrollbarWidth: "none",
        }}
      >
        {fullImageUrls.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Thumbnail ${index}`}
            onClick={() => setCurrentImage(img)}
            className={`w-[160px] h-[208px] object-cover rounded-[3px] cursor-pointer transition-all duration-200 ${
              currentImage === img
                ? "ring-1 ring-[#F43297] scale-[1.02]"
                : "opacity-50 hover:opacity-100"
            }`}
          />
        ))}
      </div>

      {/* ✅ Main Image + Dynamic Colors */}
      <div className="hidden md:block flex-1">
        {currentImage && (
          <img
            key={currentImage}
            src={currentImage}
            alt="Main product"
            className="w-full h-[727px] rounded-[10px] object-cover transition-all duration-300 ease-in-out"
          />
        )}

        {/* ✅ Display All Product Colors */}
        <div className="flex gap-[8px] mt-[30px] justify-center">
          {colors.map((color, index) => (
            <span
              key={index}
              className="w-[24px] h-[24px] rounded-full "
              style={{ backgroundColor: color }}
              title={color}
            ></span>
          ))}
        </div>
      </div>

      {/* ✅ Mobile Slider */}
      <div className="block md:hidden w-full rounded-[10px]">
        <Slider {...sliderSettings}>
          {fullImageUrls.map((img, index) => (
            <div key={index}>
              <img src={img} alt={`Slide ${index}`} className="w-full h-auto" />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}