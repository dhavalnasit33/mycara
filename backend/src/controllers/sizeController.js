const Size = require("../models/Size");
const { sendResponse } = require("../utils/response");

// Get all sizes
const getSizes = async (req, res) => {
  try {
    let { page = 1, limit = 10, search = "", isDownload = "false", status } = req.query;
    const download = isDownload.toLowerCase() === "true";

    const query = {};
    if (search) query.name = { $regex: search, $options: "i" };
    if (status && ["active", "inactive"].includes(status)) query.status = status;

    if (download) {
      const sizes = await Size.find(query).sort({ name: 1 });
      return sendResponse(res, true, { sizes }, "All sizes retrieved for download");
    }

    page = parseInt(page);
    limit = parseInt(limit);

    const total = await Size.countDocuments(query);
    const sizes = await Size.find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ name: 1 });

    sendResponse(res, true, { sizes, total, page, pages: Math.ceil(total / limit) });
  } catch (err) {
    sendResponse(res, false, null, err.message);
  }
};

// Get size by ID
const getSizeById = async (req, res) => {
  try {
    const size = await Size.findById(req.params.id);
    if (!size) return sendResponse(res, false, null, "Size not found");
    sendResponse(res, true, size, "Size retrieved successfully");
  } catch (err) {
    sendResponse(res, false, null, err.message);
  }
};

// Create size
const createSize = async (req, res) => {
  try {
    const { name, measurement, status } = req.body;
    if (!name) return sendResponse(res, false, null, "Name is required");

    const size = new Size({ name, measurement, status: status || "active" });
    const savedSize = await size.save();
    sendResponse(res, true, savedSize, "Size created successfully");
  } catch (err) {
    sendResponse(res, false, null, err.message);
  }
};

// Update size
const updateSize = async (req, res) => {
  try {
    const updatedSize = await Size.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedSize) return sendResponse(res, false, null, "Size not found");
    sendResponse(res, true, updatedSize, "Size updated successfully");
  } catch (err) {
    sendResponse(res, false, null, err.message);
  }
};

const updateSizeStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const { id } = req.params;

    // Validate status value
    if (!["active", "inactive"].includes(status)) {
      return sendResponse(res, false, null, "Invalid status value");
    }

    const size = await Size.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!size) {
      return sendResponse(res, false, null, "Size not found");
    }

    sendResponse(res, true, size, "Size status updated successfully");
  } catch (err) {
    sendResponse(res, false, null, err.message);
  }
};

// Delete size
const deleteSize = async (req, res) => {
  try {
    const deletedSize = await Size.findByIdAndDelete(req.params.id);
    if (!deletedSize) return sendResponse(res, false, null, "Size not found");
    sendResponse(res, true, null, "Size deleted successfully");
  } catch (err) {
    sendResponse(res, false, null, err.message);
  }
};

// Bulk delete sizes
const bulkDeleteSizes = async (req, res) => {
  try {
    const { ids } = req.body;
    if (!ids || !ids.length) return sendResponse(res, false, null, "No IDs provided");

    const result = await Size.deleteMany({ _id: { $in: ids } });
    sendResponse(res, true, { deletedCount: result.deletedCount }, "Sizes deleted successfully");
  } catch (err) {
    sendResponse(res, false, null, err.message);
  }
};

module.exports = {
  getSizes,
  getSizeById,
  createSize,
  updateSize,
  deleteSize,
  bulkDeleteSizes,
  updateSizeStatus
};
