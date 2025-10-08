import React from "react";

const Button = ({
  children,
  onClick,
  variant = "primary", // default variant
  size = "md",         // default size
  className = "",
  type = "button",
  disabled = false,
}) => {
  // Variant styles
  const variants = {
    common: "bg-color-100 text-white text-[18px] min-w-[200px] py-[8px] md:py-[15px]  ",
    secondary: "bg-white text-black text-[18px] min-w-[200px] py-[8px] md:py-[15px] box-shadow",
    outline: "border border-[#BCBCBC] text-black text-[18px] min-w-[200px] py-[8px] md:py-[15px] ",
  };

  // Size styles
  const sizes = {
    sm: "py-1 px-3 text-sm",
    md: "py-2 px-6 text-base",
    lg: "py-3 px-8 text-[18px]",
  };

//   const variants = {
//   common: "bg-color-100 text-white text-[16px] lg:text-[18px] min-w-[200px] py-[12px] sm:py-[13.5px]",
//   secondary: "bg-white text-black text-[16px] lg:text-[18px] min-w-[200px] py-[12px] sm:py-[13.5px] box-shadow",
//   danger: "bg-red-600 text-white hover:bg-red-700 text-[16px] sm:text-[18px]",
// };

// // Size styles (optional)
// const sizes = {
//   sm: "py-1 px-3 text-sm lg:text-base",
//   md: "py-[8px] px-[10px] text-base lg:text-[18px]",
//   lg: "py-3 px-8 text-[16px] lg:text-[18px]",
// };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`rounded-[3px]  inline-flex  justify-center transition duration-300 ${variants[variant]} ${sizes[size]} ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
