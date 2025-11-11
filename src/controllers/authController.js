const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { sendResponse } = require("../utils/response");

// =======================
// JWT GENERATOR
// =======================
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
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

    const user = await User.findOne({ email });
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
    } = req.body;

    // Check if email exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return sendResponse(res, false, null, "Email already exists");

    // SUPER ADMIN: only one allowed
    if (role === "admin") {
      const adminExists = await User.findOne({ role: "admin" });
      if (adminExists) return sendResponse(res, false, null, "Super admin already exists");
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
    });

    const token = generateToken(user);

    sendResponse(
      res,
      true,
      {
        token,
        user: { ...user.toObject(), password: undefined },
      },
      "User registered successfully"
    );
  } catch (err) {
    sendResponse(res, false, null, err.message);
  }
};

module.exports = { login, register };
