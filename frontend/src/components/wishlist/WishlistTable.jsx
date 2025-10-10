import React, { useState } from "react";
import { Minus, Plus, Eye, Trash2 } from "lucide-react";
import Button from "../ui/Button";
import WishlistItemMobile from "./WishlistItemMobile";

const WishlistItemDesktop = ({ product }) => {
  const [quantity, setQuantity] = useState(product.quantity || 1);
  const increment = () => setQuantity(prev => prev + 1);
  const decrement = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  return (
    <tr className="hidden custom-lg:table-row border-b light-border">
      <td className="py-4">
        <input type="checkbox" className="w-4 h-4" />
      </td>

      <td className="p-4 py-[40px] flex items-center gap-[25px] xl:gap-[40px]">
        <img
          src={product.image}
          alt={product.name}
          className="w-[74px] h-[84px] p-[5px] box-shadow"
        />
        <div className="text-p break">
          <h3 className="pb-[13px] leading">{product.name}</h3>
          <p>
            SKU : <span className="sec-text-color">{product.sku}</span>
          </p>
        </div>
      </td>

      <td className="p-4 text-center">
        <div className="inline-flex items-center gap-[10px] px-[8px] py-[6px] light-border border text-black rounded-[3px]">
          <button onClick={decrement}>
            <Minus size={14} />
          </button>
          <span>{quantity}</span>
          <button onClick={increment}>
            <Plus size={14} />
          </button>
        </div>
      </td>

      <td className="p-4">
        <div className="flex gap-[5px] items-center">
          {product.oldPrice && (
            <span className="sec-text-color text-14 line-through ">
              ₹{product.oldPrice}
            </span>
          )}
          <span className="text-p">₹{product.price}</span>
        </div>
      </td>

      <td className="p-4 text-p">
        {product.inStock ? (
          <span className="text-[#3EE878] flex gap-[5px]">
            ✔ {product.stockText}
          </span>
        ) : (
          <span className="text-[#EB1724] flex gap-[5px]">
            ✖ {product.stockText}
          </span>
        )}
      </td>

      <td className="p-4">
        <div className="flex flex-col items-end gap-[8px]">
          <div className="flex items-center gap-[5px]">
            <Eye size={30} className="border light-border rounded-[3px] p-[4px]" />
            <Button
              variant="common"
              className="!min-w-[113px] !py-[5px] !px-[8px] !rounded-[3px] text-14"
            >
              Add To Cart
            </Button>
            <Trash2 size={30} className="border light-border rounded-[3px] p-[4px]" />
          </div>
          <div className="text-[12px] text-[#BCBCBC]">
            <span>Added on Jan 30, 2025</span>
          </div>
        </div>
      </td>
    </tr>
  );
};

const WishlistTable = ({ products }) => {
  return (
    <div className="w-full">
      {/* Desktop Table */}
      <table className="w-full hidden custom-lg:table">
        <thead className="table-header-group">
          <tr className="border-b border-black font-18 ">
            <th className="text-left pb-[16px]">
              <input type="checkbox" className="w-4 h-4 " />
            </th>
            <th className="text-left pt-0 p-4 font-normal ">Product</th>
            <th className="text-center pt-0 p-4 font-normal">Quantity</th>
            <th className="text-left pt-0 p-4 font-normal">Price</th>
            <th className="text-left pt-0 p-4 font-normal">StockStatus</th>
            <th className="text-right pt-0 p-4 font-normal">Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <WishlistItemDesktop key={index} product={product} />
          ))}
        </tbody>
      </table>

      {/* Mobile layout */}
      <div className="flex flex-col gap-4 custom-lg:hidden">
        {products.map((product, index) => (
          <WishlistItemMobile key={index} product={product} />
        ))}
      </div>
    </div>
  );
};

export default WishlistTable;

