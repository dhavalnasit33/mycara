import React, { useEffect } from 'react';
import clothesBanner from '../../assets/clothes-banner.png'; 
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

    const homepage = pages?.find(page => page.slug === 'home');
    const bannerSection = homepage?.sections?.find(section => section.order === 9);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;
    if (!bannerSection) return <p>No Section 9 Found</p>;


  return (
     <Section
      className="relative mx-auto  min-h-[300px] h-auto lg:h-[719px] flex items-center justify-center overflow-hidden bg-cover bg-center inset-0" 
      style={{backgroundImage: `linear-gradient( to bottom,rgba(0, 0, 0, 0.40), rgba(0, 0, 0, 0.20),rgba(115, 115, 115, 0.10)), 
          url(${getImageUrl(bannerSection.image_url)})`,}}
     > 
      <Row
        className="relative  h-[250px] sm:h-[400px] md:h-[563px] flex items-center justify-center rounded-[10px] border border-white/50"
        style={{
          background: 'rgba(255, 255, 255, 0.1)', 
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
        }}
      >
      <div className="flex flex-col items-center justify-center text-center ">
        <h1 
          className="text-white  font-semibold tracking-wide text-[30px] lg:text-[80px] leading-tight"
        >
           {bannerSection.title}
        </h1>
        <p 
          className="text-white font-normal mt-2  text-[12px]  lg:text-[22px]"
        >
          {bannerSection.description}
        </p>
          <Button
            variant="secondary"
            className="mt-[50px] text-theme !text-[18px] md:!text-[24px]"
            onClick={() => window.location.href = bannerSection.button_link}
          >
              {bannerSection.button_name }
          </Button>
      </div>
    </Row>
    </Section>
  );
};

export default BannerClothes;