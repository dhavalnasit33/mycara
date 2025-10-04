import React from "react";
import OrderCardMobile from "./OrderCardMobile";
import { ChevronLeftIcon, ChevronRightIcon, MoreHorizontal, MoreVertical } from "lucide-react";

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
      <table className="hidden min-[980px]:table w-full box-shadow rounded-[10px] w-full border-collapse overflow-hidden ">
        <thead className="light-color text-20px text-dark font-normal">
          <tr>
            <td className="p-[12px] px-[30px] py-[10px] text-left">#</td>
            <td className="p-[12px] py-[10px] text-left">Order ID</td>
            <td className="p-[12px] py-[10px] text-left">Date</td>
            <td className="p-[12px] py-[10px] text-left">Price</td>
            <td className="p-[12px] py-[10px] text-left">Paid</td>
            <td className="p-[12px] py-[10px] text-left">Address</td>
            <td className="p-[12px] py-[10px] text-left">Status</td>
            <td className="p-[12px] py-[10px] px-[30px] text-center">Action</td>
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
              <td className="p-3  px-[30px] h-[75px] flex justify-center items-center"><MoreVertical size={20}/></td>
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