import React from "react";

export default function Row({ children, className = "" }) {
  return (
    <div className={` max-w-[100%] md:max-w-[1440px] mx-auto ${className}`}>
      {React.Children.map(children, (child) => (
        <div className="mx-[10px] xl:mx-[auto] ">{child}</div>
      ))}
    </div>
  );
}


