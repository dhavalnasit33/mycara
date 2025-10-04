import React, { useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

export default function OrderCardMobile({ orders }) {
  const [openRow, setOpenRow] = useState(null);

  const toggleRow = (id) => {
    setOpenRow(openRow === id ? null : id);
  };

  return (
    
    <div className="hidden max-[980px]:block [box-shadow:0_2px_4px_rgba(0,0,0,25%)] rounded-[10px] overflow-hidden">
        <div className="block  mb-3">
             <div className="flex items-center gap-10 light-color text-20px text-dark font-normal p-2 px-[12px]">
              <span className="text-black text-p ">#</span>
              <span className="text-black text-p ">Order Id</span>
            </div>
        </div>

      {orders.map((order, index) => (
        <div
          key={order.id}
          className="border-b"
        >
          <div
            className="flex justify-between items-center px-[12px] py-[15px]"
            onClick={() => toggleRow(order.id)}
          >
            <div className="flex items-center gap-10">
              <span className="sec-text-color text-p ">{index + 1}</span>
              <span className="sec-text-color text-p ">{order.orderId}</span>
            </div>
            {openRow === order.id ? (
              <ChevronUpIcon className="w-5 h-5 text-gray-500" />
            ) : (
              <ChevronDownIcon className="w-5 h-5 text-gray-500" />
            )}
          </div>

          {/* Expanded Details */}
          {openRow === order.id && (
            <div className="flex flex-col gap-[8px] px-[60px] pb-[20px] text-14 sec-text-color">
              <p className="flex items-center gap-2">
                <span className="text-black w-[80px] inline-block">Date:</span>
                <span>{order.date}</span>
               </p>

              <p className="flex items-center gap-2">
                <span className="text-black w-[80px] inline-block">Price:</span> 
                <span>{order.price}</span>
              </p>
              <p className="flex items-center gap-2">
                <span className="text-black w-[80px] inline-block">Paid:</span>{" "}
               <span
                className={`  px-2 py-1 text-[12px]  font-medium rounded-[3px] w-[60px] text-center  items-center ${
                    order.paid
                    ? "bg-[rgba(62,232,99,10%)] text-[#3EE878]"
                    : "bg-[rgba(235,23,36,10%)] text-[#EB1724]"
                }`}
                >
                {order.paid ? "Yes" : "No"}
                </span>
              </p>
              <p className="flex items-center gap-2">
                <span  className="text-black w-[80px] inline-block">Address:</span>
                <span>{order.address}</span>
              </p>
              <p className="flex items-center gap-2">
                <span  className="text-black w-[80px] inline-block">Status:</span>{" "}
                <span
                  className={`px-2 py-1 text-[12px]  font-medium rounded-[3px] w-[80px] lg:w-[98px] text-center items-center ${
                    order.status === "Completed"
                      ? "bg-[rgba(62,232,99,10%)] text-[#3EE878]"
                      : order.status === "Pending"
                      ? "bg-[rgba(235,23,36,10%)] text-[#EB1724]"
                      : "bg-yellow-100 text-yellow-600"
                  }`}
                >
                  {order.status}
                </span>
              </p>
            </div>
          )}
        </div>
      ))}
        <div className="flex justify-between items-center py-[18px] px-[12px] text-sm">
            <div className="flex flex-row justify-between items-center gap-3 text-14 sec-text-color w-full">
                <p className="sec-text-color text-p">
                    Showing <span>1</span> to <span>10</span> of <span>89</span> entries
                </p>
                <div className="flex items-center gap-[10px]">
                    <button className="flex items-center gap-1 text-light text-p">
                    <ChevronLeftIcon size={16} />
                    </button>
                    <button className="flex items-center gap-1 text-light text-p">
                    <ChevronRightIcon size={16} />
                    </button>
                </div>
            </div>
        </div>
    </div>
  );
}
