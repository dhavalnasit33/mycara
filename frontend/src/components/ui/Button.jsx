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
    common: "bg-color-100 text-white text-[22px] min-w-[200px] py-3  ",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
    danger: "bg-red-600 text-white hover:bg-red-700",
  };

  // Size styles
  const sizes = {
    sm: "py-1 px-3 text-sm",
    md: "py-2 px-6 text-base",
    lg: "py-3 px-8 text-lg",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`rounded  inline-flex  justify-center transition duration-300 ${variants[variant]} ${sizes[size]} ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
