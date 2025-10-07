
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
    <div className="mt-[65px]">
      {/* --- Desktop Tabs --- */}
      <div className="hidden md:flex gap-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-2 font-18 ${
              activeTab === tab
                ? "text-theme border-b-2 border-pink-500"
                : "text-black"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* --- Desktop Tab Content --- */}
      <div className="hidden md:block border border-[#BCBCBC] p-[38px]">
        {activeTab === "Delivery Location" && <DeliveryInfo />}
        {activeTab === "Product Information" && <p>Product details coming soon.</p>}
        {activeTab === "Customer Review" && <p>No reviews yet.</p>}
      </div>

      {/* --- Mobile Accordion --- */}
      <div className="md:hidden">
        {tabs.map((tab, index) => (
          <div key={index} className="border-t border-gray-200">
            <button
              className="w-full flex justify-between items-center p-4 text-left font-medium"
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
              <div className="px-4 pb-4 text-light">
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
