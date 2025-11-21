// //D:\mycara\frontend\src\components\home\NewArrivals.jsx

import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import SectionHeading from "../ui/SectionHeading";
import Row from "../ui/Row";
import { fetchNewArrivals } from "../../features/products/productsThunk";
import ArrowRight from "../icons/ArrowRight";

const IMAGE_BASE_URL = "http://localhost:5000";
const NEW_ARRIVALS_LABEL_ID = "690450b34e15215dee956121";

const ImageCard = ({ name, img, textColor = "text-black", description }) => {
    const lineTopPx = name === "Earrings" || name === "Winter Cloths" ? 55 : 25;
    const textTopPx = name === "Earrings" || name === "Winter Cloths" ? 60 : 30;
    const lineTopMobile = 20;
    const textTopMobile = 25;

    return (
        <div className="relative overflow-hidden cursor-pointer group h-full w-full">
            <img
                src={img}
                alt={name}
                className="w-full h-full object-cover min-h-[250px] md:min-h-full"
            />
            
            {/* Desktop line and Mobile line code... */}
            <div
                className="absolute left-0 w-[38.72px] h-[1px] hidden sm:block"
                style={{
                    top: `${lineTopPx}px`,
                    backgroundColor: textColor === "text-black" ? "#000" : "#fff",
                }}
            ></div>
             <div
                className="absolute left-0 w-[38.72px] h-[1px] sm:hidden"
                style={{
                    top: `${lineTopMobile}px`,
                    backgroundColor: textColor === "text-black" ? "#000" : "#fff",
                }}
            ></div>

            {/* Desktop text */}
            <div
                className={`${textColor} p-2 absolute left-[15px] hidden sm:block`}
                style={{ top: `${textTopPx}px` }}
            >
                <h3 className="text-[20px] sm:text-[30px] font-semibold leading-tight">
                    {name}
                </h3>
                <p className="text-[12px] sm:text-[14px] font-normal mt-1 flex items-center gap-1">
                    <span>{description || "Shop Now"}</span>
                    <ArrowRight className="w-[6px] h-[11px]" />
                </p>
            </div>
             {/* Mobile text */}
            <div
                className={`${textColor} p-2 absolute left-[15px] sm:hidden`}
                style={{ top: `${textTopMobile}px` }}
            >
                <h3 className="text-[20px] font-semibold leading-tight">{name}</h3>
                <p className="text-[12px] font-normal mt-1 flex items-center gap-1">
                    <span>{description || "Shop Now"}</span>
                    <ArrowRight className="w-[6px] h-[11px]" />
                </p>
            </div>
        </div>
    );
};


//  NewArrivals Component
const NewArrivals = () => {
  const dispatch = useDispatch();
  const { newArrivals: items = [], newArrivalsLoading: loading, newArrivalsError: error } = useSelector((state) => state.products);

useEffect(() => {
  dispatch(fetchNewArrivals());
}, [dispatch]);


  const mappedItems = useMemo(() => {
    if (!items || items.length === 0) return [];

    const filteredProducts = items.filter((product) =>
      product.variants?.some((variant) =>
        variant.labels?.includes(NEW_ARRIVALS_LABEL_ID)
      )
    );

    const finalProductsToShow = filteredProducts.slice(0, 4);

    return finalProductsToShow.map((product, index) => {

       console.log("Labels:", product.variants?.[0]?.labels);
       
      const imageList = product?.images || [];
      const rawPath = imageList[0];

  let imagePath = "";


if (product.images && product.images.length > 0) {
  imagePath = product.images[0];
}

else if (product.variants?.[0]?.images?.length > 0) {
  imagePath = product.variants[0].images[0];
}

if (!imagePath) {
  imagePath = "/placeholder-image.png";
}

const finalImgUrl = imagePath.startsWith("http")
  ? imagePath
  : `${IMAGE_BASE_URL}/${imagePath.replace(/^\//, "")}`;

 


      return {
        name: product?.name || "Unnamed Product",
        img: finalImgUrl,
        description: product?.description || "Shop Now",
        textColor: index === 1 || index === 2 ? "text-white" : "text-black",
      };
    });
  }, [items]);

  if (loading) return (
    <section className="w-full py-[50px] text-center">
      <p className="text-xl font-medium">Loading New Arrivals...</p>
    </section>
  );

  if (error) return (
    <section className="w-full py-[50px] text-center">
      <p className="text-xl font-medium text-red-600">
        Error loading new arrivals: {String(error)}
      </p>
    </section>
  );

  if (mappedItems.length === 0) return (
    <section className="w-full py-[50px] text-center">
      <Row className="flex flex-col items-center">
        <SectionHeading page="Home" order={3} />
      </Row>
      <p className="text-xl font-medium text-gray-500">No New Arrivals found.</p>
    </section>
  );

  const getTextColorFor = (index) => {
    if (index === 0 || index === 1) return "text-black"; // 1st & 4th positions visually
    if (index === 2 || index === 3) return "text-white"; // middle ones visually
    return "text-black";
  };

  return (
    <section className="w-full py-[25px] md:py-[50px]">
      <Row className="flex flex-col items-center">
        <SectionHeading page="Home" order={3} />
      </Row>

      <Row className="flex flex-col md:flex-row gap-2">
     
        <div className="flex-1 md:basis-2/5 h-auto md:h-[550px]">
          
          {mappedItems[0] && <ImageCard {...mappedItems[0]} textColor={getTextColorFor(0)}/>}
        </div>

        <div className="flex-1 md:basis-3/5 flex flex-col gap-2">
         
          <div className="h-auto md:h-[271px]">
            {mappedItems[3] && <ImageCard {...mappedItems[3]}textColor={getTextColorFor(3)}  />}
          </div>
          
          <div className="h-auto md:h-[271px]">
            {mappedItems[2] && <ImageCard {...mappedItems[2]} textColor={getTextColorFor(2)}/>}
          </div>
        </div>

      
        <div className="flex-1 md:basis-2/5 h-auto md:h-[550px]">
          {mappedItems[1] && <ImageCard {...mappedItems[1]} textColor={getTextColorFor(1)}/>}
        </div>
      </Row>
    </section>
  );
};

export default NewArrivals;


