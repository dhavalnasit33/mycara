
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
        <p className="text-[12px] sm:text-[14px] font-normal mt-1 transition">Shop Now &gt;</p>
      </div>

      {/* Mobile text */}
      <div className={`${textColor} p-2 absolute left-[15px] sm:hidden`} style={{ top: `${textTopMobile}px` }}>
        <h3 className="text-[20px] font-semibold leading-tight">{name}</h3>
        <p className="text-[12px] font-normal mt-1 transition">Shop Now &gt;</p>
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
