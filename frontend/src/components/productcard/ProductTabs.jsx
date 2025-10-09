
import React, { useState } from "react";
import DeliveryInfo from "./DeliveryInfo";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function ProductTabs() {
  const tabs = ["Delivery Location", "Product Information", "Customer Review"];
  const [activeTab, setActiveTab] = useState("Delivery Location");
  const [openAccordion, setOpenAccordion] = useState(null);

  const handleAccordionToggle = (index) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  return (
    <div className="mt-[30px] md:mt-[65px]">
      {/* --- Desktop Tabs --- */}
      <div className="hidden md:flex w-full">
         {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 px-[30px] py-[14px] text-center font-18 ${
              activeTab === tab
                ? "text-theme border-b-0 border border-[#BCBCBC] "
                : "text-black border-b border-[#BCBCBC] "
            }`}
          >
            {tab}
          </button>
        ))}
      </div>


      {/* --- Desktop Tab Content --- */}
      <div className="hidden md:block border border-[#BCBCBC] border-t-0 px-[38px] py-[45px] ">
        {activeTab === "Delivery Location" && <DeliveryInfo />}
        {activeTab === "Product Information" && <p>Product details coming soon.</p>}
        {activeTab === "Customer Review" && <p>No reviews yet.</p>}
      </div>

      {/* --- Mobile Accordion --- */}
      <div className="md:hidden">
        {tabs.map((tab, index) => (
          <div key={index} className="border-b border-[#BCBCBC]">
            <button
              className="w-full flex justify-between items-center py-4 text-left font-18"
              onClick={() => handleAccordionToggle(index)}
            >
              {tab}
            {openAccordion === index ? (
                <ChevronUp size={20} />
            ) : (
                <ChevronDown size={20} />
            )}
            </button>

            {openAccordion === index && (
              <div className=" pb-4 ">
                {index === 0 && <DeliveryInfo />}
                {index === 1 && <p>Product details coming soon.</p>}
                {index === 2 && <p>No reviews yet.</p>}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
