const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./src/config/db");
const cors = require("cors");
const { errorHandler } = require("./src/middlewares/errorMiddleware");
const authRoutes = require("./src/routes/authRoutes");
const settingRoutes = require("./src/routes/settingRoutes");
const userRoutes = require("./src/routes/userRoutes");
const sectionRoutes = require("./src/routes/sectionRoutes");
const navbarRoutes = require("./src/routes/sectionRoutes");

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/settings", settingRoutes);
app.use("/api/users", userRoutes);
app.use("/api/sections", sectionRoutes);
app.use("/api/navbars", navbarRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
