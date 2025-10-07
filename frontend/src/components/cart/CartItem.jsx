import img1 from "../../assets/suit.png";
import img2 from "../../assets/Mojari.png";
import img3 from "../../assets/Girls full sleave fancy t shirt.png";
import remove from "../../assets/remove.png";
import { Minus, Plus } from "lucide-react";

export default function CartItem() {
  const items = [
    { image: img1, name: "Women Floral Printed Anarkali Kurta", price: 1430, quantity: 1 },
    { image: img2, name: "Women Latest Trendy Pink Mojari", price: 1200, quantity: 2 },
    { image: img3, name: "Women Trendy Cream T-Shirt", price: 1000, quantity: 1 },
  ];

  return (
    <div className="w-full">
      {/* Desktop View */}
      <table className="w-full hidden custom-lg:table">
        <thead className="table-header-group">
          <tr className="border-b border-black font-18">
            <th></th>
            <th className="text-left pt-0 p-4 font-normal">Product Image</th>
            <th className="text-center pt-0 p-4 font-normal">Product Name</th>
            <th className="text-left pt-0 p-4 font-normal">Quantity</th>
            <th className="text-left pt-0 p-4 font-normal">Unit Price</th>
            <th className="text-center pt-0 p-4 font-normal">Total</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index} className="border-b border-[#BCBCBC] font-18 sec-text-color">
              <td className="py-4">
                <button className="w-[20px] h-[20px]">
                  <img src={remove} />
                </button>
              </td>
              <td className="p-4 w-[162px]">
                <img src={item.image} alt={item.name} className="box-shadow object-cover p-[5px]  w-[130px] h-[176px]" />
              </td>
              <td className="p-4 break">{item.name}</td>
              <td className="p-4">
                <div className="inline-flex items-center gap-[10px] px-[8px] py-[5px] border-[#BCBCBC] border text-black rounded-[20px] leading">
                  <button><Minus size={14}/></button>
                  <span>{item.quantity}</span>
                  <button><Plus size={14}/></button>
                </div>
              </td>
              <td className="p-4 text-left">₹{item.price}</td>
              <td className="p-4 text-center">₹{item.price * item.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Mobile View */}
      <div className="custom-lg:hidden space-y-[20px]">
        {items.map((item, index) => (
        <div key={index} className="bg-white p-4 rounded-[5px] box-shadow relative flex  sm:flex-nowrap gap-[20px] items-start">
            <div className="flex items-center gap-[10px] flex-shrink-0">
                <button className="w-[10px] h-[10px] flex items-center justify-center">
                    <img src={remove} alt="remove" className="w-full h-full object-contain" />
                </button>
                <img src={item.image} alt={item.name} className="box-shadow object-cover p-[5px] h-[109px] w-[87px] " />
            </div>
            <div className="flex flex-col  flex-wrap ">
                <div className="mb-[8px] text-14 break">{item.name}</div>
                <div className="text-p mb-[12px] text-color">₹{item.price}</div>

                <div className="flex items-center gap-[10px] text-14">
                <button className="light-color rounded-[2px] flex items-center justify-center p-[2px] border border-gray-300">
                    <Minus size={12} />
                </button>
                <span>{item.quantity}</span>
                <button className="bg-color-100 rounded-[2px] flex items-center justify-center p-[2px] text-white">
                    <Plus size={12} />
                </button>
                </div>
            </div>
        </div>
        ))}
      </div>
    </div>
  );
}
