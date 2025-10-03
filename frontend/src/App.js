
// D:\mycara\frontend\src\App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import './App.css';
import './index.css';
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Collections from "./pages/Collections";
import Blogs from "./pages/Blogs";
import Features from "./pages/Features";
import More from "./pages/More";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LoginForm from "./pages/Login";
import RegistrationForm from "./pages/RegistrationForm";
import Offer from "./pages/Offer";
import ContactUs from "./pages/ContactUs";
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
          <Route path="/collections" element={<Collections />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/features" element={<Features />} />
          <Route path="/more" element={<More />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/offer" element={<Offer/>}/>
          <Route path="/contact-us" element={<ContactUs/>}/>
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