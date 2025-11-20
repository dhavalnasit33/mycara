// import React from 'react';
// import Row from '../ui/Row';

// import prodimg from "../../assets/shopsaree4.jpg";
// import prodimg1 from "../../assets/shopsaree2.jpg";
// import prodimg2 from "../../assets/shopsaree3.jpg";
// import mainprod from "../../assets/main-prod.png";
// import mainprod1 from "../../assets/similer3.png";
// import mainprod2 from "../../assets/similer4.png";

// const products = [
//   {
//     title: 'Salwar Suits & Sets',
//     description: 'Black Scissor, maaesa, anaisa... Black Scissor, maaesa, anaisa... Black Scissor, maaesa, anaisa...    ',
//     images: [
//       prodimg,
//       prodimg1,
//       prodimg2,
//     ],
//   },
//   {
//     title: 'Sarees',
//     description: 'Likha , kasse, Akhilam, Odatte &... ',
//     images: [
//       mainprod,
//       mainprod1,
//       mainprod2,
//     ],
//   },
//   {
//     title: 'Bottom Pants & Trouser',
//     description: 'Black Scissor, maaesa, anaisa... ',
//     images: [
//       prodimg,
//       prodimg1,
//       prodimg2,
//     ],
//   },
// ];

// export default function CustomerAlsoViewed() {
//   return (
//     <>
//     <Row className="!max-w-[1155px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[15px]">
//         {products.map((product, index) => (
//             <div key={index} className="bg-white rounded-[3px] box-shadow overflow-hidden p-[23px]" >
//                <div className="grid grid-cols-[2fr_1fr] gap-[7px] mb-[10px] h-auto">
//                     <img
//                         src={product.images[0]}
//                         alt={`${product.title} 1`}
//                         className="w-full h-full  object-cover md:h-[325px] "
//                     />
//                     <div className="grid grid-rows-2 gap-[7px]">
//                         {product.images.slice(1, 3).map((image, idx) => (
//                         <img
//                             key={idx}
//                             src={image}
//                             alt={`${product.title} ${idx + 2}`}
//                             className="w-full h-full object-cover md:h-[159px] "
//                         />
//                         ))}
//                     </div>
//                 </div>
//                 <h3 className="text-p">{product.title}</h3>
//                 <p className="text-14 sec-text-color truncate ">{product.description}</p>
//             </div>
//         ))}
//     </Row>
//     </ >
//   );
// }
// src/components/productcard/CustomerAlsoViewed.jsx
import React from "react";
import Row from "../ui/Row";
import { getImageUrl } from "../utils/helper"; // if you need to transform image objects

export default function CustomerAlsoViewed({ recentProducts = [] }) {
  // fallback items if recentProducts is empty (optional)
  const fallback = [
    {
      title: "Sarees",
      description: "Popular sarees",
      images: ["/assets/default1.jpg", "/assets/default2.jpg"]
    },
    // ... keep a couple of defaults
  ];

  const items = recentProducts.length > 0 ? recentProducts : fallback;

  return (
    <Row className="!max-w-[1155px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[15px]">
      {items.map((p, index) => (
        <div key={p._id || index} className="bg-white rounded-[3px] box-shadow overflow-hidden p-[23px] cursor-pointer"
             onClick={() => {
               // navigate to product page
               // if you use react-router, you can do: navigate(`/product/${p._id}`) 
               // but since this is a dumb component, better handle navigation from parent OR use useNavigate here:
               window.location.href = `/product/${p._id}`; // simple fallback
             }}>
          <div className="grid grid-cols-[2fr_1fr] gap-[7px] mb-[10px] h-auto">
            <img
              src={p.images && p.images.length ? (typeof p.images[0] === "string" ? p.images[0] : getImageUrl(p.images[0])) : "/assets/placeholder.png"}
              alt={`${p.name || p.title} 1`}
              className="w-full h-full object-cover md:h-[325px]"
            />
            <div className="grid grid-rows-2 gap-[7px]">
              {Array.from({length:2}).map((_, idx) => {
                const img = p.images && p.images[idx+1] ? p.images[idx+1] : "/assets/placeholder.png";
                return (
                  <img
                    key={idx}
                    src={typeof img === "string" ? img : getImageUrl(img)}
                    alt={`${p.name || p.title} ${idx + 2}`}
                    className="w-full h-full object-cover md:h-[159px]"
                  />
                );
              })}
            </div>
          </div>
          <h3 className="text-p">{p.name || p.title}</h3>
          <p className="text-14 sec-text-color truncate ">{p.description || "Recently viewed"}</p>
        </div>
      ))}
    </Row>
  );
}
