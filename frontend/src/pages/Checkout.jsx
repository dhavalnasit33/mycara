import React from "react";
import CheckoutForm from "../components/checkout/CheckoutForm";
import OrderSummary from "../components/checkout/OrderSummary";
import Section from "../components/ui/Section";
import Row from "../components/ui/Row";
import CartProgress from "../components/cart/CartProgress";


export default function Checkout() {
  return (
    <div>
        <CartProgress/>
        <Section >
            <Row>
                <h2 className="text-[28px] font-normal mb-[50px] hidden md:block leading">
                Home / <span className="font-light ">Checkout</span>
                </h2>
            </Row>
            <Row className="grid grid-cols-[1fr] custom-lg:grid-cols-[2fr_1fr] gap-[30px] items-start">
                <CheckoutForm />
                <OrderSummary />
            </Row>
        </Section>
    </div>
  );
}
