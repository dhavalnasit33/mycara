import React from "react";
import OrderCardMobile from "./OrderCardMobile";
import {  ChevronLeftIcon, ChevronRightIcon, MessageCircleMore, MoreHorizontal, MoreVertical, Search, SlidersHorizontal, SortDesc } from "lucide-react";
import sortImg from "../../assets/sorting.png";

const ordersData = [
  {
    id: 1,
    orderId: "0123454",
    date: "2 Oct, 2024",
    price: "₹1,430.00",
    paid: true,
    address: "25, Mota varacha",
    status: "Completed",
  },
  {
    id: 2,
    orderId: "142354",
    date: "4 Oct, 2024",
    price: "₹430.00",
    paid: false,
    address: "15, Nana varachha",
    status: "Pending",
  },
  {
    id: 3,
    orderId: "155676",
    date: "7 Oct, 2024",
    price: "₹599.00",
    paid: true,
    address: "10, Panvel Point",
    status: "Completed",
  },
  {
    id: 4,
    orderId: "1634676",
    date: "10 Oct, 2024",
    price: "₹2,599.00",
    paid: true,
    address: "12, dfopfjkoo",
    status: "Completed",
  },
];

export default function Orders() {
  return (
    <div>
    
        <div className="w-full flex flex-row items-center justify-between gap-3 sm:gap-5 mb-[18px]">
          <div className="w-[226px] flex items-center box-shadow rounded-[3px] px-[10px] py-[6px] ">
            <Search className="text-[#BCBCBC] mr-[15px]" size={20} />
            <input
              type="text"
              placeholder="Search anything.."
              className="w-full outline-none text-[#BCBCBC] text-p"
            />
          </div>
          <div className="flex gap-[10px] sm:gap-[17px]">
            <button className="w-full  md:w-[109px] flex items-center justify-between sm:justify-between text-p sec-text-color box-shadow px-[10px] sm:px-[14px] py-[6px] transition ">
              <span className="hidden md:inline">Filter</span>
              <SlidersHorizontal size={18} />
            </button>

            <button className="w-full md:w-[109px] flex items-center justify-center sm:justify-between text-p sec-text-color box-shadow px-[10px] sm:px-[14px] py-[6px] transition ">
              <span className="hidden md:inline">Sort</span>
              <SortDesc size={18} />
            </button>
          </div>
        </div>


      <table className="hidden min-[980px]:table w-full box-shadow rounded-[10px] w-full border-collapse overflow-hidden ">
        <thead className="light-color text-20px text-dark ">
          <tr>
            <th className="p-[12px] px-[30px] py-[10px] text-left font-normal">#</th>
            <th className="p-[12px] py-[10px] text-left flex gap-[7px] items-center font-normal">Order ID<img src={sortImg} className="h-[14px] w-[14px]"/></th>
            <th className="p-[12px] py-[10px] text-left font-normal">Date</th>
            <th className="p-[12px] py-[10px] text-left font-normal">Price</th>
            <th className="p-[12px] py-[10px] text-left font-normal">Paid</th>
            <th className="p-[12px] py-[10px] text-left font-normal">Address</th>
            <th className="p-[12px] py-[10px] text-left font-normal">Status</th>
            <th className="p-[12px] py-[10px] px-[30px] text-center font-normal">Action</th>
          </tr>
        </thead>
        
        <tbody>
          {ordersData.map((order, index) => (
            <tr key={order.id} className="border-b border-[#BCBCBC]  border-0.5 text-p sec-text-color">
              <td className="p-3 px-[30px] h-[75px]">{index + 1}</td>
              <td className="p-3 h-[75px]">{order.orderId}</td>
              <td className="p-3 h-[75px]">{order.date}</td>
              <td className="p-3 h-[75px]">{order.price}</td>
              <td className="p-3 h-[75px]">
                <span
                className={` flex justify-center items-center px-2 py-1 text-[12px]  font-medium rounded-[3px] w-[60px] items-center ${
                    order.paid
                    ? "bg-[rgba(62,232,99,10%)] text-[#3EE878]"
                    : "bg-[rgba(235,23,36,10%)] text-[#EB1724]"
                }`}
                >
                {order.paid ? "Yes" : "No"}
                </span>
              </td>
              <td className="p-3 h-[75px]">{order.address}</td>
              <td className="p-3 h-[75px]">
                <span
                  className={`flex justify-center items-center px-2 py-1 text-[12px]  font-medium rounded-[3px] w-[80px] lg:w-[98px] items-center ${
                    order.status === "Completed"
                      ? "bg-[rgba(62,232,99,10%)] text-[#3EE878]"
                      : order.status === "Pending"
                      ? "bg-[rgba(235,23,36,10%)] text-[#EB1724]"
                      : "bg-yellow-100 text-yellow-600"
                  }`}
                >
                  {order.status}
                </span>
              </td>
              <td className="p-3 px-[30px] h-[75px]">
                <div className="flex justify-center items-center gap-[10px] sec-text-color">
                  <MessageCircleMore size={24} />
                  <MoreVertical size={20} />
                </div>
              </td>

            </tr>
            
          ))}
          <tr>
            <td colSpan="8" className="px-[30px] py-[20px]">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-14 sec-text-color">
                    <p className="sec-text-color text-p">
                        Showing <span>1</span> to <span>10</span> of{" "}<span>89</span> entries
                    </p>
                    <div className="flex items-center gap-[10px]">
                        <button className="flex gap-[8px] items-center text-light text-p mr-[10px]">
                        <ChevronLeftIcon size={16}/> Back
                        </button>
                        <button className="w-[34px] h-[34px] p-1 text-14 light-color text-light rounded-[3px]">
                        1
                        </button>
                        <button className="w-[34px] h-[34px] p-1 text-14 light-color rounded-[3px] text-light">
                        2
                        </button>
                        <span className="w-[34px]  h-[34px] p-1 text-14 text-light flex items-center justify-center rounded-[3px] light-color"><MoreHorizontal size={18}/></span>
                        <button className="w-[34px] h-[34px]  p-1 text-14 light-color rounded-[3px] text-light">
                        9
                        </button>
                        <button className=" flex gap-[8px] items-center text-light text-p ml-[10px]">
                        Next <ChevronRightIcon size={16} />
                        </button>
                    </div>
                </div>
            </td>
            </tr>
        </tbody>
      </table>
      <OrderCardMobile orders={ordersData} />
    </div>
  );
}