const Wishlist = require("../models/Wishlist");
const { sendResponse } = require("../utils/response");


// Get all wishlists with pagination, search, and optional download
const getWishlist = async (req, res) => {
  try {
    let { page = 1, limit = 10, search = "", isDownload = "false" } = req.query;
    const download = isDownload.toLowerCase() === "true";

    const query = {};
    if (search) {
      // Search by user name or email
      query.$or = [
        { "user_id.name": { $regex: search, $options: "i" } },
        { "user_id.email": { $regex: search, $options: "i" } },
      ];
    }

    if (download) {
      // Fetch all for download
      const wishlists = await Wishlist.find()
        .populate("user_id", "name email")
        .populate("items.product_id", "name image images")
        .populate("items.variant_id", "price color size sku")
        .sort({ createdAt: -1 });

      return sendResponse(res, true, { wishlists }, "All wishlists retrieved for download");
    }

    // Pagination
    page = parseInt(page);
    limit = parseInt(limit);
    const total = await Wishlist.countDocuments(query);

    const wishlists = await Wishlist.find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 })
      .populate("user_id", "name email")
      .populate("items.product_id", "name image images")
      .populate("items.variant_id", "price color size sku");

    sendResponse(res, true, { wishlists, total, page, pages: Math.ceil(total / limit) });
  } catch (err) {
    sendResponse(res, false, null, err.message);
  }
};


const addItemToWishlist = async (req, res) => {
  try {
    const { user_id, items } = req.body;

    if (!user_id || !items || !Array.isArray(items) || items.length === 0) {
      return sendResponse(res, false, null, "user_id and items array are required");
    }

    // Find wishlist or create if not exists
    let wishlist = await Wishlist.findOne({ user_id });
    if (!wishlist) {
      wishlist = await Wishlist.create({ user_id, items: [] });
    }

    // Add each item if not already in wishlist
    items.forEach(({ product_id, variant_id }) => {
      const exists = wishlist.items.some(
        (i) =>
          i.product_id.toString() === product_id &&
          (variant_id ? i.variant_id?.toString() === variant_id : true)
      );

      if (!exists) {
        wishlist.items.push({ product_id, variant_id });
      }
    });

    await wishlist.save();

    // Populate for response
    wishlist = await wishlist.populate("items.product_id items.variant_id", "name price sku");

    sendResponse(res, true, wishlist, "Items added to wishlist successfully");
  } catch (err) {
    sendResponse(res, false, null, err.message);
  }
};
// Remove item from wishlist
const removeItemFromWishlist = async (req, res) => {
  try {
    const { wishlist_id, item_id } = req.body;

    const wishlist = await Wishlist.findById(wishlist_id);
    if (!wishlist) return sendResponse(res, false, null, "Wishlist not found");

    wishlist.items = wishlist.items.filter((item) => item._id.toString() !== item_id);
    await wishlist.save();

    sendResponse(res, true, wishlist, "Item removed from wishlist successfully");
  } catch (err) {
    sendResponse(res, false, null, err.message);
  }
};

// Get wishlist by user
const getWishlistByUser = async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ user_id: req.params.user_id })
      // .populate("items.product_id")
      .populate({
        path: "items.product_id",
        populate: { path: "discount_id", select: "type value", },
      })
      .populate("items.variant_id");

    if (!wishlist) return sendResponse(res, false, null, "Wishlist not found");

    sendResponse(res, true, wishlist, "Wishlist retrieved successfully");
  } catch (err) {
    sendResponse(res, false, null, err.message);
  }
};

// Delete entire wishlist
const deleteWishlist = async (req, res) => {
  try {
    const deleted = await Wishlist.findByIdAndDelete(req.params.id);
    if (!deleted) return sendResponse(res, false, null, "Wishlist not found");

    sendResponse(res, true, null, "Wishlist deleted successfully");
  } catch (err) {
    sendResponse(res, false, null, err.message);
  }
};

// Bulk delete wishlist items
const bulkDeleteWishlistItems = async (req, res) => {
  try {
    const { ids } = req.body;

    if (!Array.isArray(ids) || ids.length === 0) {
      return sendResponse(res, false, null, "No item IDs provided");
    }

    // Update multiple wishlists by removing matching item IDs
    const result = await Wishlist.updateMany(
      { "items._id": { $in: ids } },
      { $pull: { items: { _id: { $in: ids } } } }
    );

    if (result.modifiedCount === 0) {
      return sendResponse(res, false, null, "No matching items found to delete");
    }

    sendResponse(res, true, result, "Selected wishlist items deleted successfully");
  } catch (err) {
    sendResponse(res, false, null, err.message);
  }
};

module.exports = {
  getWishlist,
  addItemToWishlist,
  removeItemFromWishlist,
  getWishlistByUser,
  deleteWishlist,
  bulkDeleteWishlistItems
};
