
import React from "react";
import SectionHeading from "../ui/SectionHeading";
import Row from "../ui/Row";
import earringsImg from '../../assets/earrings.png';
import shoesImg from '../../assets/shoes.png';
import watchImg from '../../assets/watch.png';
import winterClothesImg from '../../assets/winter-clothes.png';

const ImageCard = ({ name, img, textColor = "text-black" }) => {
  const lineTopPx = name === "Earings" || name === "Winter Cloths" ? 55 : 25;
  const textTopPx = name === "Earings" || name === "Winter Cloths" ? 60 : 30;

  return (
    <div className="relative overflow-hidden cursor-pointer group h-full w-full">
      <img src={img} alt={name} className="w-full h-full object-cover" />
      
      {/* Desktop line */}
      <div
        className="absolute left-0 w-[38.72px] h-[1px] "
        style={{ top: `${lineTopPx}px`, backgroundColor: textColor === "text-black" ? "#000" : "#fff" }}
      ></div>


      {/* Desktop text */}
      <div className={`${textColor} p-2 absolute left-[15px] `} style={{ top: `${textTopPx}px` }}>
        <h3 className="text-[20px] sm:text-[30px] font-semibold leading-tight">{name}</h3>
        <p className="text-[12px] sm:text-[14px] font-normal mt-1 transition">Shop Now &gt;</p>
      </div>

    </div>
  );
};

const NewArrivals = () => {
  const items = [
    { id: 1, name: "Earings", img: earringsImg, textColor: "text-black" },
    { id: 2, name: "Shoes", img: shoesImg, textColor: "text-white" },
    { id: 3, name: "Watch", img: watchImg, textColor: "text-white" },
    { id: 4, name: "Winter Cloths", img: winterClothesImg, textColor: "text-black" },
  ];

  return (
    <section className="w-full py-[25px] md:py-[50px]">
      <Row className="flex flex-col items-center">
        <SectionHeading page="Home" order={3} />
      </Row>

      <Row className="flex flex-col md:flex-row gap-2 ">
        <div className="flex-1 md:basis-2/5 h-auto md:h-[550px]">
          <ImageCard {...items[0]} />
        </div>

        <div className="flex-1 md:basis-3/5 flex flex-col gap-2">
          <div className="h-auto md:h-[271px]">
            <ImageCard {...items[1]} />
          </div>
          <div className="h-auto md:h-[271px]">
            <ImageCard {...items[2]} />
          </div>
        </div>

        {/* Right small column */}
        <div className="flex-1 md:basis-2/5 h-auto md:h-[550px]">
          <ImageCard {...items[3]} />
        </div>
      </Row>
    </section>
  );
};

export default NewArrivals;



// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import SectionHeading from "../ui/SectionHeading";
// import Row from "../ui/Row";
// import { fetchProducts } from "../../features/products/productsThunk";
// import { getImageUrl } from "../utils/helper";

// const ImageCard = ({ product, textColor = "text-black" }) => {

//   const lineTopPx =  product?.category.name.length > 10 ? 55 : 25;
//   const textTopPx =  product?.category.name .length > 10 ? 60 : 30;

//   return (
//     <div className="relative overflow-hidden cursor-pointer group h-full w-full">
//       <img src={getImageUrl(product?.images)} alt={ product?.category.name} className="w-full h-full  group-hover:scale-105 transition-transform duration-500" />

//       <div
//         className="absolute left-0 w-[38.72px] h-[1px]"
//         style={{
//           top: `${lineTopPx}px`,
//           backgroundColor: textColor === "text-black" ? "#000" : "#fff",
//         }}
//       ></div>

//       <div
//         className={`${textColor} p-2 absolute left-[15px]`}
//         style={{ top: `${textTopPx}px` }}
//       >
//         <h3 className="text-[20px] sm:text-[30px] font-semibold leading-tight">
//           { product?.category.name}
//         </h3>
//         <p className="text-[12px] sm:text-[14px] font-normal mt-1 transition">
//           Shop Now &gt;
//         </p>
//       </div>
//     </div>
//   );
// };

// const NewArrivals = () => {
//   const dispatch = useDispatch();
//   const { products, loading, error } = useSelector((state) => state.products);

//   useEffect(() => {
//     dispatch(fetchProducts());
//   }, [dispatch]);

//   const newArrivals = [...products]
//   .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
//   .slice(0, 4);

//   const items = newArrivals.slice(0, 4);

//   return (
//     <section className="w-full py-[25px] md:py-[50px]">
//       <Row className="flex flex-col items-center">
//         <SectionHeading page="Home" order={3} />
//       </Row>

//       {loading ? (
//         <p className="text-center py-10 text-gray-500">Loading New Arrivals...</p>
//       ) : error ? (
//         <p className="text-center text-red-500">Error: {error}</p>
//       ) : items.length === 0 ? (
//         <p className="text-center text-gray-500">No new arrivals found.</p>
//       ) : (
//         <Row className="flex flex-col md:flex-row gap-2">
//           {items[0] && (
//             <div className="w-full md:w-2/5 h-[400px] md:h-[600px]">
//               <ImageCard product={items[0]} textColor="text-black" />
//             </div>
//           )}

//           <div className="flex-1 md:basis-3/5 flex flex-col gap-2">
//             {items[1] && (
//               <div className="h-[200px] lg:h-[296px] md:h-[296px]  ">
//                 <ImageCard product={items[1]} textColor="text-white" />
//               </div>
//             )}
//             {items[2] && (
//               <div className="h-[200px] lg:h-[296px] md:h-[296px]">
//                 <ImageCard product={items[2]} textColor="text-white" />
//               </div>
//             )}
//           </div>

//           {items[3] && (
//             <div className="w-full md:w-2/5 h-[400px] md:h-[600px]">
//               <ImageCard product={items[3]} textColor="text-black" />
//             </div>
//           )}
//         </Row>
//       )}
//     </section>
//   );
// };

// export default NewArrivals;
