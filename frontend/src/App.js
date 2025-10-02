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

function App() {
    

  const RouterWrapper = () => {
    
    const location = useLocation();
    
    
    const isShopPage = location.pathname === "/shop";

    return (
      <Router>
       
        <Header hideOnMobileShopPage={isShopPage} />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/shop" element={<Shop />} /> 
          <Route path="/collections" element={<Collections />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/features" element={<Features />} />
          <Route path="/more" element={<More />} />
          <Route path="/Login" element={<LoginForm />} />
          <Route path="/Register" element={<RegistrationForm />} />
      </Routes>
      <Footer />
    </Router>
  );
}
}

export default App;