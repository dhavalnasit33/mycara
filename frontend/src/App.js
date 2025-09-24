
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import './index.css';
import Home from "./pages/Home"; // ✅
import Shop from "./pages/Shop";

import Collections from "./pages/Collections";
import Blogs from "./pages/Blogs";
import Features from "./pages/Features";
import More from "./pages/More";



import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
       <Route path="/home" element={<Home />} />
        <Route path="/shop" element={<Shop />} /> 
        
          <Route path="/collections" element={<Collections />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/features" element={<Features />} />
          <Route path="/more" element={<More />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;