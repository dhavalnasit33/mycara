import React, { useEffect } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { FaTwitter } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { fetchPages } from '../../features/pages/pagesThunk';
import { getImageUrl } from '../utils/helper';

export default function Hero() {
    const dispatch = useDispatch();
  const { pages, loading } = useSelector((state) => state.pages);

  useEffect(() => {
    dispatch(fetchPages());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  
  const homePage = pages?.find((page) => page.slug === "home");
  const heroSection = homePage?.sections?.find((sec) => sec.type === "hero_slider");
  const heroSlides = heroSection?.slides || [];


    const settings = {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
        autoplaySpeed: 3000,
        arrows: false,
        appendDots: dots => (
            <div className="  w-full">
                <ul className="flex justify-center lg:gap-[30px] ">{dots}</ul>
            </div>
        ),
        customPaging: i => (
            <div className="w-[16px] lg:w-[50px] h-[1px] lg:h-[4px] bg-white transition-colors duration-300 rounded-full"></div>
        )
    };

    return (
        <div className="relative w-full mx-auto">
            <div className="hidden lg:flex absolute items-center left-[-50px] top-0 bottom-0 flex-col justify-between z-20">
                
                <div className="flex flex-col items-center gap-2">
                    <div className="w-[1px] h-[50px] bg-[#D2AF9F]"></div>
                    <span className="rotate-[-90deg] text-[#D2AF9F] text-xs sm:text-sm tracking-widest mt-[60px]">
                        Winter Collection
                    </span>
                </div>
                
                <span className="rotate-[-90deg] text-[#D2AF9F] text-xs sm:text-sm mb-[30px]">
                    2024
                </span>
                
                <div className="flex flex-col items-center space-y-4">
                    <a href="#" aria-label="Twitter">
                           <FaTwitter size={20} className="text-black-600 hover:text-gray-500 transition-colors duration-300" />
                    </a>
                    <a href="#" aria-label="Heart">
                        <FaRegHeart size={20} className="text-black hover:text-gray-500" />
                    </a>
                </div>
            </div>

          <section className="relative min-h-[210px] sm:min-h-[210px] md:min-h-[210px] lg:min-h-[716px] bg-gradient-custom rounded-none sm:rounded-l-lg overflow-hidden flex items-center mx-2 mr-0 ml-0 lg:ml-[50px] mt-4">
                <Slider {...settings} className="w-full container-1440 h-full">
                    {heroSlides.map((slide, index) => (
                        <div key={index}>
                            <div className="w-full flex  flex-row md:flex-row items-center justify-between px-10 sm:px-10">
                                <div className="flex-1 text-left gap-[30px] ">
                                <h1 className=" text-stroke text-shadow-custom py-2 lg:py-5">
                                <span
                                    className="font-sans italic font-bold  sm:text-[26px] lg:text-[80px] text-black "
                                    dangerouslySetInnerHTML={{ __html: slide.title }}
                                />
                                </h1>
                                <div className="flex flex-col gap-[20px] lg:gap-[40px]">

                                <span className="text-black text-[8px] md:text-[8px] lg:text-[24px] leading-[19px] relative">
                                    {slide.description}
                                    <span className="absolute left-0 bottom-0 sm:translate-y-[0px] md:translate-y-[0px] lg:translate-y-[10px]  w-[56px] sm:w-[56px] md:w-[90px] lg:w-[225px] h-[0.5px] bg-black"></span>
                                </span>

                                <button
                                    className="lg:w-[160px] w-[72px] lg:h-[54px] h-[26px]  text-[12px]  lg:text-[22px] text-white font-regular rounded shadow-md duration-300 bg-color "
                                
                                >
                                    Shop Now!
                                </button>
                                </div>
                                </div>

                               <div className="flex-1 flex justify-center mt-0">
                                    <img
                                         src={getImageUrl(slide.background_image_url)}
                                        alt="Fashion"
                                        className="w-[132.02px] h-[170.18px] sm:w-[132.02px] sm:h-[170.18px] md:w-[132.02px] md:h-[170.18px] lg:w-[487.38px] lg:h-[607px] object-contain"
                                    />
                                </div>

                            </div>
                        </div>
                    ))}
                </Slider>
            </section>
        </div>
    );
};
