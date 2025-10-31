//D:\mycara\frontend\src\components\home\NewArrivals.jsx

import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import SectionHeading from "../ui/SectionHeading";
import Row from "../ui/Row";
import { fetchPages } from "../../features/pages/pagesThunk";

import ArrowRight from "../icons/ArrowRight";


const IMAGE_BASE_URL = "http://localhost:5000";


const ImageCard = ({ name, img, textColor = "text-black" , description}) => {



  const lineTopPx = name === "Earings" || name === "Winter Cloths" ? 55 : 25;
  const textTopPx = name === "Earings" || name === "Winter Cloths" ? 60 : 30;

  const lineTopMobile = 20;
  const textTopMobile = 25;

  return (
    <div className="relative overflow-hidden cursor-pointer group h-full w-full">
      <img src={img} alt={name} className="w-full h-full object-cover" />
      
      {/* Desktop line */}
      <div
        className="absolute left-0 w-[38.72px] h-[1px] hidden sm:block"
        style={{ top: `${lineTopPx}px`, backgroundColor: textColor === "text-black" ? "#000" : "#fff" }}
      ></div>

      {/* Mobile line */}
      <div
        className="absolute left-0 w-[38.72px] h-[1px] sm:hidden"
        style={{ top: `${lineTopMobile}px`, backgroundColor: textColor === "text-black" ? "#000" : "#fff" }}
      ></div>

      {/* Desktop text */}
      <div className={`${textColor} p-2 absolute left-[15px] hidden sm:block`} style={{ top: `${textTopPx}px` }}>
        <h3 className="text-[20px] sm:text-[30px] font-semibold leading-tight">{name}</h3>
       <p className="text-[12px] sm:text-[14px] font-normal mt-1 transition flex items-center gap-1">
        <span>{description || "Shop Now"}</span> 
        <ArrowRight className="w-[6px] h-[11px]" /> 
        </p>
      </div>

      {/* Mobile text */}
      <div className={`${textColor} p-2 absolute left-[15px] sm:hidden`} style={{ top: `${textTopMobile}px` }}>
        <h3 className="text-[20px] font-semibold leading-tight">{name}</h3>
        <p className="text-[12px] font-normal mt-1 transition flex items-center gap-1">
      <span>{description || "Shop Now"}</span>
      <ArrowRight className="w-[6px] h-[11px]" /> {/* ⭐ Arrow Icon ઉમેર્યું */}
      </p>
      </div>
    </div>
  );
};

// --- ✅ NewArrivals Component ---
const NewArrivals = () => {
  const dispatch = useDispatch();
  const { homePageSections: items = [], loading, error } =
    useSelector((state) => state.pages);

  // ✅ Fetch data on mount
  useEffect(() => {
    if (!items || items.length === 0) {
      dispatch(fetchPages());
    }
  }, [dispatch, items.length]); 

  const mappedItems = useMemo(() => {
const requiredOrders = [7, 8, 9, 10]; 

 const filteredSections = items.filter(s => requiredOrders.includes(s.order))
.sort((a, b) => a.order - b.order);

 return filteredSections.map(section => ({
 name: section.title,      
 img: `${IMAGE_BASE_URL}${section.image_url}`, 
 // ⭐⭐ અહીંયા section.description (તમારા admin panel માંથી આવતો ડેટા) ઉમેર્યો
 description: section.description || "Shop Now >",
 textColor: section.order === 8 || section.order === 9 ? 'text-white' : 'text-black', 
 }));

 }, [items]);

  if (loading) {
    return (
      <section className="w-full py-[50px] text-center">
        <p className="text-xl font-medium">Loading New Arrivals...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="w-full py-[50px] text-center">
        <p className="text-xl font-medium text-red-600">
          Error loading data: {String(error)}
        </p>
      </section>
    );
  }

  if (!mappedItems || mappedItems.length < 4) {
    return (
      <section className="w-full py-[50px] text-center">
        <p className="text-xl font-medium">
          Data not ready (Expected 4, got {mappedItems?.length || 0})
        </p>
      </section>
    );
  }

  return (
    <section className="w-full py-[25px] md:py-[50px]">
      <Row className="flex flex-col items-center">
        <SectionHeading page="Home" order={3} />
      </Row>

      <Row className="flex flex-col md:flex-row gap-2">
        {/* Left column */}
        <div className="flex-1 md:basis-2/5 h-auto md:h-[550px]">
          <ImageCard {...mappedItems[0]} />
        </div>

        {/* Middle two boxes */}
        <div className="flex-1 md:basis-3/5 flex flex-col gap-2">
          <div className="h-auto md:h-[271px]">
            <ImageCard {...mappedItems[1]} />
          </div>
          <div className="h-auto md:h-[271px]">
            <ImageCard {...mappedItems[2]} />
          </div>
        </div>

        {/* Right column */}
        <div className="flex-1 md:basis-2/5 h-auto md:h-[550px]">
          <ImageCard {...mappedItems[3]} />
        </div>
      </Row>
    </section>
  );
};

export default NewArrivals;


// import React, { useEffect } from "react";
// import SectionHeading from "../ui/SectionHeading";
// import Row from "../ui/Row";
// import { useDispatch, useSelector } from "react-redux";
// import ProductCard from "../productcard/ProductCard";
// import { fetchProducts } from "../../features/products/productsThunk";

// const NewArrivals = () => {
//    const { products = [], loading } = useSelector((state) => state.product);

//     const dispatch = useDispatch();
//     useEffect(() => {
//         dispatch(fetchProducts());
//     }, [dispatch]);

//     console.log("Products in component:", products);
 
// const newArrivalProducts = products.filter(
//   (product) => product.category === "new"
// );
//   const layout = [
//     { basis: "md:basis-2/5", height: "md:h-[550px]" },
//     { basis: "md:basis-3/5", height: "md:h-[271px]" },
//     { basis: "md:basis-3/5", height: "md:h-[271px]" },
//     { basis: "md:basis-2/5", height: "md:h-[550px]" },
//   ];

//   return (
//     <section className="w-full py-[25px] md:py-[50px]">
//       <Row className="flex flex-col items-center">
//         <SectionHeading page="Home" order={3} />
//       </Row>

//       <Row className="flex flex-col md:flex-row gap-2">
//         <Row className="flex flex-col md:flex-row gap-2">
//           {newArrivalProducts.length > 0 ? (
//             newArrivalProducts.map((product, index) => (
//               <div
//                 key={product._id}
//                 className={`flex-1 ${layout[index]?.basis} h-auto ${layout[index]?.height}`}
//               >
//                 <ProductCard product={product} />
//               </div>
//             ))
//           ) : (
//             <p>No new arrivals found.</p>
//           )}
//         </Row>
//       </Row>
//     </section>
//   );
// };

// export default NewArrivals;
