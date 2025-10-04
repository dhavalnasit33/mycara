const { default: slugify } = require("slugify");
const Store = require("../models/Store");
const { sendResponse } = require("../utils/response");

// Get stores with pagination, search, and status filter
const getStores = async (req, res) => {
  try {
    let { page = 1, limit = 10, search = "", isDownload = "false", status } = req.query;
    const download = isDownload.toLowerCase() === "true";

    // Build query
    const query = {};
    if (search) query.name = { $regex: search, $options: "i" };
    if (status && ["active", "inactive"].includes(status)) query.status = status;

    if (download) {
      const stores = await Store.find(query).sort({ createdAt: -1 });
      return sendResponse(res, true, { stores }, "All stores retrieved for download");
    }

    page = parseInt(page);
    limit = parseInt(limit);
    const total = await Store.countDocuments(query);

    const stores = await Store.find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });

    sendResponse(res, true, { stores, total, page, pages: Math.ceil(total / limit) });
  } catch (err) {
    sendResponse(res, false, null, err.message);
  }
};

// Get all stores (for dropdowns, etc.)
const getAllStores = async (req, res) => {
  try {
    const stores = await Store.find().select("_id name");
    res.json({ success: true, data: stores });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get store by ID
const getStoreById = async (req, res) => {
  try {
    const store = await Store.findById(req.params.id);
    if (!store) return sendResponse(res, false, null, "Store not found");
    sendResponse(res, true, store, "Store retrieved successfully");
  } catch (err) {
    sendResponse(res, false, null, err.message);
  }
};

// Create store
const createStore = async (req, res) => {
  const { name, email, phone, website, logo, banner, description, theme, address, status } = req.body;

  if (!name || !email)
    return res.status(400).json({ success: false, message: "Name and email are required" });

  const storeData = {
    name,
    email,
    phone,
    website,
    logo,
    banner,
    description: description || "",
    theme: theme || { primaryColor: "#000000", secondaryColor: "#ffffff", fontFamily: "Roboto" },
    address: address || {},
    status: status || "active",
  };

  try {
    const store = new Store(storeData);
    const savedStore = await store.save();
    sendResponse(res, true, savedStore, "Store created successfully");
  } catch (err) {
    sendResponse(res, false, null, err.message);
  }
};

// Update store
const updateStore = async (req, res) => {
  try {
    const updateData = { ...req.body };
    const updatedStore = await Store.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!updatedStore) return sendResponse(res, false, null, "Store not found");
    sendResponse(res, true, updatedStore, "Store updated successfully");
  } catch (err) {
    sendResponse(res, false, null, err.message);
  }
};

// Delete store
const deleteStore = async (req, res) => {
  try {
    const deletedStore = await Store.findByIdAndDelete(req.params.id);
    if (!deletedStore) return sendResponse(res, false, null, "Store not found");
    sendResponse(res, true, null, "Store deleted successfully");
  } catch (err) {
    sendResponse(res, false, null, err.message);
  }
};

// Bulk delete stores
const bulkDeleteStores = async (req, res) => {
  try {
    const { ids } = req.body;
    if (!ids || !ids.length) return sendResponse(res, false, null, "No IDs provided");

    const result = await Store.deleteMany({ _id: { $in: ids } });
    sendResponse(res, true, { deletedCount: result.deletedCount }, "Stores deleted successfully");
  } catch (err) {
    sendResponse(res, false, null, err.message);
  }
};

module.exports = {
  getStores,
  getAllStores,
  getStoreById,
  createStore,
  updateStore,
  deleteStore,
  bulkDeleteStores,
};
