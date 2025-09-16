const Wishlist = require("../models/Wishlist");
const { sendResponse } = require("../utils/response");

// Create a wishlist (if not exists)
const createWishlist = async (req, res) => {
  try {
    const { user_id } = req.body;
    let wishlist = await Wishlist.findOne({ user_id });
    if (!wishlist) {
      wishlist = await Wishlist.create({ user_id, items: [] });
    }
    sendResponse(res, true, wishlist, "Wishlist created/retrieved successfully");
  } catch (err) {
    sendResponse(res, false, null, err.message);
  }
};

// Add item to wishlist
const addItemToWishlist = async (req, res) => {
  try {
    const { wishlist_id, product_id, variant_id } = req.body;

    const wishlist = await Wishlist.findById(wishlist_id);
    if (!wishlist) return sendResponse(res, false, null, "Wishlist not found");

    // Prevent duplicate item
    const exists = wishlist.items.find(
      (i) =>
        i.product_id.toString() === product_id &&
        (variant_id ? i.variant_id?.toString() === variant_id : true)
    );

    if (!exists) {
      wishlist.items.push({ product_id, variant_id });
      await wishlist.save();
    }

    sendResponse(res, true, wishlist, "Item added to wishlist successfully");
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
      .populate("items.product_id")
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

module.exports = {
  createWishlist,
  addItemToWishlist,
  removeItemFromWishlist,
  getWishlistByUser,
  deleteWishlist,
};
