// // src/components/ProductCard.jsx
// import React from "react";

// const ProductCard = ({ item }) => {
//   return (
//     <div className="relative shadow-lg overflow-hidden transition-transform duration-300">
//       <div className="relative w-full aspect-[3/4]">
//         <img
//           src={item.image}
//           alt={item.name}
//           className="w-full h-full object-cover"
//         />
//         <div 
//           className="absolute inset-0 bg-black opacity-30" 
//           style={{ mixBlendMode: 'luminosity' }}
//         ></div>
//       </div>
//       <div className="absolute inset-0 flex justify-center items-center">
//         <img src={item.image} alt={item.name} className="w-[90%] h-[92%] object-cover" />
//       </div>
//       <div className="absolute bottom-4 left-4 text-white z-20">
//         <h3 className="font-h2 text-xl sm:text-2xl">{item.name}</h3>
//         <p className="font-sans font-medium text-sm sm:text-base">{item.category}</p>
//       </div>
//     </div>
//   );
// };

// export default ProductCard;
