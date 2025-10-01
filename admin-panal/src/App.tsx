import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AdminLayout } from "./components/layout/AdminLayout";
import VelzonDashboard from "./pages/VelzonDashboard";
import Products from "./pages/Products/Products";
import AddProduct from "./pages/Products/AddProduct";
import Users from "./pages/Users";
import ContactMessages from "./pages/ContactMessages";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Categories from "./pages/Categories/Categories";
import CategoryFormPage from "./pages/Categories/CategoryForm";
import BrandFormPage from "./pages/Brands/BrandFormPage";
import Brands from "./pages/Brands/Brands";
import TypeFormPage from "./pages/Types/TypeForm";
import Types from "./pages/Types/Types";

import FabricFormPage from "./pages/Fabrics/FabricForm";
import Fabrics from "./pages/Fabrics/Fabrics";
import ProductLabels from "./pages/ProductLabels/ProductLabels";
import ProductLabelFormPage from "./pages/ProductLabels/ProductLabelForm";
import Colors from "./pages/Colors/Colors";
import ColorFormPage from "./pages/Colors/ColorForm";
import Sizes from "./pages/Sizes/Sizes";
import SizeFormPage from "./pages/Sizes/SizeForm";
import Discounts from "./pages/Discount/Discounts";
import DiscountFormPage from "./pages/Discount/DiscountForm";
import Coupons from "./pages/coupons/Coupons";
import CouponFormPage from "./pages/coupons/CouponForm";
import Orders from "./pages/Orders/Orders";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<AdminLayout />}>
              <Route index element={<VelzonDashboard />} />
              <Route path="products" element={<Products />} />
              <Route path="products/add" element={<AddProduct />} />
               <Route path="/products/:id/edit" element={<AddProduct />} />
              <Route path="categories" element={<Categories />} />
                 <Route path="categories/add" element={<CategoryFormPage />} />
                  <Route path="/categories/:id/edit" element={<CategoryFormPage />} />
                  <Route path="brands" element={<Brands />} />
                 <Route path="brands/add" element={<BrandFormPage />} />
                  <Route path="/brands/:id/edit" element={<BrandFormPage />} />
                   <Route path="types" element={<Types />} />
                 <Route path="types/add" element={<TypeFormPage />} />
                  <Route path="/types/:id/edit" element={<TypeFormPage />} />
                     <Route path="fabrics" element={<Fabrics />} />
                 <Route path="fabrics/add" element={<FabricFormPage />} />
                  <Route path="/fabrics/:id/edit" element={<FabricFormPage />} />
                     <Route path="product-labels" element={<ProductLabels />} />
                 <Route path="product-labels/add" element={<ProductLabelFormPage />} />
                  <Route path="/product-labels/:id/edit" element={<ProductLabelFormPage />} />
                    <Route path="colors" element={<Colors />} />
                 <Route path="colors/add" element={<ColorFormPage />} />
                  <Route path="/colors/:id/edit" element={<ColorFormPage />} />
                    <Route path="sizes" element={<Sizes />} />
                 <Route path="sizes/add" element={<SizeFormPage />} />
                  <Route path="/sizes/:id/edit" element={<SizeFormPage />} />
               <Route path="discounts" element={<Discounts/>} />
                 <Route path="discounts/add" element={<DiscountFormPage/>} />
                  <Route path="/discounts/:id/edit" element={<DiscountFormPage/>} />
                  <Route path="coupons" element={<Coupons/>} />
                 <Route path="coupons/add" element={<CouponFormPage/>} />
                  <Route path="/coupons/:id/edit" element={<CouponFormPage/>} />
              <Route path="orders" element={<Orders />} />
              <Route path="payments" element={<VelzonDashboard />} />
              <Route path="users" element={<Users />} />
              <Route path="reviews" element={<VelzonDashboard />} />
              <Route path="settings" element={<Settings />} />
              <Route path="contact-messages" element={<ContactMessages />} />
            </Route>
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
