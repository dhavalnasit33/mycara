// import React from "react";

// export default function Row({ children, className = "" }) {
//   return (
//     <div className={` max-w-[100%] md:max-w-[1440px] mx-auto   ${className}`}>
//       {React.Children.map(children, (child) => (
//         <div className="mx-[10px] xl:mx-[auto]">{child}</div>
//       ))}
//     </div>
//   );
// }

export default function Row({ children, className = "" , style = {}, ...props }) {
  return (
   <div className={`w-[90%] md:w-[90%] lg:max-w-[1440px] mx-auto ${className}`} style={style} {...props}>
  {children}
</div>
  );
}

