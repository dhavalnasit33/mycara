import { ArrowLeft, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function CheckoutForm() {
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  
  useEffect(() => {
    async function fetchStates() {
      try {
        const response = await fetch("https://countriesnow.space/api/v0.1/countries/states", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ country: "India" })
        });

        const data = await response.json()
        setStates(data.data.states);
      } catch (error) {
        console.error("Error loading states:", error);
      }
    }
    fetchStates();
  }, []);

  return (
    <div className="flex-1">
      {/* Contact Information */}
      <div className="mb-[30px]">
        <h2 className="text-20px ">Contact Information</h2>
        <span className="theme-border-block w-[59px] h-[2px] rounded-[10px] block mb-[12px]"></span>
        <p className="text-p text-light  mb-[30px]">We’ll use this email to send you details and updates about your order.</p>
        <input
          type="email"
          placeholder="Email Address"
          className="input-common"
        />
      </div>

      {/* Billing Details */}
      <div className="mb-[30px]">
        <h2 className="text-20px">Billing Details</h2>
        <span className="theme-border-block w-[59px] h-[2px] rounded-[10px] block mb-[12px]"></span>
        <p className="text-p text-light  mb-[30px]">Enter the address where you want your order delivered.</p>
            <div className="space-y-[10px] md:space-y-[28px] mb-[30px] ">
                <input type="text" placeholder="Country" className="input-common" />
                <div className="grid grid-cols-2 gap-[10px] md:gap-[27px]">
                    <input type="text" placeholder="First Name" className="input-common" />
                    <input type="text" placeholder="Last Name" className="input-common" />
                </div>
                <input type="text" placeholder="Address" className="input-common" />
            </div>
            <div className="flex items-center mb-[30px] gap-[12px]">
                <Plus size={16}/>
                <p className="text-p text-light">Add State, City And etc...</p>
            </div>
            <div className="space-y-[10px] md:space-y-[28px] mb-[30px]">
                <div className="grid grid-cols-2 gap-[10px] md:gap-[27px]">
                    {/* <input type="text" placeholder="State" className="input-common" /> */}
                    <select
                      className={ `input-common text-[#BCBCBC] ${selectedState === "" ? "placeholder-option" : ""}`}
                      value={selectedState}
                      onChange={(e) => setSelectedState(e.target.value)}
                    >
                      <option value="" disabled>
                        Select State
                      </option>

                      {states.map((state, index) => (
                        <option key={index} value={state.name} className="text-light">
                          {state.name}
                        </option>
                      ))}
                    </select>
                  <input type="text" placeholder="City" className="input-common" />
                </div>
                <div className="grid grid-cols-2 gap-[10px] md:gap-[27px]">
                    <input type="text" placeholder="Pin Code" className="input-common" />
                    <input type="text" placeholder="Phone (Optional)" className="input-common" />
                </div>
            </div>
            <div className="flex items-center">
                <input type="checkbox" className="mr-2 " />
                <label className="text-p text-light">Use same address for billing</label>
            </div>
        </div>

      {/* Shipping */}
      <div className="mb-[30px]">
        <h2 className="text-20px mb-[10px]">Shipping Options</h2>
        <div className="input-common flex justify-between" >
          <label className="flex items-center space-x-2">
            {/* <input type="radio" name="shipping" checked readOnly /> */}
            <input type="radio" name="shipping" checked readOnly
                className="accent-[#F43297] w-5 h-5 rounded-full cursor-pointer"
                />

            <span className="text-[#BCBCBC]">Free Shipping</span>
          </label>
          <span className="text-p sec-text-color">FREE</span>
        </div>
      </div>

      {/* Extra options */}
      <div className="flex flex-col pb-[30px] border-b light-border text-p text-light" >
        <label className="flex items-center pb-[10px]">
          <input type="checkbox" className="mr-[12px]" />
          <span>Add a note to order</span>
        </label>
        <label className="flex items-center">
          <input type="checkbox" className="mr-[12px]" />
          <span>Create an account?</span>
        </label>
      </div>

      <Link to="/cart" className="flex gap-[12px] items-center mt-[30px]">
        <ArrowLeft size={16}/>Back to cart
     </Link>  
    </div>
  );
}
