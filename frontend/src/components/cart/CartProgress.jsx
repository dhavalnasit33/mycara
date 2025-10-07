import React from "react";
import Row from "../ui/Row";
import Section from "../ui/Section";

export default function CartProgress() {
  const steps = [
    { step: 1, label: "Your Cart", active: true },
    { step: 2, label: "Checkout" },
    { step: 3, label: "Payment" },
  ];

  return (
    <Section>
      <Row className="flex justify-between items-center w-full !max-w-[677px] px-4 md:px-0 relative pt-[50px]">
        {steps.map((item, i) => (
          <div key={i} className="flex flex-col items-center relative flex-1">
            {/* Step Label */}
            <span className="text-[16px] md:text-[24px] text-light mb-[10px]">
              {item.label}
            </span>

            {/* Step Circle */}
            <div
              className={`flex items-center justify-center w-[30px] h-[30px] md:w-[50px] md:h-[50px] rounded-full text-[16px] md:text-[26px]  ${
                item.active ? "bg-color-100 text-white" : "sec-theme text-light"
              }`}
            >
              {item.step}
            </div>
            { i < steps.length - 1 && (
                <div
                    className={`absolute top-[70%] left-[50%] md:left-[40%] w-[50%] md:w-[60%] h-[3px] rounded-[20px] translate-y-[80%] translate-x-[50%] z-[-1] ${
                    item.active ? "bg-color-100 " : "sec-theme"
                    }`}
                ></div>
            )}

          </div>
        ))}
      </Row>
    </Section>
  );
}


//  <div
// className={`flex items-center justify-center w-[50px] h-[50px] rounded-full text-white ${
//     isCompleted ? "bg-color-100" : isActive ? "bg-color-100" : "sec-theme text-light"
//     }`}
// >
//     {isCompleted ? <Check size={20} /> : item.step}
// </div>

// {/* Connecting Line */}
// {i < steps.length - 1 && (
//     <div
//     className={`absolute top-1/2 left-[100%] w-20 h-[3px] rounded-full transform -translate-y-1/2 z-[-1] ${
//         i < activeStep - 1 ? "bg-color-100" : "sec-theme"
//     }`}
//     ></div>
// )}