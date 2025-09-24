import React from 'react';
import ShippingIcon from '../assets/Shipping.svg';
import ReturnIcon from '../assets/Return.png';
import SecurityIcon from '../assets/Security.svg';

const Features = () => {
  return (
    <section className="py-12 px-4">
      <div className="container mx-auto flex flex-wrap justify-center gap-6 md:gap-10">
        
        {/* Shipping Worldwide */}
        <div className="flex items-start max-w-sm">
          <div className="relative w-[49px] h-[49px]  p-2 flex-shrink-0 flex items-center justify-center rounded-full" style={{ background: 'linear-gradient(to bottom right, #ffffffff 80%, #FFFFFF 100%)' }}>
            <div className="absolute inset-0 rounded-full" style={{ background: 'linear-gradient(to right, #f85eaeff 80%, #FFFFFF 100%)', clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' }}></div>
            <img src={ShippingIcon} alt="Shipping Worldwide" className="w-12 h-12 relative z-10" />
          </div>
          <div className="ml-4">
            <h4 className="font-semibold text-lg md:text-xl">Shipping Worldwide</h4>
            <p className="text-gray-600 mt-1">We deliver to all the locations across the world.</p>
          </div>
        </div>
        
        {/* 14 Days Return */}
        <div className="flex items-start max-w-sm">
          <div className="relative w-[49px] h-[49px] p-2 flex-shrink-0 flex items-center justify-center rounded-full" style={{ background: 'linear-gradient(to bottom right, #ffffffff 80%, #FFFFFF 100%)' }}>
            <div className="absolute inset-0 rounded-full" style={{ background: 'linear-gradient(to right, #f85eaeff 80%, #FFFFFF 100%)', clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' }}></div>
            <img src={SecurityIcon} alt="14 Days Return" className="w-9 h-10 relative z-10" />
          </div>
          <div className="ml-4">
            <h4 className="font-semibold text-lg md:text-xl">14 Days Return</h4>
            <p className="text-gray-600 mt-1">We believe in satisfying and delighting our customers.</p>
          </div>
        </div>
        
        {/* Security Payment */}
        <div className="flex items-start max-w-sm">
          <div className="relative w-[49px] h-[49px] p-2 flex-shrink-0 flex items-center justify-center rounded-full" style={{ background: 'linear-gradient(to bottom right, #ffffffff 80%, #FFFFFF 100%)' }}>
            <div className="absolute inset-0 rounded-full" style={{ background: 'linear-gradient(to right, #f85eaeff 80%, #FFFFFF 100%)', clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' }}></div>
            <img src={ReturnIcon} alt="Security Payment" className="w-6 h-7 relative z-10" />
          </div>
          <div className="ml-4">
            <h4 className="font-semibold text-lg md:text-xl">Security Payment</h4>
            <p className="text-gray-600 mt-1">Security is a priority at MYcra.in and we make every effort to..</p>
          </div>
        </div>
        
      </div>
    </section>
  );
};

export default Features;
