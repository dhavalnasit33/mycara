import React, { useEffect } from "react";
import SectionHeading from "../ui/SectionHeading";
import Row from "../ui/Row";
import earringsImg from '../../assets/earrings.png';
import shoesImg from '../../assets/shoes.png';
import watchImg from '../../assets/watch.png';
import winterClothesImg from '../../assets/winter-clothes.png';
import { useDispatch } from "react-redux";
import { fetchPages } from "../../features/pages/pagesThunk";



const ImageCard = ({ name, img, textColor = "text-black" }) => {
  const lineTopPx = name === "Earings" || name === "Winter Cloths" ? 55 : 25;
  const textTopPx = name === "Earings" || name === "Winter Cloths" ? 60 : 30;

  const lineTopMobile = 20;
  const textTopMobile = 25;

  
    const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPages());
  }, [dispatch]);


  return (
    <div className="relative overflow-hidden cursor-pointer group h-full w-full">
      <img src={img} alt={name} className="w-full h-full object-cover" />

      {/* Desktop line */}
      <div
        className="absolute left-0 w-[38.72px] h-[1px] hidden sm:block"
        style={{
          top: `${lineTopPx}px`,
          backgroundColor: textColor === "text-black" ? "#000" : "#fff",
        }}
      ></div>

      {/* Mobile line */}
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
        <h3 className="text-[20px] sm:text-[30px] font-semibold leading-tight">{name}</h3>
        <p className="text-[12px] sm:text-[14px] font-normal mt-1 transition">Shop Now &gt;</p>
      </div>

      {/* Mobile text */}
      <div
        className={`${textColor} p-2 absolute left-[15px] sm:hidden`}
        style={{ top: `${textTopMobile}px` }}
      >
        <h3 className="text-[20px] font-semibold leading-tight">{name}</h3>
        <p className="text-[12px] font-normal mt-1 transition">Shop Now &gt;</p>
      </div>
    </div>
  );
};

const NewArrivals = () => {
  const newArrivalItems = [
    { id: 1, name: "Earings", img: earringsImg, textColor: "text-black" },
    { id: 2, name: "Shoes", img: shoesImg, textColor: "text-white" },
    { id: 3, name: "Watch", img: watchImg, textColor: "text-white" },
    { id: 4, name: "Winter Cloths", img: winterClothesImg, textColor: "text-black" },
  ];

const earrings = {
  ...newArrivalItems[0],
  classes: "lg:w-[428px] lg:h-[578px]  w-[100%] h-[240px]",
};

const shoes = {
  ...newArrivalItems[1],
  classes: "lg:w-[568px] lg:h-[285px]  w-[100%] h-[169px]",
};

const watch = {
  ...newArrivalItems[2],
  classes: "lg:w-[568px] lg:h-[285px]  w-[100%] h-[169px]",
};

const winterClothes = {
  ...newArrivalItems[3],
  classes: "lg:w-[428px] lg:h-[578px]  w-[100%] h-[240px]",
};

  return (
    <section className=" w-full py-[25px] md:py-[50px] ">
      <Row className="flex flex-col items-center">
        {/* <SectionHeading title="New Arrivals" /> */}
        <SectionHeading page="Home" sectionKey="content"  index={1} />
      </Row>

   
      
          <div className="grid gap-2 justify-center sm:grid-cols-1 md:grid-cols-1 lg:flex sm:px-4 md:px-4  ">
            
            <div className={earrings.classes}>
              <ImageCard {...earrings} />
            </div>

            <div className="flex flex-col gap-2 sm:flex-col">
              <div className={shoes.classes}>
                <ImageCard {...shoes} />
              </div>
              <div className={watch.classes}>
                <ImageCard {...watch} />
              </div>
            </div>

            <div className={winterClothes.classes}>
              <ImageCard {...winterClothes} />
            </div>

          </div>
        


    </section>
  );
};

export default NewArrivals;
