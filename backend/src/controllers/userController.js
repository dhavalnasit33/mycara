const User = require("../models/User");
const { sendResponse } = require("../utils/response");
const bcrypt = require("bcryptjs");
const Store = require("../models/Store");

// ✅ Controller
const getUsers = async (req, res) => {
  try {
    let { page = 1, limit = 10, search = "", isDownload = "false" } = req.query;
    const download = isDownload.toLowerCase() === "true";

    const baseQuery = {};

    // 🧑‍💼 SUPER ADMIN: See all users — no filtering
    if (req.user.role === "super_admin") {
      // no baseQuery restrictions
    }

    // 🏪 STORE OWNER: Only see users from their store (not other owners)
    else if (req.user.role === "store_owner") {
      baseQuery.storeId = req.user.storeId;
      baseQuery.role = "store_user"; // only store users, not other owners
    }

    // 👤 STORE USER: shouldn't reach here because authorizeMinRole blocks it,
    // but we add a safeguard anyway
    else {
      return sendResponse(res, false, null, "Forbidden: You do not have access");
    }

    // 🔍 Optional search
    if (search) {
      baseQuery.name = { $regex: search, $options: "i" };
    }

    // ⬇ Download mode: return full data without pagination
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
      storeName,      // required if role = store_owner
      storeEmail,     // optional
      storePhone,     // optional
      storeAddress,   // optional
    } = req.body;

    // 📸 Uploaded files
    const profile_picture = req.files?.profile_picture?.[0]?.filename || null;
    const logo = req.files?.logo?.[0]?.filename || null;
    const banner = req.files?.banner?.[0]?.filename || null;

    // 🚫 Prevent duplicates
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return sendResponse(res, false, null, "A user with this email already exists");
    }

    // ✅ Default password
    const passwordToUse = password || "Temp1234!";

    let createdStore = null;
    let finalRole = role;
    let finalStoreId = null;

    if (req.user.role === "super_admin" && role === "store_owner") {
      if (!storeName) {
        return sendResponse(res, false, null, "Store name is required for store owner");
      }

      createdStore = await Store.create({
        name: storeName,
        email: storeEmail || email,
        phone: storePhone || "",
        address: storeAddress || {},
        logo,
        banner,
      });

      finalRole = "store_owner";
      finalStoreId = createdStore._id;
    } 
    else if (req.user.role === "super_admin" && role === "store_user") {
      if (!req.body.storeId) {
        return sendResponse(res, false, null, "storeId is required to create store_user");
      }
      finalStoreId = req.body.storeId;
    }
    else if (req.user.role === "store_owner") {
      if (role !== "store_user") {
        return sendResponse(res, false, null, "Store owners can only create store users");
      }
      finalRole = "store_user";
      finalStoreId = req.user.storeId;
    } else {
      return sendResponse(res, false, null, "Forbidden: You don't have permission to create this user");
    }

    // ✅ Create the user
    const newUser = await User.create({
      name,
      email,
      password: passwordToUse,
      role: finalRole,
      mobile_number,
      address,
      gender,
      date_of_birth,
      profile_picture,
      storeId: finalStoreId,
    });

    return sendResponse(
      res,
      true,
      {
        user: { ...newUser.toObject(), password: undefined },
        store: createdStore,
      },
      createdStore ? "Store owner & store created successfully" : "User created successfully"
    );
  } catch (err) {
    console.error(err);
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
      storeName,
      storeEmail,
      storePhone,
      storeAddress,
    } = req.body;

    // 📸 Uploaded files
    const profile_picture = req.files?.profile_picture?.[0]?.filename;
    const logo = req.files?.logo?.[0]?.filename;
    const banner = req.files?.banner?.[0]?.filename;

    const updateData = {
      name,
      email,
      role,
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

    // ---------------- Store updates ----------------
    if (existingUser.role === "store_owner" && existingUser.storeId) {
      if (req.user.role === "super_admin") {
        const storeUpdate = {};
        if (storeName) storeUpdate.name = storeName;
        if (storeEmail) storeUpdate.email = storeEmail;
        if (storePhone) storeUpdate.phone = storePhone;
        if (storeAddress) storeUpdate.address = storeAddress;
        if (logo) storeUpdate.logo = logo;
        if (banner) storeUpdate.banner = banner;

        if (Object.keys(storeUpdate).length > 0) {
          await Store.findByIdAndUpdate(existingUser.storeId, storeUpdate, { new: true });
        }
      }

      // Prevent downgrading store_owner
      if (role && role !== "store_owner") {
        return sendResponse(res, false, null, "Cannot change role of store_owner");
      }
    }

    // Store user updates
    if (existingUser.role === "store_user") {
      if (req.user.role === "store_owner") {
        if (existingUser.storeId.toString() !== req.user.storeId.toString()) {
          return sendResponse(res, false, null, "Forbidden: Can't update user from another store");
        }
        if (role && role !== "store_user") {
          return sendResponse(res, false, null, "Store owners can only update store_user details");
        }
      }
      if (req.user.role === "super_admin" && req.body.storeId) {
        updateData.storeId = req.body.storeId;
      }
    }

    // Prevent self role downgrade
    if (req.user._id.toString() === userId && role && role !== req.user.role) {
      return sendResponse(res, false, null, "You cannot change your own role");
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true }).select("-password");

    return sendResponse(res, true, { user: updatedUser }, "User updated successfully");
  } catch (err) {
    console.error(err);
    return sendResponse(res, false, null, "Failed to update user: " + err.message);
  }
};

// ✅ Delete user (with cascading store + users)
const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return sendResponse(res, false, null, "User not found");

    // 🚫 Prevent super_admin from deleting itself accidentally
    if (req.user._id.toString() === user._id.toString()) {
      return sendResponse(res, false, null, "You cannot delete your own account");
    }

    // ✅ If deleting a store_owner → cascade delete store + users
    if (user.role === "store_owner" && user.storeId) {
      // Delete all store users under this store
      await User.deleteMany({ storeId: user.storeId, role: "store_user" });

      // Delete the store itself
      await Store.findByIdAndDelete(user.storeId);
    }

    // ✅ Finally, delete the user
    await User.findByIdAndDelete(user._id);

    return sendResponse(res, true, null, "User and associated data deleted successfully");
  } catch (err) {
    return sendResponse(res, false, null, "Failed to delete user: " + err.message);
  }
};

const bulkDeleteUsers = async (req, res) => {
  try {
    const { ids } = req.body;
    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return sendResponse(res, false, null, "No user IDs provided for deletion");
    }

    const users = await User.find({ _id: { $in: ids } });

    for (const user of users) {
      if (user.role === "store_owner" && user.storeId) {
        await User.deleteMany({ storeId: user.storeId, role: "store_user" });
        await Store.findByIdAndDelete(user.storeId);
      }
    }

    const result = await User.deleteMany({ _id: { $in: ids } });

    return sendResponse(
      res,
      true,
      { deletedCount: result.deletedCount },
      "Selected users and associated stores deleted successfully"
    );
  } catch (err) {
    return sendResponse(res, false, null, "Failed to delete users: " + err.message);
  }
};

// ✅ NEW: Get logged-in user's own profile
const getOwnProfile = async (req, res) => {
   try {
    const user = await User.findById(req.user._id)
      .select("-password")
      .populate("storeId"); // optional, populate store info for owners/users

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
      storeName,
      storePhone,
      storeEmail,
      storeAddress,
    } = req.body;

    const profile_picture = req.files?.profile_picture?.[0]?.filename;
    const logo = req.files?.logo?.[0]?.filename;
    const banner = req.files?.banner?.[0]?.filename;

    const updateData = { name, email, mobile_number, address, gender, date_of_birth };
    if (profile_picture) updateData.profile_picture = profile_picture;

    if (password) {
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(password, salt);
    }

    if (req.user.role === "store_owner" && req.user.storeId) {
      const storeUpdate = {};
      if (storeName) storeUpdate.name = storeName;
      if (storeEmail) storeUpdate.email = storeEmail;
      if (storePhone) storeUpdate.phone = storePhone;
      if (storeAddress) storeUpdate.address = storeAddress;
      if (logo) storeUpdate.logo = logo;
      if (banner) storeUpdate.banner = banner;

      if (Object.keys(storeUpdate).length > 0) {
        await Store.findByIdAndUpdate(req.user.storeId, storeUpdate);
      }
    }

    const updatedUser = await User.findByIdAndUpdate(req.user._id, updateData, { new: true }).select("-password");

    return sendResponse(res, true, { user: updatedUser }, "Profile updated successfully");
  } catch (err) {
    return sendResponse(res, false, null, "Failed to update profile: " + err.message);
  }
};

// Update own profile (for logged-in users)
const deleteOwnProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return sendResponse(res, false, null, "User not found");

    // ⚠️ If store_owner → delete store and linked users as well
    if (user.role === "store_owner" && user.storeId) {
      await User.deleteMany({ storeId: user.storeId, role: "store_user" }); // delete store users
      await Store.findByIdAndDelete(user.storeId); // delete store itself
    }

    await User.findByIdAndDelete(req.user._id); // delete own account

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
  updateOwnProfile,
  getOwnProfile,
  deleteOwnProfile
};
