
import React, { useEffect, useState } from "react";
import OrderCardMobile from "./OrderCardMobile";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  MessageCircleMore,
  MoreVertical,
  Search,
  SlidersHorizontal,
  SortDesc,
} from "lucide-react";
import sortImg from "../../assets/sorting.png";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserOrders } from "../../features/orders/orderThunk";

export default function Orders() {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const limit = 5; 

  const dispatch = useDispatch();

  // Get Redux state
  const { orders = [], total = 0, loading } = useSelector((state) => state.orders);
  const start = (page - 1) * limit + 1;
  const end = Math.min(page * limit, total);

  // Fetch orders whenever page changes
  useEffect(() => {
    const userId = JSON.parse(localStorage.getItem("user"))._id;
    dispatch(fetchUserOrders({ userId, page, limit}));
  }, [dispatch, page]);

  // Filter orders by search term
  const filteredOrders = (orders || []).filter((order) =>
    JSON.stringify(order).toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(total / limit);

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    const formatted = date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
    const [day, month, year] = formatted.split(" ");
    return `${day} ${month}, ${year}`;
  };

  if (loading) return <p className="text-center py-10">Loading orders...</p>;

  return (
    <div>
      {/* Search, Filter, Sort */}
      <div className="w-full flex flex-row items-center justify-between gap-3 sm:gap-5 mb-[18px]">
        <div className="w-[226px] flex items-center box-shadow rounded-[3px] px-[10px] py-[6px]">
          <Search className="text-[#BCBCBC] mr-[15px]" size={20} />
          <input
            type="text"
            placeholder="Search anything.."
            className="w-full outline-none text-[#BCBCBC] text-p"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-[10px] sm:gap-[17px]">
          <button className="w-full md:w-[109px] flex items-center justify-between text-p sec-text-color box-shadow px-[10px] py-[6px] transition">
            <span className="hidden md:inline">Filter</span>
            <SlidersHorizontal size={18} />
          </button>
          <button className="w-full md:w-[109px] flex items-center justify-between text-p sec-text-color box-shadow px-[10px] py-[6px] transition">
            <span className="hidden md:inline">Sort</span>
            <SortDesc size={18} />
          </button>
        </div>
      </div>

      {/* Orders Table */}
      <table className="hidden min-[980px]:table w-full box-shadow rounded-[10px] border-collapse overflow-hidden">
        <thead className="light-color text-20px text-dark">
          <tr>
            <th className="p-[12px] px-[30px] py-[10px] text-left font-normal">#</th>
            <th className="p-[12px] py-[10px] text-left flex gap-[7px] items-center font-normal">
              Order ID <img src={sortImg} className="h-[14px] w-[14px]" alt="sort" />
            </th>
            <th className="p-[12px] py-[10px] text-left font-normal">Date</th>
            <th className="p-[12px] py-[10px] text-left font-normal">Price</th>
            <th className="p-[12px] py-[10px] text-left font-normal">Paid</th>
            <th className="p-[12px] py-[10px] text-left font-normal">Address</th>
            <th className="p-[12px] py-[10px] text-left font-normal">Status</th>
            <th className="p-[12px] py-[10px] px-[30px] text-center font-normal">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order, index) => (
              <tr key={order._id} className="border-b light-border border-0.5 text-p sec-text-color">
                <td className="p-3 px-[30px] h-[75px]">{index + 1 + (page - 1) * limit}</td>
                <td className="p-3 h-[75px]">{order.order_id || order._id}</td>
                <td className="p-3 h-[75px]">{formatDate(order.createdAt)}</td>
                <td className="p-3 h-[75px]">₹{order.total_price?.toLocaleString()}</td>
                <td className="p-3 h-[75px]">
                  <span
                    className={`flex justify-center items-center px-2 py-1 text-[12px] font-medium rounded-[3px] w-[60px] ${
                      order.is_paid ? "bg-[rgba(62,232,99,10%)] text-[#3EE878]" : "bg-[rgba(235,23,36,10%)] text-[#EB1724]"
                    }`}
                  >
                    {order.is_paid ? "Yes" : "No"}
                  </span>
                </td>
                <td className="p-3 h-[75px]"> {order.shippingAddress?.address || "-"}</td>
                <td className="p-3 h-[75px]">
                  <span
                    className={`flex justify-center items-center px-2 py-2 text-[12px] font-medium rounded-[3px] w-[98px] ${
                      order.status === "completed"
                        ? "bg-[rgba(62,232,99,10%)] text-[#3EE878]"
                        : order.status === "pending"
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
            ))
          ) : (
            <tr>
              <td colSpan="8" className="text-center py-6 text-gray-400">
                No results found.
              </td>
            </tr>
          )} 

          {/* Pagination */}
          {totalPages > 1 && (
          <tr>
            <td colSpan="8" className="px-[30px] py-[20px]">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-14 sec-text-color">
                <p className="sec-text-color text-p">
                  Showing <span>{total === 0 ? 0 : start}</span> to <span>{end}</span> of <span>{total}</span> entries
                </p>
                <div className="flex items-center gap-[10px]">
                  <button className="flex gap-[8px] items-center text-light text-p mr-[10px]"  onClick={() => setPage((p) => Math.max(p - 1, 1))}
                    disabled={page === 1}>
                    <ChevronLeftIcon size={16} /> Back
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => (
                    <button
                      key={i}
                      onClick={() => setPage(i + 1)}
                      className={`w-[34px] h-[34px] text-light p-1 text-14 rounded-[3px] ${
                        page === i + 1
                          ? "light-color "
                          : "box-shadow"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                  <button className="flex gap-[8px] items-center text-light text-p ml-[10px]" onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                    disabled={page === totalPages}>
                    Next <ChevronRightIcon size={16} />
                  </button>
                </div>
              </div>
            </td>
          </tr>
          )}
        </tbody>
      </table>

      {/* Mobile Orders */}
      <OrderCardMobile
        orders={orders}
        total={total}
        page={page}
        totalPages={totalPages}
        limit={limit}
        onPageChange={(newPage) => setPage(newPage)}
      />
    </div>
  );
}
