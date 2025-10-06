import React from "react";
import Row from "../ui/Row";
import Section from "../ui/Section";

export default function CartProgress() {
  return (
    <Section>
    <Row className="flex justify-center items-center gap-6 md:gap-12 ">
      {[
        { step: 1, label: "Your Cart", active: true },
        { step: 2, label: "Checkout" },
        { step: 3, label: "Payment" },
      ].map((item, i) => (
        <div key={i} className="flex flex-col items-center">
          <div
            className={`flex fle-row items-center justify-center w-8 h-8 rounded-full border-2 ${
              item.active
                ? "bg-pink-500 text-white border-pink-500"
                : "border-gray-300 text-gray-400"
            }`}
          >
            {item.step}
          </div>
          <span
            className={`ml-2 text-sm sm:text-base ${
              item.active ? "text-pink-500 font-semibold" : "text-gray-400"
            }`}
          >
            {item.label}
          </span>
          {i < 2 && (
            <div className="w-10 sm:w-20 h-[1px] bg-gray-300 mx-2 sm:mx-4"></div>
          )}
        </div>
      ))}
    </Row>
    </Section>
  );
}
