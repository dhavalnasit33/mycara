const User = require("../models/User");
const { sendResponse } = require("../utils/response");
const bcrypt = require("bcryptjs");

// Get all users with pagination, search, or full download
const getUsers = async (req, res) => {
  try {
    let { page = 1, limit = 10, search = "", isDownload = "false" } = req.query;
    const download = isDownload.toLowerCase() === "true";

    const baseQuery = { role: "user" };
    if (search) {
      baseQuery.name = { $regex: search, $options: "i" };
    }

    if (download) {
      const users = await User.find(baseQuery)
        .sort({ createdAt: -1 })
        .select("-password");
      return sendResponse(res, true, { users }, "All users downloaded successfully");
    }

    page = parseInt(page);
    limit = parseInt(limit);

    const total = await User.countDocuments(baseQuery);
    const users = await User.find(baseQuery)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 })
      .select("-password");

    return sendResponse(
      res,
      true,
      { users, total, page, pages: Math.ceil(total / limit) },
      "Users retrieved successfully"
    );
  } catch (err) {
    return sendResponse(res, false, null, "Failed to retrieve users: " + err.message);
  }
};

// Get user by ID
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return sendResponse(res, false, null, "User not found");
    return sendResponse(res, true, user , "User details retrieved successfully");
  } catch (err) {
    return sendResponse(res, false, null, "Failed to retrieve user: " + err.message);
  }
};

// ✅ NEW: Get logged-in user's own profile
const getOwnProfile = async (req, res) => {
  try {
    const userId = req.user._id; 
  
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return sendResponse(res, false, null, "User not found");
    }

    return sendResponse(res, true, user, "Profile details retrieved successfully");
  } catch (err) {
    return sendResponse(res, false, null, "Failed to retrieve profile: " + err.message);
  }
};
// Create new user
const createUser = async (req, res) => {
  try {
    const { name, email, password, role = "user", mobile_number, address, gender, date_of_birth, profile_picture } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return sendResponse(res, false, null, "A user with this email already exists");
    }
const passwordToUse = password || "Temp1234!"; 
    const newUser = await User.create({
      name,
      email,
    password: passwordToUse,
      role,
      mobile_number,
      address,
      gender,
      date_of_birth,
      profile_picture,
    });

    return sendResponse(
      res,
      true,
      { user: { ...newUser.toObject(), password: undefined } },
      "User created successfully"
    );
  } catch (err) {
    return sendResponse(res, false, null, "Failed to create user: " + err.message);
  }
};

// Update user by ID
const updateUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const updateData = { name, email, role };

    if (password) {
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(password, salt);
    }

    const updatedUser = await User.findByIdAndUpdate(req.params.id, updateData, { new: true }).select("-password");
    if (!updatedUser) return sendResponse(res, false, null, "User not found");

    return sendResponse(res, true, { user: updatedUser }, "User updated successfully");
  } catch (err) {
    return sendResponse(res, false, null, "Failed to update user: " + err.message);
  }
};

// Update own profile (for logged-in users)
const updateOwnProfile = async (req, res) => {
  try {
    const userId = req.user._id; 
    const {
      name,
      email,
      mobile_number,
      address,
      gender,
      date_of_birth,
      profile_picture,
      password,
    } = req.body;

    const updateData = {
      name,
      email,
      mobile_number,
      address,
      gender,
      date_of_birth,
      profile_picture,
    };

    // If user wants to change password
    if (password) {
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(password, salt);
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
    }).select("-password");

    if (!updatedUser) {
      return sendResponse(res, false, null, "User not found");
    }

    return sendResponse(
      res,
      true,
      { user: updatedUser },
      "Profile updated successfully"
    );
  } catch (err) {
    return sendResponse(
      res,
      false,
      null,
      "Failed to update profile: " + err.message
    );
  }
};


// Delete user by ID
const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) return sendResponse(res, false, null, "User not found");

    return sendResponse(res, true, null, "User deleted successfully");
  } catch (err) {
    return sendResponse(res, false, null, "Failed to delete user: " + err.message);
  }
};

// Bulk delete users by IDs
const bulkDeleteUsers = async (req, res) => {
  try {
    const { ids } = req.body;
    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return sendResponse(res, false, null, "No user IDs provided for deletion");
    }

    const result = await User.deleteMany({ _id: { $in: ids } });
    return sendResponse(res, true, { deletedCount: result.deletedCount }, "Selected users deleted successfully");
  } catch (err) {
    return sendResponse(res, false, null, "Failed to delete users: " + err.message);
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  bulkDeleteUsers,
  updateOwnProfile,
  getOwnProfile
};
