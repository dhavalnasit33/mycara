// D:\mycara\frontend\src\components\Features.jsx

import React from 'react';
import LinearColorIcon from './icons/LinearColorIcon';

import ShippingIcon from '../assets/Shipping.svg';
import ReturnIcon from '../assets/Return.png';
import SecurityIcon from '../assets/Security.svg';
import Row from './ui/Row';

const Features = () => {
  return (
    <section className="py-12 px-4">
      <Row>
        
        {/* Shipping Worldwide */}
        <div className="flex items-start max-w-sm">
          <div className="relative w-[49px] h-[49px] p-2 flex-shrink-0 flex items-center justify-center rounded-full">
            {/* Linear gradient background icon */}
          <LinearColorIcon width={48} height={48} id="icon-a-1" /> 
            <img src={ShippingIcon} alt="Shipping Worldwide" className="w-12 h-12 relative z-10" />
          </div>
          <div className="ml-4">
            <h4 className="font-medium text-[20px] md:text-xl">Shipping Worldwide</h4>
            <p className="text-[#989696] mt-1">We deliver to all the locations across the world.</p>
          </div>
        </div>
        
        {/* 14 Days Return */}
        <div className="flex items-start max-w-sm">
          <div className="relative w-[49px] h-[49px] p-2 flex-shrink-0 flex items-center justify-center rounded-full">
            <LinearColorIcon width={48} height={48} id="icon-a-2" /> 
            <img src={SecurityIcon} alt="14 Days Return" className="w-9 h-10 relative z-10" />
          </div>
          <div className="ml-4">
            <h4 className="font-semibold text-lg md:text-xl">14 Days Return</h4>
            <p className="text-gray-600 mt-1">We believe in satisfying and delighting our customers.</p>
          </div>
        </div>
        
        {/* Security Payment */}
        <div className="flex items-start max-w-sm">
          <div className="relative w-[49px] h-[49px] p-2 flex-shrink-0 flex items-center justify-center rounded-full">
            <LinearColorIcon width={48} height={48} id="icon-a-3" />  
            <img src={ReturnIcon} alt="Security Payment" className="w-12 h-10 relative " />
          </div>
          <div className="ml-4">
            <h4 className="font-semibold text-lg md:text-xl">Security Payment</h4>
            <p className="text-gray-600 mt-1">Security is a priority at MYcra.in and we make every effort to..</p>
          </div>
        </div>
        
      </Row>
    </section>
  );
};

export default Features;
