import React, { useEffect } from 'react';
import SectionHeading from '../ui/SectionHeading';
import Row from '../ui/Row.jsx';


import IoIosArrow from '../icons/IoIosArrow';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../features/products/productsThunk.js';
import Section from '../ui/Section.jsx';
import { getImageUrl } from '../utils/helper.js';


const Bestsellers = () => {
    const dispatch = useDispatch();

  const { products = [], loading } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const sellersProducts = products.filter((product) =>
    product.variants?.some((variant) => variant.is_featured)
  );

  const bestSellersLimited = sellersProducts.slice(0, 4);

  if (loading) return <p>Loading...</p>;
  if (!bestSellersLimited.length) return <p>No best sellers found.</p>;

  return (
      <Section className='mt-[25px] md:mt-[50px]'>

            <Row>
              <SectionHeading page="Home" order={7}/>
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
