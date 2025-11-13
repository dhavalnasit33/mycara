<<<<<<< HEAD
//D:\mycara\frontend\src\components\wishlist\WishlistTable.jsx

import React, { useState } from "react";
import { Minus, Plus, Eye, Trash2 } from "lucide-react";
=======
import React, { useEffect, useState } from "react";
import { Minus, Plus, Eye, Trash2, Link } from "lucide-react";
>>>>>>> 437ec24e58425f561a3f4f4bed52f9e20984014d
import Button from "../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { fetchWishlistByUser, removeWishlistItem } from "../../features/wishlist/wishlistThunk";
import { getImageUrl } from "../utils/helper";
import { useNavigate } from "react-router-dom";
import { addToCart, fetchCart } from "../../features/cart/cartThunk";

const Wishlist = ({product}) => {
  const [quantities, setQuantities] = useState([]);
  const dispatch = useDispatch();
  const { items = [] } = useSelector((state) => state.wishlist);
  const userId = useSelector((state) => state.auth.user?._id);
  const wishlistId = useSelector((state) => state.wishlist.wishlistId);

  const increment = (index) =>
    setQuantities((prev) =>
      prev.map((q, i) => (i === index ? q + 1 : q))
    );

  const decrement = (index) =>
    setQuantities((prev) =>
      prev.map((q, i) => (i === index ? (q > 1 ? q - 1 : 1) : q))
    );

  useEffect(() => {
    if (userId) {
      dispatch(fetchWishlistByUser(userId));
    }
  }, [dispatch, userId]);

  // ✅ Keep quantities array in sync with items
  useEffect(() => {
    if (Array.isArray(items)) {
      setQuantities(items.map((p) => p.quantity || 1));
    } else {
      setQuantities([]);
    }
  }, [items]);


  //delete item
const handleRemove = (item_id, wishlistId) => {
  dispatch(removeWishlistItem({ wishlist_id: wishlistId, item_id }))
    .then(() => dispatch(fetchWishlistByUser(userId)));
};

const formattedItems = Array.isArray(items)
  ? items.map((item) => ({
      ...item,
      product: item.product_id,
      variant: item.variant_id,
    }))
  : [];

  const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short", 
    day: "2-digit", 
    year: "numeric",
  });
};


//adddtocart
 const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
    const [showLoginPopup, setShowLoginPopup] = useState(false);

  const handleAddToCart = async (item) => {
  if (!token) {
    setShowLoginPopup(true);
    return;
  }

  let cart_id = localStorage.getItem("cart_id");
  const product_id = item.product?._id;    
  const variant_id = item.variant?._id;  
  const quantity = 1;

  if (!product_id || !variant_id) {
    alert("Product or variant not found!");
    console.log("Invalid item:", item);
    return;
  }

  if (!cart_id || cart_id === "undefined") {
    await dispatch(fetchCart()).unwrap();
    cart_id = localStorage.getItem("cart_id");
  }

  if (!cart_id || cart_id === "undefined") {
    alert("Cart not found. Please refresh and try again.");
    return;
  }
  const payload = { cart_id, product_id, variant_id, quantity };
  dispatch(addToCart(payload))
    .unwrap()
    .then(() => {
      dispatch(fetchCart());
      navigate("/cart");
    })
    .catch((err) => alert(err || "Failed to add item to cart"));
};




  return (
    <div className="w-full">
      {formattedItems.length > 0 ? (
          <>
      {/* ✅ Desktop Table */}
      <table className="w-full hidden custom-lg:table">
        <thead>
          <tr className="border-b border-black font-18">
            <th className="text-left">
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

           {formattedItems.map((item, index) => (
            <tr key={item._id} className="border-b light-border">
              <td className="py-4">
                <input type="checkbox" className="w-4 h-4" />
              </td>

              <td className="p-4 py-[40px] flex items-center gap-[25px] xl:gap-[40px]">
                  <img
                    src={getImageUrl(item.product?.images)}
                    alt={item.product?.name}
                    className="w-[74px] h-[84px] p-[5px] box-shadow"
                  />
                <div className="text-p break">
                  <h3 className="pb-[13px] leading">{item.product?.name}</h3>
                  <p>
                    SKU : <span className="sec-text-color">{item.variant?.sku || item.variant?.sku || "N/A"}</span>
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
                  {item.variant?.oldPrice && (
                    <span className="sec-text-color text-14 line-through">
                      ₹{item.variant?.oldPrice}
                    </span>
                  )}
                  <span className="text-p">₹{(item.variant?.price || 0)*(item.quantity || 1)}</span>
                </div>
              </td>

              <td className="p-4 text-p">
                {item.variant?.stock_quantity > 0 ? (
                  <span className="text-[#3EE878] flex gap-[5px]">
                    ✔ In Stock
                  </span>
                ) : (
                  <span className="text-[#EB1724] flex gap-[5px]">
                    ✖ Out of Stock
                  </span>
                )}
              </td>

              <td className="p-4">
                <div className="flex flex-col items-end gap-[8px]">
                  <div className="flex items-center gap-[5px]">
                    <Eye size={30}
                      className="border light-border rounded-[3px] p-[4px]"
                    />
                    <Button variant="common" onClick={() => handleAddToCart(item)}
                      className="!min-w-[113px] !py-[5px] !px-[8px] text-14"
                    >
                      Add To Cart
                    </Button>
                    <Trash2
                      size={30}
                      className="border rounded-[3px] p-[4px] cursor-pointer"
                      onClick={() => handleRemove(item._id ,wishlistId)}
                    />

                  </div>
                  <div className="text-[12px] text-[#BCBCBC]">
                    {/* <span>Added on Jan 30, 2025</span> */}
                    <span>Added on {formatDate(item.created_at)}</span>
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
       </>
      ) : (
        <p className="text-center py-6 text-gray-500 text-lg">
          Your wishlist is empty.
        </p>
      )}

{/* mobile view wishlist */}
      <div className="flex flex-col gap-4 custom-lg:hidden mt-4">
     {formattedItems.map((item, index) => (
          <div key={index}
            className="bg-white p-4 rounded-[5px] box-shadow flex sm:flex-nowrap gap-[20px] items-start"
          >
            <Link to={`/products/${item.product?._id}`}>
            <img
                src={getImageUrl(item.product?.images)}
                alt={item.product?.name}
              className="w-[90px] h-[110px] p-[5px] box-shadow"
            />
            </Link>
            <div className="flex-1 flex flex-col text-p">
              <h3 className="mb-[5px] break text-14">{item.product?.name}</h3>
              <p className="mb-[10px] text-14">
                SKU : <span className="sec-text-color">{item.variant?.sku || item.variant?.sku || "N/A"}</span>
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
                {item.variant?.oldPrice && (
                  <span className="sec-text-color text-14 line-through">
                    ₹{item.variant?.oldPrice}
                  </span>
                )}
                <span>₹{(item.variant?.price || 0)*(item.quantity || 1)}</span>
              </div>

              <div>
                 {item.variant?.stock_quantity > 0 ? (
                  <span className="text-[#3EE878] flex gap-[5px]">
                    ✔ In Stock
                  </span>
                ) : (
                  <span className="text-[#EB1724] flex gap-[5px]">
                    ✖ Out of Stock
                  </span>
                )}
              </div>

              <div className="flex justify-between items-center mt-2 gap-2 max-[360px]:flex-col max-[360px]:items-start">
                <div className="flex gap-2">
                  <Eye size={24} className="border p-1 rounded-md" />
                  <Trash2 size={24} className="border p-1 rounded-md"  onClick={() => handleRemove(item._id ,wishlistId)}/>
                </div>
                <Button variant="common"  onClick={() => handleAddToCart(item)}
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
