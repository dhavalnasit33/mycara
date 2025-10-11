import React, { useState } from "react";
import { Minus, Plus, Eye, Trash2 } from "lucide-react";
import Button from "../ui/Button";

const Wishlist = ({ products }) => {
  const [quantities, setQuantities] = useState(
    products.map((p) => p.quantity || 1)
  );

  const increment = (index) =>
    setQuantities((prev) =>
      prev.map((q, i) => (i === index ? q + 1 : q))
    );

  const decrement = (index) =>
    setQuantities((prev) =>
      prev.map((q, i) => (i === index ? (q > 1 ? q - 1 : 1) : q))
    );

  return (
    <div className="w-full">
      {/* ✅ Desktop Table */}
      <table className="w-full hidden custom-lg:table">
        <thead>
          <tr className="border-b border-black font-18">
            <th className="text-left pb-[16px]">
              <input type="checkbox" className="w-4 h-4" />
            </th>
            <th className="text-left p-4 font-normal">Product</th>
            <th className="text-center p-4 font-normal">Quantity</th>
            <th className="text-left p-4 font-normal">Price</th>
            <th className="text-left p-4 font-normal">Stock Status</th>
            <th className="text-right p-4 font-normal">Action</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product, index) => (
            <tr key={index} className="border-b light-border">
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
                  <button onClick={() => decrement(index)}>
                    <Minus size={14} />
                  </button>
                  <span>{quantities[index]}</span>
                  <button onClick={() => increment(index)}>
                    <Plus size={14} />
                  </button>
                </div>
              </td>

              <td className="p-4">
                <div className="flex gap-[5px] items-center">
                  {product.oldPrice && (
                    <span className="sec-text-color text-14 line-through">
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
                    <Eye size={30}
                      className="border light-border rounded-[3px] p-[4px]"
                    />
                    <Button variant="common"
                      className="!min-w-[113px] !py-[5px] !px-[8px] !rounded-[3px] text-14"
                    >
                      Add To Cart
                    </Button>
                    <Trash2 size={30}
                      className="border light-border rounded-[3px] p-[4px]"
                    />
                  </div>
                  <div className="text-[12px] text-[#BCBCBC]">
                    <span>Added on Jan 30, 2025</span>
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ✅ Mobile Layout */}
      <div className="flex flex-col gap-4 custom-lg:hidden mt-4">
        {products.map((product, index) => (
          <div key={index}
            className="bg-white p-4 rounded-[5px] box-shadow flex sm:flex-nowrap gap-[20px] items-start"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-[90px] h-[110px] p-[5px] box-shadow"
            />
            <div className="flex-1 flex flex-col text-p">
              <h3 className="mb-[5px] break text-14">{product.name}</h3>
              <p className="mb-[10px] text-14">
                SKU : <span className="sec-text-color">{product.sku}</span>
              </p>

              <div className="flex items-center gap-[10px] text-14 mb-[10px]">
                <button
                  className="light-color rounded-[2px] flex items-center justify-center p-[2px]"
                  onClick={() => decrement(index)}
                >
                  <Minus size={12} />
                </button>
                <span>{quantities[index]}</span>
                <button
                  className="bg-color-100 rounded-[2px] flex items-center justify-center p-[2px] text-white"
                  onClick={() => increment(index)}
                >
                  <Plus size={12} />
                </button>
              </div>

              <div className="flex gap-[5px] items-center mb-[5px]">
                {product.oldPrice && (
                  <span className="sec-text-color text-14 line-through">
                    ₹{product.oldPrice}
                  </span>
                )}
                <span>₹{product.price}</span>
              </div>

              <div>
                {product.inStock ? (
                  <span className="text-[#3EE878] flex gap-[5px]">
                    ✔ {product.stockText}
                  </span>
                ) : (
                  <span className="text-[#EB1724] flex gap-[5px]">
                    ✖ {product.stockText}
                  </span>
                )}
              </div>

              <div className="flex justify-between items-center mt-2 gap-2 max-[360px]:flex-col max-[360px]:items-start">
                <div className="flex gap-2">
                  <Eye size={24} className="border p-1 rounded-md" />
                  <Trash2 size={24} className="border p-1 rounded-md" />
                </div>
                <Button
                  variant="common"
                  className="!min-w-[100px] !py-1 !px-4 !text-sm"
                >
                  Add To Cart
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
