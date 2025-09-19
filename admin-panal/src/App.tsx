import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AdminLayout } from "./components/layout/AdminLayout";
import VelzonDashboard from "./pages/VelzonDashboard";
import Products from "./pages/Products";
import AddProduct from "./pages/AddProduct";
import Users from "./pages/Users";
import ContactMessages from "./pages/ContactMessages";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Categories from "./pages/Categories";
import AddCategoryPage from "./pages/AddCategory";

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
              <Route path="categories" element={<Categories />} />
                 <Route path="categories/add" element={<AddCategoryPage />} />
              <Route path="brands" element={<VelzonDashboard />} />
              <Route path="types" element={<VelzonDashboard />} />
              <Route path="fabrics" element={<VelzonDashboard />} />
              <Route path="product-labels" element={<VelzonDashboard />} />
              <Route path="discounts" element={<VelzonDashboard />} />
              <Route path="coupons" element={<VelzonDashboard />} />
              <Route path="orders" element={<VelzonDashboard />} />
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
