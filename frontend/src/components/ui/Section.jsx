import React from "react";

export default function Section({ children, className = "" }) {
  return (
    <section className={`w-full  py-[25px] md:py-[50px] ${className}`}>
      {children}
    </section>
  );
}
