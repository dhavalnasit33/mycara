// import React from "react";

// const ProductCard = ({ product }) => {
//   return (
//     <div className="border rounded-lg overflow-hidden relative group">
//       <img
//         src={product.img}
//         alt={product.name}
//         className="w-full h-80 object-cover"
//       />
//       {/* Overlay */}
//       <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition">
//         <button className="bg-white text-gray-800 px-4 py-2 rounded">View Product</button>
//       </div>

//       {/* Card content */}
//       <div className="p-3">
//         <h3 className="text-sm font-medium mb-1">{product.name}</h3>
//         <div className="flex items-center gap-2 mb-2">
//           <span className="font-semibold">Rs {product.price}</span>
//           <span className="line-through text-gray-400 text-sm">Rs {product.oldPrice}</span>
//         </div>
//         <span className="text-xs text-pink-500">{product.discount}% off</span>

//         {/* Color options */}
//         <div className="flex gap-1 mt-2">
//           {product.colors.map((color, idx) => (
//             <span key={idx} className={`w-4 h-4 rounded-full ${color} border border-gray-200`}></span>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductCard;
