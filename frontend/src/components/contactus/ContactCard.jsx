// components/ContactCard.jsx
import React from 'react';

const ContactCard = ({ icon, title, description, linkText, linkHref }) => {
  return (
    <div className="border-2 border-dashed border-[#D2AF9F]  py-[29px]  px-[21px] text-center rounded-lg transition flex gap-[20px]">
      <div className="text-pink-600 text-3xl p-[10px] bg-color-100 w-[50px] h-[50px] rounded-[10px]">
        <span className="w-[30px] h-[30px] inline-flex items-center justify-center text-xl text-white">{icon}</span>
      </div>
      <div className='text-left'>
        <h3 className="text-dark text-20px font-semibold mb-[7px] leading">{title}</h3>
        <div className="min-h-[82px] flex flex-col justify-between items-start">
            <p className="text-[#989696] text-14 break">{description}</p>
            <a href={linkHref} target="_blank"  className="text-theme font-medium underline text-left break">
                {linkText}
            </a>
        </div>
      </div>
    </div>
  );
};

export default ContactCard;
