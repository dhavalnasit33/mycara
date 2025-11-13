import React, { useEffect, useState } from "react";
import { Handbag, Star } from "lucide-react";
import Button from "../ui/Button";
import { useNavigate, useParams } from "react-router-dom";
import HeartIcon from "../icons/HeartIcon"
import { useDispatch, useSelector } from "react-redux";
import { fetchDiscounts } from "../../features/discounts/discountsThunk";
import { addToCart, fetchCart} from "../../features/cart/cartThunk";
import LoginForm from "../../pages/Login";
import { useAddToWishlist } from "../wishlist/handleAddTowishlist";


export default function ProductInfo({product}) {

  const { id } = useParams(); 
  const dispatch = useDispatch();

  const { discounts } = useSelector((state) => state.discounts);

 const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
    const [showLoginPopup, setShowLoginPopup] = useState(false);

 useEffect(() => {
    if (id) {
      dispatch(fetchDiscounts());
    }
    if (token) {
      dispatch(fetchCart());
    }
  }, [id, token, dispatch]);

  const handleAddToCart = async () => {
    if (!token) {
      setShowLoginPopup(true);
      return;
    }
    let cart_id = localStorage.getItem("cart_id");
    const product_id = product._id;
    const variant_id = product.variants?.[0]?._id;
    const quantity = 1;

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
      dispatch(fetchCart());
      navigate("/cart");
  };



//discount percentage
  const discount = product
    ? discounts.find((d) => d._id === product?.discount_id)
    : null;
    const originalPrice = product?.variants?.[0]?.price || 0;
    let finalPrice = originalPrice;

    if (discount) {
      if (discount.type === "percentage") {
        finalPrice = originalPrice - (originalPrice * discount.value) / 100;
      } else {
        finalPrice = originalPrice - discount.value;
      }
  }

//add to wishlist
  const { handleAddToWishlist } = useAddToWishlist();

  return (
    <>
      <p className="text-theme text-p pb-[25px] pt-[20px] md:pt-0">Leatest Style <span className="text-[#BCBCBC]"> | </span> Express Shipping</p>
      <h1 className="text-[24px] uppercase"> {product.variants?.[0]?.brand_id?.name || "No Brand"}  </h1>
      <p className="text-p text-light pb-[12px]">{product.name}</p>

      {/* Rating */}
      <div className="flex items-center gap-[15px] text-14 sec-text-color mb-[25px]">
        <span className="flex items-center gap-[5px] border border-[#CECDCD] text-black px-2 py-[3px] rounded-[2px] font-18 font-medium">4.2 <Star size={14}/></span>
        <span >Based on 30 Ratings</span>
      </div>

      {/* Price */}
      <div className="pb-[33px] border-dashed border-b light-border">
        <div className="flex items-center ">
            <p className="text-[26px] text-black">₹{Number(finalPrice).toLocaleString("en-IN", { maximumFractionDigits: 0 })}</p>
             {discount && (
            <p className="text-theme font-18 ml-[7px]">
              {discount.type === "percentage"
                ? `${discount.value}% Off`
                : `₹${discount.value} Off`}
            </p>
          )}
        </div>
        <p className="sec-text-color">MRP <span className="line-through"> ₹{Number(originalPrice).toLocaleString("en-IN", { maximumFractionDigits: 0 })}</span> Inclusive of all taxes</p>
      </div>


      {/* Sizes */}
      <div className="pt-[34px] space-y-[28px]">
        <div className="flex items-center justify-between">
            <span className="text-[24px]">Select Size </span>
            <span className="text-theme font-medium font-18">Size Guide</span>
        </div>

        <div className="flex flex-wrap gap-[13px]">
          {product.variants && product.variants.length > 0 ? (
            product.variants.map((variant) => (
              <div key={variant.size_id._id} className="relative">
                <button
                  disabled={variant.stock_quantity === 0}
                  className={`border light-border w-[50px] md:w-[71px] md:px-4 py-[3px] rounded-[20px] text-[14px] md:text-[18px] font-light hover:border-pink-500 ${
                    variant.stock_quantity === 0 ? "cursor-not-allowed" : ""
                  }`}
                >
                  {variant.size_id.name}
                </button>
                {variant.stock_quantity === 0 && (
                  <span className="absolute -bottom-5 left-2 text-[10px] md:text-[12px] sec-text-color">
                    Sold Out
                  </span>
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-500">No sizes available</p>
          )}
        </div>


        <div className="flex flex-col  sm:flex-row  gap-[17px] pt-[10px] ">
            <Button variant="outline" className="flex items-center gap-[10px] !text-[22px] !py-[10px] "  onClick={() => handleAddToWishlist(product)}>
                <HeartIcon className="h-[22px] w-[22px]" />Wishlist
            </Button>
            <Button variant="common" className="w-full !text-[22px] flex items-center gap-[10px] !py-[10px]"  onClick={handleAddToCart} >
            <span className="flex items-center gap-[10px]">
              <Handbag size={22} /> Add To Bag
            </span>
          </Button>
        </div>
      </div>

            {/* ===== Login Popup ===== */}
        {showLoginPopup && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center px-4">
          <div className="relative bg-white w-full max-w-[1062px] rounded-md overflow-hidden">
            <LoginForm
              onClose={() => setShowLoginPopup(false)}
              onSwitch={() => {
                setShowLoginPopup(false);
              }}
            />
          </div>
        </div>
      )}

      {/* Wishlist + Add to Bag */}
     
    </>
  );
}

