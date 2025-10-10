// components/Wishlist/WishlistItemMobile.jsx
import React, { useState } from "react";
import { Minus, Plus, Eye, Trash2 } from "lucide-react";
import Button from "../ui/Button";

const WishlistItemMobile = ({ product }) => {
  const [quantity, setQuantity] = useState(product.quantity || 1);
  const increment = () => setQuantity(prev => prev + 1);
  const decrement = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  return (
    <div className="custom-lg:hidden space-y-[20px]">
      <div className="bg-white p-4 rounded-[5px] box-shadow relative flex sm:flex-nowrap gap-[20px] items-start">
        <img
          src={product.image}
          alt={product.name}
          className="w-[90px] h-[110px] p-[5px] box-shadow"
        />
        <div className="flex-1 flex flex-col text-p">
          <h3 className="mb-[5px] break text-14">{product.name}</h3>
          <p className="mb-[10px] text-14"> SKU : <span className="sec-text-color">{product.sku}</span> </p>
          <div className="flex items-center gap-[10px] text-14 mb-[10px] ">
                <button className="light-color rounded-[2px] flex items-center justify-center p-[2px] ">
                    <Minus size={12} onClick={decrement} />
                </button>
                <span>{quantity}</span>
                <button className="bg-color-100 rounded-[2px] flex items-center justify-center p-[2px] text-white">
                    <Plus size={12} onClick={increment}/>
                </button>
                </div>
                <div className="flex gap-[5px] items-center mb-[5px]">
                    {product.oldPrice && (
                        <span className="sec-text-color text-14 line-through ">
                        ₹{product.oldPrice}
                        </span>
                    )}
                    <span >₹{product.price}</span>
                </div>

                <div >
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
                    <Button variant="common" className="!min-w-[100px] !py-1 !px-4 !text-sm" >
                        Add To Cart
                    </Button>
                </div>

            </div>
      </div>
    </div>
  );
};

export default WishlistItemMobile;
