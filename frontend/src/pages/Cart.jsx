//D:\mycara\frontend\src\pages\Cart.jsx
import React, { useEffect, useState } from "react";
import CartProgress from "../components/cart/CartProgress";
import CartSummary from "../components/cart/CartSummary";
import Row from "../components/ui/Row";
import Section from "../components/ui/Section";
import Button from "../components/ui/Button";
import CartItem from "../components/cart/CartItem";
import CouponCard from "../components/cart/CouponCard";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCoupons } from "../features/coupons/couponsThunk";

export default function Cart() {
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const dispatch = useDispatch();
  const { coupons = [] } = useSelector(state => state.coupons);
  const [cartCouponCode, setCartCouponCode] = useState("");


  useEffect(() => {
    dispatch(fetchCoupons({ status: "active" })); 
  }, [dispatch]);

  const handleApplyCartCoupon = () => {
    const coupon = coupons.find(c => c.code === cartCouponCode);
    if (!coupon) return alert("Invalid coupon code!");
    setAppliedCoupon(coupon);
    alert(`Coupon ${coupon.code} applied!`);
  };

  return (
    <>
      <CartProgress currentStep={1} />
      <Section>
        <Row>
          <h2 className="text-[28px]  mb-[50px] hidden md:block leading">
            <Link to="/home">Home </Link>/ <span className="font-light">Cart</span>
          </h2>
        </Row>
        <Row className="grid grid-cols-1 custom-lg:grid-cols-[3fr_1fr] gap-[30px] items-start">
          <div className="flex-1">
            <CartItem/>
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-[12px] mt-[20px] md:mt-[30px]">
                <div className="flex flex-col md:flex-row gap-[12px] md:gap-[16px] items-center">
                    <input value={cartCouponCode}
                    onChange={e => setCartCouponCode(e.target.value)}
                    placeholder="COUPON CODE"
                    className="light-color text-center placeholder-[#D2AF9F] border border-[#D2AF9F] rounded-[3px] px-[10px] py-[7px]  md:py-[14px] text-18 w-[200px] md:w-[181px] "
                    />
                    <Button onClick={handleApplyCartCoupon}
                    variant="common"
                    className="uppercase text-18 md:min-w-[181px]"
                    >
                    APPLY COUPON
                    </Button>
                </div>
                <Button
                    variant="secondary"
                    className="uppercase !text-18 md:min-w-[181px] self-center md:self-auto"
                >
                    UPDATE CART
                </Button>
              </div>
                <CouponCard appliedCoupon={appliedCoupon} setAppliedCoupon={setAppliedCoupon}  />
          </div>
          <CartSummary  appliedCoupon={appliedCoupon} />
        </Row>     
      </Section>
      {/* <Row>
        
      </Row> */}
    </>
  );
}
