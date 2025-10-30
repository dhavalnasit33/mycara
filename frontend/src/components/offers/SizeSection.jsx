import React, { useEffect } from "react";
import SectionHeading from "../ui/SectionHeading";
import Section from "../ui/Section";
import Row from "../ui/Row";
import sizeBg from "../../assets/size-bg.png"
import { useDispatch, useSelector } from "react-redux";
import { fetchPages } from "../../features/pages/pagesThunk";

const sizes = ["04", "05", "06", "07", "08", "09"];

export default function SizeSection() {
     const dispatch = useDispatch();
    const { pages, loading, error } = useSelector((state) => state.pages);

    useEffect(() => {
        dispatch(fetchPages());
    }, [dispatch]);

    const offerpage = pages?.find(page => page.slug === 'offer');
    const salebanner = offerpage?.sections?.find(section => section.order === 3);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;
    if (!salebanner) return <p>No Section 9 Found</p>;

  return (
    <>
        <Row>
            <div className="flex flex-wrap justify-center gap-5 max-w-[880px] mx-auto">
                {sizes.map((size, i) => (
                <div key={i}
                    className="flex flex-col bg-cover bg-no-repeat bg-center p-5 items-center justify-center w-[130px] h-[130px] rounded-full  box-shadow hover:scale-105 transition-transform 
                        duration-200 cursor-pointer" style={{ backgroundImage: `url(${sizeBg})` }}>
                    <p className="text-[24px] text-dark leading pb-2">Size</p>
                    <p className="text-[60px] font-medium text-dark leading">{size}</p>
                </div>
                ))}
            </div>
        </Row>
        <Row>
            <div className="mt-[60px] mx-auto max-w-[1122px] border-2 border-[#F43297] rounded-md text-14 py-7 px-[10px] md:px-[75px] text-center text-light">
                {salebanner.description }            
            </div>
        </Row>
    </>
  );
}
