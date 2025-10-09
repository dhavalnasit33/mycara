const User = require("../models/User");
const { sendResponse } = require("../utils/response");
const bcrypt = require("bcryptjs");

// ---------------- GET ALL USERS ----------------
const getUsers = async (req, res) => {
  try {
    let { page = 1, limit = 10, search = "", isDownload = "false",is_active  } = req.query;
    const download = isDownload.toLowerCase() === "true";
   
    const baseQuery = {};

    // 🔍 Optional search
    if (search) {
      baseQuery.name = { $regex: search, $options: "i" };
    }

     if (is_active === "true") baseQuery.is_active = true;
    else if (is_active === "false") baseQuery.is_active = false;

    // ⬇ Download mode: return all users without pagination
    if (download) {
      const users = await User.find(baseQuery)
        .sort({ createdAt: -1 })
        .select("-password");

      return sendResponse(res, true, { users }, "All users downloaded successfully");
    }

    // 📄 Paginated mode
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

// ---------------- GET USER BY ID ----------------
const getUserById = async (req, res) => {
  try {
   
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return sendResponse(res, false, null, "User not found");

    return sendResponse(res, true, user, "User details retrieved successfully");
  } catch (err) {
    return sendResponse(res, false, null, "Failed to retrieve user: " + err.message);
  }
};

// ---------------- CREATE USER ----------------
const createUser = async (req, res) => {
  try {
  
    const {
      name,
      email,
      password,
      role = "store_user",
      mobile_number,
      address,
      gender,
      date_of_birth,
    } = req.body;

    const profile_picture = req.files?.profile_picture?.[0]?.filename || null;

    // 🚫 Prevent duplicates
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

// ---------------- UPDATE USER ----------------
const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const existingUser = await User.findById(userId);
    if (!existingUser) return sendResponse(res, false, null, "User not found");

    const {
      name,
      email,
      password,
      role,
      mobile_number,
      address,
      gender,
      date_of_birth,
    } = req.body;

    const profile_picture = req.files?.profile_picture?.[0]?.filename;

    const updateData = {
      name,
      email,
      mobile_number,
      address,
      gender,
      date_of_birth,
    };

    if (profile_picture) updateData.profile_picture = profile_picture;

    if (password) {
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(password, salt);
    }

  
    if (role && req.user.role === "admin") {
      updateData.role = role;
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true }).select("-password");

    return sendResponse(res, true, { user: updatedUser }, "User updated successfully");
  } catch (err) {
    return sendResponse(res, false, null, "Failed to update user: " + err.message);
  }
};

// ---------------- DELETE USER ----------------
const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return sendResponse(res, false, null, "User not found");

    // 🚫 Prevent deleting self
    if (req.user._id.toString() === user._id.toString()) {
      return sendResponse(res, false, null, "You cannot delete your own account");
    }

  
    await User.findByIdAndDelete(user._id);
    return sendResponse(res, true, null, "User deleted successfully");
  } catch (err) {
    return sendResponse(res, false, null, "Failed to delete user: " + err.message);
  }
};

const updateUserStatus = async (req, res) => {
  try {
    const userId = req.params.id;
    const { is_active } = req.body;

    const user = await User.findById(userId);
    if (!user) return sendResponse(res, false, null, "User not found");

    // Prevent self-deactivation
    if (req.user._id.toString() === userId) {
      return sendResponse(res, false, null, "You cannot change your own status");
    }

    user.is_active = Boolean(is_active);
    await user.save();

    return sendResponse(res, true, { user }, "User status updated successfully");
  } catch (err) {
    return sendResponse(res, false, null, "Failed to update user status: " + err.message);
  }
};
// ---------------- BULK DELETE USERS ----------------
const bulkDeleteUsers = async (req, res) => {
  try {
   
    const { ids } = req.body;
    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return sendResponse(res, false, null, "No user IDs provided for deletion");
    }

    await User.deleteMany({ _id: { $in: ids } });
    return sendResponse(res, true, { deletedCount: ids.length }, "Selected users deleted successfully");
  } catch (err) {
    return sendResponse(res, false, null, "Failed to delete users: " + err.message);
  }
};

// ---------------- OWN PROFILE ----------------
const getOwnProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    if (!user) return sendResponse(res, false, null, "User not found");

    return sendResponse(res, true, { user }, "Profile fetched successfully");
  } catch (err) {
    return sendResponse(res, false, null, "Failed to fetch profile: " + err.message);
  }
};

const updateOwnProfile = async (req, res) => {
  try {
    const {
      name,
      email,
      mobile_number,
      address,
      gender,
      date_of_birth,
      password,
    } = req.body;

    const profile_picture = req.files?.profile_picture?.[0]?.filename;

    const updateData = { name, email, mobile_number, address, gender, date_of_birth };
    if (profile_picture) updateData.profile_picture = profile_picture;

    if (password) {
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(password, salt);
    }

    const updatedUser = await User.findByIdAndUpdate(req.user._id, updateData, { new: true }).select("-password");
    return sendResponse(res, true, { user: updatedUser }, "Profile updated successfully");
  } catch (err) {
    return sendResponse(res, false, null, "Failed to update profile: " + err.message);
  }
};

const deleteOwnProfile = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.user._id);
    return sendResponse(res, true, null, "Account deleted successfully");
  } catch (err) {
    return sendResponse(res, false, null, "Failed to delete account: " + err.message);
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  bulkDeleteUsers,
  getOwnProfile,
  updateOwnProfile,
  deleteOwnProfile,
  updateUserStatus
};
