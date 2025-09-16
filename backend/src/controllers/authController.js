const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { sendResponse } = require("../utils/response");

// Login user
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return sendResponse(res, false, null, "Invalid credentials");

    if (!user.is_active)
      return sendResponse(res, false, null, "Account inactive. Contact admin.");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return sendResponse(res, false, null, "Invalid credentials");

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    sendResponse(res, true, {
      token,
      user: { ...user.toObject(), password: undefined },
    }, "Login successful");

  } catch (err) {
    sendResponse(res, false, null, err.message);
  }
};

// User Self Registration (only as 'user')
const registerUser = async (req, res) => {
  try {
    const { name, email, password, mobile_number, address, gender, date_of_birth, profile_picture } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return sendResponse(res, false, null, "Email already exists");

    const user = await User.create({
      name,
      email,
      password,
      role: "user",
      mobile_number,
      address,
      gender,
      date_of_birth,
      profile_picture,
    });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    sendResponse(res, true, {
      token,
      user: { ...user.toObject(), password: undefined },
    }, "User registered successfully");

  } catch (err) {
    sendResponse(res, false, null, err.message);
  }
};

// Admin Registration (only one admin allowed)
const registerAdmin = async (req, res) => {
  try {
    const existingAdmin = await User.findOne({ role: "admin" });
    if (existingAdmin)
      return sendResponse(res, false, null, "Admin already exists");

    const { name, email, password, mobile_number, address, gender, date_of_birth, profile_picture } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return sendResponse(res, false, null, "Email already exists");

    const admin = await User.create({
      name,
      email,
      password,
      role: "admin",
      mobile_number,
      address,
      gender,
      date_of_birth,
      profile_picture,
    });

    const token = jwt.sign(
      { id: admin._id, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    sendResponse(res, true, {
      token,
      user: { ...admin.toObject(), password: undefined },
    }, "Admin registered successfully");

  } catch (err) {
    sendResponse(res, false, null, err.message);
  }
};

module.exports = { login,registerUser,registerAdmin };
