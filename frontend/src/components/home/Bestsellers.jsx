import React from 'react';
import Image1 from '../../assets/Short top.png';
import Image2 from '../../assets/dangali.png';
import Image3 from '../../assets/vanpees.png';
import Image4 from '../../assets/suit.png';
import SectionHeading from '../ui/SectionHeading';
import Row from '../ui/Row.jsx';


import IoIosArrow from '../icons/IoIosArrow';


// Local images


const Bestsellers = () => {
  const products = [
    { name: "Short top", price: "Rs 399.00", image: Image1 },
    { name: "Gray Jumpsuit", price: "Rs 899.00", image: Image2 },
    { name: "Red Dress", price: "Rs 1299.00", image: Image3 },
    { name: "Blue Suit", price: "Rs 1899.00", image: Image4 },
  ];

  return (
    <div className="">
      <section className="w-full py-[25px] md:py-[50px] ">
        {/* Title Section */}
        <div className="relative flex justify-center items-center w-full">
          <div className="relative flex justify-center items-center w-full">
            <Row>
              <SectionHeading title="Our Best Seller's" />
            </Row>
          </div>
        </div>

        {/* Product Grid - Corrected for responsiveness */}
        <Row className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6">
          {products.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </Row>
        
        {/* "View all" Button */}
        <div className="flex justify-center pt-[40px] lg:pt-[70px]">
          <button className="lg:w-[217px] lg:w-[217px] flex items-center justify-center text-theme text-[12px] lg:text-[16px] font-sans border border-black py-3 px-5 rounded-[5px] transition-colors ">
            View all Best Seller's <IoIosArrow className="inline-block text-[30px]" />
          </button>
        </div>
      </section> {/* <-- Closed the section here */}
    </div>
  );
};

const ProductCard = ({ product }) => {
  return (
    <div className="relative overflow-hidden bg-white rounded-[5px] group ">
      {/* Main Image */}
      <img
        src={product.image}
        alt={product.name}
        className="w-full sm:h-[222px]  md:h-[222px]  lg:h-[397.33px]  transition-transform duration-300 transform"
      />

      {/* Hover overlay */}
    <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
  <div className="w-[95%] h-[95%] bg-black bg-opacity-30 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-[5px] pointer-events-auto overflow-hidden cursor-pointer">
    {/* Text container with white bg and black text */}
    <div className="bg-white px-4 py-2 lg:px-4 lg:py-2 rounded-[5px] text-center">
      <p className="text-black text-[10px]  lg:text-[18px] font-medium font-sans">{product.name}</p>
      <p className="text-black text-[8px] lg:text-[16px] font-sans">{product.price}</p>
    </div>
  </div>
</div>

    </div>
  );
};

export default Bestsellers;
