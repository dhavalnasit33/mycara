import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import './App.css';
import './index.css';
import Home from "./pages/Home";
import Shop from "./pages/Shop";
<<<<<<< HEAD
import Collections from "./pages/Collections";
import Blogs from "./pages/Blogs";
import Features from "./pages/Features";
import More from "./pages/More";





import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

=======
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
>>>>>>> bb961bde4301c04c294824f51451179071434630
import LoginForm from "./pages/Login";
import RegistrationForm from "./pages/RegistrationForm";
import Offer from "./pages/Offer";
import ContactUs from "./pages/ContactUs";
import MyAccount from "./pages/Account";
import Orders from "./components/userAccount/Orders";
import Dashboard from "./components/userAccount/Dashbord";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Product from "./pages/ProductPage";
import Wishlist from "./pages/Wishlist";
function App() {
  const RouterWrapper = () => {
    const location = useLocation();
    const isShopPage = location.pathname === "/shop";
    return (
      <>
        <Header hideOnMobileShopPage={isShopPage} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/offer" element={<Offer/>}/>
          <Route path="/contact-us" element={<ContactUs/>}/>
          <Route path="/my-account" element={<MyAccount />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="orders" element={<Orders />} />
            <Route path="address" element={<p>Address content goes here.</p>} />
            <Route path="account-details" element={<p>Account details content goes here.</p>} />
            <Route path="logout" />
          </Route>
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/checkout" element={<Checkout />}></Route>
          <Route path="/products" element={<Product />}></Route>
          <Route path="/wishlist" element={<Wishlist />}></Route>
        </Routes>
        <Footer />
      </>
    );
  };
  return (
    <Router>
      <RouterWrapper />
    </Router>
  );
}
export default App;