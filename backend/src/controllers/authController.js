// controllers/authController.js
const User = require("../models/User");
const Store = require("../models/Store");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { sendResponse } = require("../utils/response");

// JWT generator
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role, storeId: user.storeId },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );
};

// =======================
// LOGIN
// =======================
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).populate("storeId");
    if (!user) return sendResponse(res, false, null, "Invalid credentials");
    if (!user.is_active) return sendResponse(res, false, null, "Account inactive");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return sendResponse(res, false, null, "Invalid credentials");

    const token = generateToken(user);

    sendResponse(
      res,
      true,
      {
        token,
        user: { ...user.toObject(), password: undefined },
        store: user.storeId || null,
      },
      "Login successful"
    );
  } catch (err) {
    sendResponse(res, false, null, err.message);
  }
};

// =======================
// REGISTER
// =======================
const register = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      role = "store_user",
      mobile_number,
      profile_picture,
      gender,
      date_of_birth,
      address,
      // Store info (only for store_owner)
      storeName,
      storeEmail,
      storePhone,
      storeWebsite,
      storeLogo,
      storeBanner,
      storeDescription,
      storeTheme,
      storeAddress,
      // For store_user
      storeId: frontendStoreId,
    } = req.body;

    // Check if email exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return sendResponse(res, false, null, "Email already exists");

    let linkedStoreId = null;
    let createdStore = null;

    // SUPER ADMIN: only one allowed
    if (role === "super_admin") {
      const adminExists = await User.findOne({ role: "super_admin" });
      if (adminExists) return sendResponse(res, false, null, "Super admin already exists");
    }

    // STORE OWNER → create a new store
    if (role === "store_owner") {
      if (!storeName || !storeEmail)
        return sendResponse(res, false, null, "Store name and email required for store owner");

      const store = await Store.create({
        name: storeName,
        email: storeEmail,
        phone: storePhone,
        website: storeWebsite,
        logo: storeLogo,
        banner: storeBanner,
        description: storeDescription,
        theme: storeTheme,
        address: storeAddress,
        status: "active",
      });

      linkedStoreId = store._id;
      createdStore = store;
    }

    // STORE USER → frontend must send storeId
    if (role === "store_user") {
      if (!frontendStoreId)
        return sendResponse(res, false, null, "Store ID is required for store user");

      const storeExists = await Store.findById(frontendStoreId);
      if (!storeExists) return sendResponse(res, false, null, "Store not found");

      linkedStoreId = frontendStoreId;
    }

    // CREATE USER
    const user = await User.create({
      name,
      email,
      password,
      role,
      mobile_number,
      profile_picture,
      gender,
      date_of_birth,
      address,
      storeId: linkedStoreId,
    });

    const token = generateToken(user);

    sendResponse(
      res,
      true,
      {
        token,
        user: { ...user.toObject(), password: undefined },
        store: createdStore || (role === "store_user" ? await Store.findById(linkedStoreId) : null),
      },
      "User registered successfully"
    );
  } catch (err) {
    sendResponse(res, false, null, err.message);
  }
};

module.exports = { login, register };
