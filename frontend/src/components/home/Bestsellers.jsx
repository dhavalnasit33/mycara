import React, { useEffect } from 'react';
import Image1 from '../../assets/Short top.png';
import Image2 from '../../assets/dangali.png';
import Image3 from '../../assets/vanpees.png';
import Image4 from '../../assets/suit.png';
import SectionHeading from '../ui/SectionHeading';
import Row from '../ui/Row.jsx';


import IoIosArrow from '../icons/IoIosArrow';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../features/products/productsThunk.js';
import Section from '../ui/Section.jsx';
import { getImageUrl } from '../utils/helper.js';
import { fetchPages } from '../../features/pages/pagesThunk.js';


const Bestsellers = () => {
    const dispatch = useDispatch();
  //pages 
  const { pages, loading: pagesLoading, error } = useSelector((state) => state.pages);

  useEffect(() => {
    dispatch(fetchPages());
  }, [dispatch]);
  const homepage = pages?.find((page) => page.slug === 'home');
  const sectionHeadingData = homepage?.sections?.find((section) => section.order === 7);

  //products

  const { products = [], loading } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const sellersProducts = products.filter((product) =>
    product.variants?.some((variant) => variant.is_best_seller)
  );

  const bestSellersLimited = sellersProducts.slice(0, 4);

  if (loading) return <p>Loading...</p>;
  if (!bestSellersLimited.length) return <p>No best sellers found.</p>;

  return (
      <Section className='mt-[25px] md:mt-[50px]'>

            <Row>
              <SectionHeading title={sectionHeadingData?.title}/>
            </Row>

        <Row className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6">
          {bestSellersLimited.map((product, index) => (
            <SellerCard key={index} product={product} />
          ))}
        </Row>
        
        {/* "View all" Button */}
        <div className="flex justify-center pt-[40px] lg:pt-[70px]">
          <button className="lg:w-[217px] lg:w-[217px] flex items-center justify-center text-theme text-[12px] lg:text-[16px] font-sans border border-black py-3 px-5 rounded-[5px] transition-colors ">
            View all Best Seller's <IoIosArrow className="inline-block text-[30px]" />
          </button>
        </div>
      </Section> 
  );
};

const SellerCard = ({ product }) => {
  return (
    <div className="relative overflow-hidden bg-white rounded-[5px] group ">
      {/* Main Image */}
      <img
        src={getImageUrl(product.images)}
        alt={product.name}
        className="w-full sm:h-[222px]  md:h-[222px]  lg:h-[397.33px]  transition-transform duration-300 transform"
      />

      {/* Hover overlay */}
    <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
  <div className="w-[95%] h-[95%] bg-black bg-opacity-30 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-[5px] pointer-events-auto overflow-hidden cursor-pointer">

    <div className="bg-white px-4 py-2 lg:px-4 lg:py-2 rounded-[5px] text-center">
      <p className="text-black text-[10px]  lg:text-[18px] font-medium font-sans max-w-[250px]">{product.name}</p>
      <p className="text-black text-[8px] lg:text-[16px] font-sans"> Rs {product.variants?.[0]?.price ?? 'N/A'}</p>
    </div>
  </div>
</div>

    </div>
  );
};

export default Bestsellers;
