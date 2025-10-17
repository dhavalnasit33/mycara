const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./src/config/db");
const cors = require("cors");
const { errorHandler } = require("./src/middlewares/errorMiddleware");
const authRoutes = require("./src/routes/authRoutes");
const settingRoutes = require("./src/routes/settingRoutes");
const userRoutes = require("./src/routes/userRoutes");
const pageRoutes = require("./src/routes/pageRoutes");
const navbarRoutes = require("./src/routes/navbarRoutes");
const footerRoutes = require("./src/routes/footerRoutes");
const brandRoutes = require("./src/routes/brandRoutes");
const typeRoutes = require("./src/routes/typeRoutes");
const fabricRoutes = require("./src/routes/fabricRoutes");
const discountRoutes = require("./src/routes/discountRoutes");
const categoryRoutes = require("./src/routes/categoryRoutes");
const productLabelRoutes = require("./src/routes/productLabelRoutes");
const productRoutes = require("./src/routes/productRoutes");
const productVariantRoutes = require("./src/routes/productVariantRoutes");
const couponRoutes = require("./src/routes/couponRoutes");
const orderRoutes = require("./src/routes/orderRoutes");
const paymentRoutes = require("./src/routes/paymentRoutes");
const cartRoutes = require("./src/routes/cartRoutes");
const wishlistRoutes = require("./src/routes/wishlistRoutes");
const contactUsRoutes = require("./src/routes/contactUsRoutes");
const customerReviewRoutes = require("./src/routes/customerReviewRoutes");
const colorRoutes = require("./src/routes/colorRoutes");
const sizeRoutes = require("./src/routes/sizeRoutes");
const uploadsRoutes = require("./src/routes/upload");
const storeRoutes = require("./src/routes/storeRoutes");
const dashboardRoutes = require("./src/routes/dashboardRoutes");
const heroBannerRoutes = require('./src/routes/heroBannerRoutes');
const mongoose = require("mongoose");
dotenv.config();
connectDB();


const app = express();

const allowedOrigins = ['http://localhost:8080', 'http://localhost:3000'];

app.use(cors({
  origin: function(origin, callback) {
    // allow requests with no origin (like Postman)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true 
}));
app.use(express.json());

app.use("/uploads", express.static("uploads"));


app.use("/api/auth", authRoutes);
app.use("/api/settings", settingRoutes);
app.use("/api/users", userRoutes);
app.use("/api/stores", storeRoutes);
app.use("/api/pages", pageRoutes);
app.use("/api/navbar", navbarRoutes);
app.use("/api/footer", footerRoutes);
app.use("/api/brands", brandRoutes);
app.use("/api/types", typeRoutes);
app.use("/api/fabrics", fabricRoutes);
app.use("/api/discounts", discountRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/product-labels", productLabelRoutes);
app.use("/api/products", productRoutes);
app.use("/api/products/:product_id/variants", productVariantRoutes);
app.use("/api/coupons", couponRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/carts", cartRoutes);
app.use("/api/wishlists", wishlistRoutes);
app.use("/api/contact-us", contactUsRoutes);
app.use("/api/customer-reviews", customerReviewRoutes);
app.use("/api/colors", colorRoutes);
app.use("/api/sizes", sizeRoutes);
app.use("/api/uploads", uploadsRoutes);
app.use("/api/dashboard", dashboardRoutes);

app.use("/api/hero-banners", heroBannerRoutes);

app.use(errorHandler);

// MongoDB connection
mongoose.connect("mongodb://localhost:27017/mycra")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));
  
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
