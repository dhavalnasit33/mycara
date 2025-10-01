const Color = require("../models/Color");
const { sendResponse } = require("../utils/response");

// Get all colors
const getColors = async (req, res) => {
  try {
    let { page = 1, limit = 10, search = "", isDownload = "false", status } = req.query;
    const download = isDownload.toLowerCase() === "true";

    const query = {};
    if (search) query.name = { $regex: search, $options: "i" };
    if (status && ["active", "inactive"].includes(status)) query.status = status;

    if (download) {
      const colors = await Color.find(query).sort({ name: 1 });
      return sendResponse(res, true, { colors }, "All colors retrieved for download");
    }

    page = parseInt(page);
    limit = parseInt(limit);

    const total = await Color.countDocuments(query);
    const colors = await Color.find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ name: 1 });

    sendResponse(res, true, { colors, total, page, pages: Math.ceil(total / limit) });
  } catch (err) {
    sendResponse(res, false, null, err.message);
  }
};

// Get color by ID
const getColorById = async (req, res) => {
  try {
    const color = await Color.findById(req.params.id);
    if (!color) return sendResponse(res, false, null, "Color not found");
    sendResponse(res, true, color, "Color retrieved successfully");
  } catch (err) {
    sendResponse(res, false, null, err.message);
  }
};

// Create color
const createColor = async (req, res) => {
  try {
    const { name, code, status } = req.body;
    if (!name) return sendResponse(res, false, null, "Name is required");

    const color = new Color({ name, code, status: status || "active" });
    const savedColor = await color.save();
    sendResponse(res, true, savedColor, "Color created successfully");
  } catch (err) {
    sendResponse(res, false, null, err.message);
  }
};

// Update color
const updateColor = async (req, res) => {
  try {
    const updatedColor = await Color.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedColor) return sendResponse(res, false, null, "Color not found");
    sendResponse(res, true, updatedColor, "Color updated successfully");
  } catch (err) {
    sendResponse(res, false, null, err.message);
  }
};

// Delete color
const deleteColor = async (req, res) => {
  try {
    const deletedColor = await Color.findByIdAndDelete(req.params.id);
    if (!deletedColor) return sendResponse(res, false, null, "Color not found");
    sendResponse(res, true, null, "Color deleted successfully");
  } catch (err) {
    sendResponse(res, false, null, err.message);
  }
};

// Bulk delete colors
const bulkDeleteColors = async (req, res) => {
  try {
    const { ids } = req.body;
    if (!ids || !ids.length) return sendResponse(res, false, null, "No IDs provided");

    const result = await Color.deleteMany({ _id: { $in: ids } });
    sendResponse(res, true, { deletedCount: result.deletedCount }, "Colors deleted successfully");
  } catch (err) {
    sendResponse(res, false, null, err.message);
  }
};

module.exports = {
  getColors,
  getColorById,
  createColor,
  updateColor,
  deleteColor,
  bulkDeleteColors,
};
