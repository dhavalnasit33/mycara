import React, { useEffect } from 'react';
import SectionHeading from '../ui/SectionHeading';
import Row from '../ui/Row.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../features/products/productsThunk.js';
import Section from '../ui/Section.jsx';
import { getImageUrl } from '../utils/helper.js';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';


const Bestsellers = () => {
    const dispatch = useDispatch();

  const { products = [], loading } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const sellersProducts = products.filter((product) =>
    product.variants?.some((variant) => variant.is_best_seller)
  );

  const bestSellersLimited = sellersProducts.slice(0, 4);

  if (loading) return <p>Loading...</p>;
  // if (!bestSellersLimited.length) return <p>No best sellers found.</p>;


  return (
      <Section>

            <Row className="pt-[25px] md:pt-[50px]">
              <SectionHeading page="Home" order={7} />
            </Row>

        <Row className="grid grid-cols-2 lg:grid-cols-4 gap-[10px] lg:gap-[30px]">
          {bestSellersLimited.map((product, index) => (
            <SellerCard key={index} product={product} />
          ))}
        </Row>
        
        {/* "View all" Button */}
        <Row className="flex justify-center pt-[50px] md:pt-[100px] pb-[25px] md:pb-[50px]">
          <button className="lg:w-[217px] lg:w-[217px] gap-[5px] flex items-center justify-center text-theme text-[12px] lg:text-[16px] font-sans border border-black py-3 px-5 rounded-[5px] transition-colors ">
            View all Best Seller's <ArrowRight size={20} />
          </button>
        </Row>
      </Section> 
  );
};

const SellerCard = ({ product }) => {
  return (
     <Link to={`/products/${product._id}`}>
    <div className="relative overflow-hidden bg-white rounded-[5px] group  h-[300px] sm:h-[397px]" >
      {/* Main Image */}
      <img
        src={getImageUrl(product.images)}
        alt={product.name}
        className="w-full  h-full  transition-transform duration-300 transform"
      />

      {/* Hover overlay */}
    <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
  <div className="w-[95%] h-[95%] bg-black bg-opacity-30 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-[5px] pointer-events-auto overflow-hidden cursor-pointer">

    <div className="bg-white px-4 py-2 lg:px-4 lg:py-2 rounded-[5px] text-center mx-[10px]">
      <p className="text-black text-[10px]  lg:text-[18px] font-medium font-sans max-w-[250px]">{product.name}</p>
      <p className="text-black text-[8px] lg:text-[16px] font-sans"> Rs {product.variants?.[0]?.price ?? 'N/A'}</p>
    </div>
  </div>
</div>

    </div>
    </Link>
  );
};

export default Bestsellers;
