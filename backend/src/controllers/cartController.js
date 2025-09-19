const Cart = require("../models/Cart");
const { sendResponse } = require("../utils/response");


const getCarts = async (req, res) => {
  try {
    let { page = 1, limit = 10 } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);

    const total = await Cart.countDocuments();
    const carts = await Cart.find()
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 })
      .populate("user_id", "name email")
      .populate("items.product_id", "name price")
      .populate("items.variant_id", "color size sku");

    sendResponse(res, true, { carts, total, page, pages: Math.ceil(total / limit) });
  } catch (err) {
    sendResponse(res, false, null, err.message);
  }
};

const getCartById = async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.id)
      .populate("user_id", "name email")
      .populate("items.product_id", "name price")
      .populate("items.variant_id", "color size sku");
    if (!cart) return sendResponse(res, false, null, "Cart not found");
    sendResponse(res, true, cart, "Cart retrieved successfully");
  } catch (err) {
    sendResponse(res, false, null, err.message);
  }
};

// Create cart
const createCart = async (req, res) => {
  try {
    const cart = new Cart(req.body); // items can be empty initially
    const savedCart = await cart.save();
    sendResponse(res, true, savedCart, "Cart created successfully");
  } catch (err) {
    sendResponse(res, false, null, err.message);
  }
};

// Add item to cart
const addCartItem = async (req, res) => {
  try {
    const { cart_id, product_id, variant_id, quantity } = req.body;
    const cart = await Cart.findById(cart_id);
    if (!cart) return sendResponse(res, false, null, "Cart not found");

    // Check if variant already exists
    const existingItem = cart.items.find(
      (item) => item.variant_id.toString() === variant_id
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ product_id, variant_id, quantity });
    }

    await cart.save();
    sendResponse(res, true, cart, "Item added to cart successfully");
  } catch (err) {
    sendResponse(res, false, null, err.message);
  }
};

// Update item quantity
const updateCartItem = async (req, res) => {
  try {
    const { cart_id, item_id, quantity } = req.body;
    const cart = await Cart.findById(cart_id);
    if (!cart) return sendResponse(res, false, null, "Cart not found");

    const item = cart.items.id(item_id);
    if (!item) return sendResponse(res, false, null, "Item not found");

    item.quantity = quantity;
    await cart.save();
    sendResponse(res, true, cart, "Cart item updated successfully");
  } catch (err) {
    sendResponse(res, false, null, err.message);
  }
};

// Delete item from cart
const deleteCartItem = async (req, res) => {
  try {
    const { cart_id, item_id } = req.body;
    const cart = await Cart.findById(cart_id);
    if (!cart) return sendResponse(res, false, null, "Cart not found");

    cart.items.id(item_id)?.remove();
    await cart.save();
    sendResponse(res, true, cart, "Cart item deleted successfully");
  } catch (err) {
    sendResponse(res, false, null, err.message);
  }
};

// Delete entire cart
const deleteCart = async (req, res) => {
  try {
    const deletedCart = await Cart.findByIdAndDelete(req.params.id);
    if (!deletedCart) return sendResponse(res, false, null, "Cart not found");
    sendResponse(res, true, null, "Cart deleted successfully");
  } catch (err) {
    sendResponse(res, false, null, err.message);
  }
};

module.exports = {
  getCarts,
  getCartById,
  createCart,
  addCartItem,
  updateCartItem,
  deleteCartItem,
  deleteCart,
};
