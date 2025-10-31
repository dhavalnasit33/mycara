import React, { useEffect } from "react";
import { Handbag, Star } from "lucide-react";
import Button from "../ui/Button";
import { Link, useParams } from "react-router-dom";
import HeartIcon from "../icons/HeartIcon"
import { useDispatch, useSelector } from "react-redux";
import { fetchProductById } from "../../features/products/productsThunk";
import { fetchSizes } from "../../features/sizes/sizesThunk";
import { fetchDiscounts } from "../../features/discounts/discountsThunk";


export default function ProductInfo() {

  const { id } = useParams(); 
  const dispatch = useDispatch();

  const { product, loading, error } = useSelector((state) => state.products);
  const { discounts } = useSelector((state) => state.discounts);
    const { sizes } = useSelector((state) => state.sizes);

  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(id)); 
         dispatch(fetchSizes(id));
         dispatch(fetchDiscounts());
    }
  }, [id, dispatch]);

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


  if (loading) {
    return <p className="text-center text-gray-500 py-10">Loading product...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 py-10">{error}</p>;
  }

  if (!product) {
    return <p className="text-center text-gray-500 py-10">No product found.</p>;
  }

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
            <Button variant="outline" className="flex items-center gap-[10px] !text-[22px] !py-[10px] ">
                <HeartIcon className="h-[22px] w-[22px]" />Wishlist
            </Button>
            <Button variant="common" className="w-full !text-[22px] flex items-center gap-[10px] !py-[10px]">
                <Link to='/cart' className="flex items-center gap-[10px]">
                    <Handbag size={22} />Add To Bag
                </Link>
            </Button>
        </div>
      </div>

      {/* Wishlist + Add to Bag */}
     
    </>
  );
}
