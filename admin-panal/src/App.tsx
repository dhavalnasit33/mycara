import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AdminLayout } from "./components/layout/AdminLayout";
import VelzonDashboard from "./pages/VelzonDashboard";
import Products from "./pages/Products/Products";
import AddProduct from "./pages/Products/AddProduct";
import Users from "./pages/Users/Users";
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
import Coupons from "./pages/Coupons/Coupons";
import CouponFormPage from "./pages/Coupons/CouponForm";
import Orders from "./pages/Orders/Orders";
import Payments from "./pages/Payments/Payments";
import UserFormPage from "./pages/Users/UserForm";
import CustomerReviews from "./pages/CustomerReviews/CustomerReviews";
import Cart from "./pages/carts/carts";
import Wishlist from "./pages/Wishlists/Wishlist";
import ContactUs from "./pages/ContactUs/ContactUs";

import Navbar from "./pages/Navbar/Navbar";
import NavbarFormPage from "./pages/Navbar/NavbarForm";
import Footer from "./pages/Footer/Footer";
import FooterFormPage from "./pages/Footer/FooterForm";
import Settings from "./pages/Settings/Settings";
import Register from "./pages/Register";
import Stores from "./pages/Stores/Store";
import StoreFormPage from "./pages/Stores/StoreForm";
import StoreOwnerFormPage from "./pages/StoreOwner/StoreOwnerForm";
import Pages from "./pages/Pages/Pages";
import PageFormPage from "./pages/Pages/PagesForm";


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
            {/* <Route path="/register" element={<Register />} /> */}

          <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
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
              <Route path="payments" element={<Payments />} />
                <Route path="users" element={<Users />} />
                 <Route path="users/add" element={<UserFormPage />} />
                  <Route path="/users/:id/edit" element={<UserFormPage />} />
                  <Route path="customer-reviews" element={<CustomerReviews />} />
                    <Route path="wishlists" element={<Wishlist />} />
             <Route path="carts" element={<Cart />} />
              <Route path="contact-messages" element={<ContactUs />} />
              <Route path="pages" element={<Pages />} />
                 <Route path="pages/add" element={<PageFormPage />} />
                  <Route path="/pages/:id/edit" element={<PageFormPage />} />
                  <Route path="navbar" element={<Navbar />} />
                 <Route path="navbar/add" element={<NavbarFormPage />} />
                  <Route path="/navbar/:id/edit" element={<NavbarFormPage />} />
                   <Route path="footer" element={<Footer />} />
                 <Route path="footer/add" element={<FooterFormPage />} />
                  <Route path="/footer/:id/edit" element={<FooterFormPage />} />
              <Route path="settings" element={<Settings />} />
                <Route path="stores" element={<Stores />} />
                 <Route path="stores/add" element={<StoreFormPage />} />
                  <Route path="/stores/:id/edit" element={<StoreFormPage />} />
                   <Route path="/store-owners/add" element={<StoreOwnerFormPage />} />
                  <Route path="/store-owners/:id/edit" element={<StoreOwnerFormPage />} />
            
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
