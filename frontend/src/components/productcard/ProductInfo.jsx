//D:\mycara\frontend\src\components\productcard\ProductInfo.jsx
import React, { useEffect, useState } from "react";
import { Handbag, Star } from "lucide-react";
import Button from "../ui/Button";
import { useNavigate, useParams } from "react-router-dom";
import HeartIcon from "../icons/HeartIcon"
import { useDispatch, useSelector } from "react-redux";
import { addToCart, createCart, fetchCart} from "../../features/cart/cartThunk";
import LoginForm from "../../pages/Login";
import { useAddToWishlist } from "../wishlist/handleAddTowishlist";


export default function ProductInfo({product, setSelectedVariant }) {

  const { id } = useParams(); 
  const dispatch = useDispatch();

 const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
    const [showLoginPopup, setShowLoginPopup] = useState(false);

      // ================= VARIANT STATES =================
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [activeVariant, setActiveVariant] = useState(null);
  const cart = useSelector((state) => state.cart.cart);
  const user = JSON.parse(localStorage.getItem("user"));


  // -------------------- DEFAULT FIRST VARIANT --------------------
  useEffect(() => {
    if (product?.variants?.length > 0) {
      const first = product.variants[0];

      setSelectedSize(first.size_id?._id);
      setSelectedColor(first.color_id?._id);
      setActiveVariant(first);
      setSelectedVariant(first);
    }
  }, [product]);

  // -------------------- MATCH VARIANT BASED ON SIZE + COLOR --------------------
  useEffect(() => {
    if (!selectedSize) return;

    let match = product?.variants?.find(
      (v) =>
        v.size_id?._id === selectedSize &&
        (!selectedColor || v.color_id?._id === selectedColor)
    );

    if (!match) {
      match = product?.variants?.find(
        (v) => v.size_id?._id === selectedSize
      );
    }

    setActiveVariant(match || null);
    setSelectedVariant(match || null);
  }, [selectedSize, selectedColor, product]);

  // ================= PRICE + DISCOUNT =================
  const originalPrice = activeVariant?.price || 0;
  const discountType = product?.discount_id?.type;
  const discountValue = product?.discount_id?.value || 0;

  let discountedPrice = originalPrice;

  if (discountType === "percentage") {
    discountedPrice = Math.round(
      originalPrice - (originalPrice * discountValue) / 100
    );
  } else if (discountType === "flat") {
    discountedPrice = Math.max(0, originalPrice - discountValue);
  }



// const handleAddToCart = async () => {
//   if (!token) {
//     setShowLoginPopup(true);
//     return;
//   }

//   // Always ensure cart exists
//   const cart = await dispatch(fetchCart()).unwrap();
//   const cart_id = cart._id;

//   const payload = {
//     cart_id,
//     product_id: product._id,
//     // variant_id: product.variants?.[0]?._id,
//      variant_id: activeVariant._id, // 🔥 IMPORTANT
//     quantity: 1,
//   };

//   await dispatch(addToCart(payload)).unwrap();

//   await dispatch(fetchCart());
//   navigate("/cart");
// };

 const handleAddToCart = async () => {
  if (!token) {
    setShowLoginPopup(true);
    return;
  }
  if (!activeVariant?._id) {
    alert("Select a variant first!");
    return;
  }

  let cartId = cart?._id || localStorage.getItem("cart_id");
  if (!cartId) {
    const newCart = await dispatch(createCart({ user_id: user._id })).unwrap();
    cartId = newCart._id;
  }

  await dispatch(
    addToCart({
      cart_id: cartId,
      product_id: product._id,
      variant_id: activeVariant._id,
      quantity: 1,
    })
  ).unwrap();

  await dispatch(fetchCart(cartId));
  navigate("/cart");
};

//add to wishlist
  const { handleAddToWishlist } = useAddToWishlist();

  return (
    <>
      <p className="text-theme text-p pb-[25px] pt-[20px] md:pt-0">Leatest Style <span className="text-[#BCBCBC]"> | </span> Express Shipping</p>
      <h1 className="text-[24px] uppercase"> {activeVariant?.brand_id?.name || "No Brand"}  </h1>
      <p className="text-p text-light pb-[12px] lowercase capitalize">{product.name}</p>

      {/* Rating */}
      <div className="flex items-center gap-[15px] text-14 sec-text-color mb-[25px]">
        <span className="flex items-center gap-[5px] border border-[#CECDCD] text-black px-2 py-[3px] rounded-[2px] font-18 font-medium">4.2 <Star size={14}/></span>
        <span >Based on 30 Ratings</span>
      </div>

      {/* Price */}
      <div className="pb-[33px] border-dashed border-b light-border">
        <div className="flex items-center">
          <p className="text-[26px] text-black">
            ₹{discountedPrice.toLocaleString("en-IN")}
          </p>

          {discountValue > 0 && (
            <p className="text-theme font-18 ml-[7px]">
              {discountType === "percentage"
                ? `${discountValue}% Off`
                : `₹${discountValue} Off`}
            </p>
          )}
        </div>

        {discountValue > 0 && (
          <p className="sec-text-color">
            MRP <span className="line-through">
              ₹{originalPrice.toLocaleString("en-IN")}
            </span> Inclusive of all taxes
          </p>
        )}
      </div>


      {/* Sizes */}
      <div className="pt-[34px] space-y-[28px]">
        <div className="flex items-center justify-between">
            <span className="text-[24px]">Select Size </span>
            <span className="text-theme font-medium font-18">Size Guide</span>
        </div>

        <div className="flex flex-wrap gap-[13px]">
          {product?.variants?.map((v) => {
            const outOfStock = v.stock_quantity === 0;

            return (
              <div key={v._id} className="flex flex-col items-center">
                <button
                  disabled={outOfStock}
                  onClick={() => !outOfStock && setSelectedSize(v.size_id._id)}
                  className={`text-black w-[65px] py-[6px] rounded-[20px] text-[16px] transition-all
                    ${
                      selectedSize === v.size_id._id
                        ? "border border-black"
                        : "border light-border"
                    }
                    ${outOfStock ? "cursor-not-allowed opacity-50" : ""}
                  `}
                >
                  {v.size_id.name}
                </button>

                {outOfStock && (
                  <span className="text-[12px] sec-text-color mt-[3px]">Sold Out</span>
                )}
              </div>
            );
          })}
        </div>


        <div className="flex flex-col  sm:flex-row  gap-[17px] pt-[10px] ">
            <Button variant="outline" className="flex items-center gap-[10px] !text-[22px] !py-[10px] "  onClick={() => handleAddToWishlist(product, activeVariant)}>
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
