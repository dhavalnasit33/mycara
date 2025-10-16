// import React, { useEffect } from 'react';
// import clothesBanner from '../../assets/clothes-banner.png'; 
// import Section from '../ui/Section';
// import Row from '../ui/Row';
// import Button from '../ui/Button';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchPages } from '../../features/pages/pagesThunk';
// import { getImageUrl } from '../utils/helper';

// const BannerClothes = () => {
//     const dispatch = useDispatch();
//   const { pages, loading, error } = useSelector((state) => state.pages);

//   useEffect(() => {
//     dispatch(fetchPages());
//   }, [dispatch]);

//   // Show loading/error first
//   if (loading) return <p>Loading Banner...</p>;
//   if (error) return <p>Error: {error}</p>;

//   const bannerData = pages?.find(page => page.slug?.toLowerCase() === 'home');

//   if (!bannerData) return <p>Loading Banner...</p>;


//   return (
//      <Section

//       className="relative mx-auto  min-h-[300px] h-auto lg:h-[719px] flex items-center justify-center overflow-hidden bg-cover bg-center inset-0" 
//       style={{backgroundImage: `linear-gradient( to bottom,rgba(0, 0, 0, 0.40), rgba(0, 0, 0, 0.20),rgba(115, 115, 115, 0.10)), 
//          url(${getImageUrl(bannerData?.image_url)})`,}}
//      > 
  
//       <Row
//         className="relative  h-[250px] sm:h-[400px] md:h-[563px] flex items-center justify-center rounded-[10px] border border-white/50"
//         style={{
//           background: 'rgba(255, 255, 255, 0.1)', 
//           backdropFilter: 'blur(14px)',
//           WebkitBackdropFilter: 'blur(14px)',
//         }}
//       >
//       <div className="flex flex-col items-center justify-center text-center ">
//         <h1 
//           className="text-white  font-semibold tracking-wide text-[30px] lg:text-[80px] leading-tight"
//         >
//            {bannerData?.title }
//         </h1>
//         <p 
//           className="text-white font-normal mt-2  text-[12px]  lg:text-[22px]"
//         >
//           {bannerData?.description}
//         </p>

//            {bannerData?.is_button && bannerData?.button_name && (
//             <Button
//               variant="secondary"
//               className="mt-[50px] text-theme !text-[18px] md:!text-[24px]"
//               onClick={() => window.location.href = bannerData.button_link}
//             >
//                 {bannerData?.button_name }
//             </Button>
//           )}
//       </div>
//     </Row>
//     </Section>
//   );
// };

// export default BannerClothes;

import React, { useEffect } from 'react';
import Section from '../ui/Section';
import Row from '../ui/Row';
import Button from '../ui/Button';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPages } from '../../features/pages/pagesThunk';
import { getImageUrl } from '../utils/helper';

const BannerClothes = () => {

    const dispatch = useDispatch();
    const { pages, loading, error } = useSelector((state) => state.pages);

    useEffect(() => {
        dispatch(fetchPages());
    }, [dispatch]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

      const homepage = pages.find(page => page.slug === 'home');


  return (
    <>
    {homepage?.sections.map(section => (
    <Section
      className="relative mx-auto min-h-[300px] h-auto lg:h-[719px] flex items-center justify-center overflow-hidden bg-cover bg-center inset-0"
      style={{
        backgroundImage: `linear-gradient(
          to bottom,
          rgba(0, 0, 0, 0.40),
          rgba(0, 0, 0, 0.30),
          rgba(115, 115, 115, 0.30)
        ), url(${getImageUrl(section.image_url)})`,
      }}
    >

      <Row
        className="relative h-[250px] sm:h-[400px] md:h-[563px] flex items-center justify-center rounded-[10px] border border-white/50"
        style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
        }}
      >
        <div className="flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-white font-semibold tracking-wide text-[30px] lg:text-[80px] leading-tight">
            {section.title}
          </h1>
          <p className="text-white font-normal mt-2 text-[12px] lg:text-[22px]">
            {section.description}
          </p>

          {section.is_button && section.button_name && (
            <Button
              variant="secondary"
              className="mt-[50px] text-theme !text-[18px] md:!text-[24px]"
              onClick={() => window.location.href = section.button_link}
            >
              {section.button_name}
            </Button>
          )}
        </div>
     
      </Row>
    </Section>
       ))}
       </>
  );
};

export default BannerClothes;
