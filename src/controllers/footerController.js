const Footer = require("../models/Footer");
const { sendResponse } = require("../utils/response");

// Get all footers with pagination & search / optional full download
const getFooters = async (req, res) => {
  try {
    let { page = 1, limit = 10, search = "", isDownload = "false" ,status} = req.query;
    const download = isDownload.toLowerCase() === "true";

    const query = search
      ? { label: { $regex: search, $options: "i" } }
      : {};

    if (download) {
      const footers = await Footer.find(query).sort({ createdAt: -1 });
      return sendResponse(res, true, { footers }, "All footers retrieved for download");
    }

    if (status && ["active", "inactive"].includes(status)) query.status = status;
    page = parseInt(page);
    limit = parseInt(limit);

    const total = await Footer.countDocuments(query);
    const footers = await Footer.find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });

    sendResponse(res, true, {
      footers,
      total,
      page,
      pages: Math.ceil(total / limit),
    });
  } catch (err) {
    sendResponse(res, false, null, err.message);
  }
};

// Get footer by ID
const getFooterById = async (req, res) => {
  try {
    const footer = await Footer.findById(req.params.id);
    if (!footer) return sendResponse(res, false, null, "Footer not found");
    sendResponse(res, true, footer, "Footer retrieved successfully");
  } catch (err) {
    sendResponse(res, false, null, err.message);
  }
};

// Create footer
const createFooter = async (req, res) => {
  try {
    const footer = new Footer(req.body);
    const savedFooter = await footer.save();
    sendResponse(res, true, savedFooter, "Footer created successfully");
  } catch (err) {
    sendResponse(res, false, null, err.message);
  }
};

// Update footer
const updateFooter = async (req, res) => {
  try {
    const updatedFooter = await Footer.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedFooter) return sendResponse(res, false, null, "Footer not found");
    sendResponse(res, true, updatedFooter, "Footer updated successfully");
  } catch (err) {
    sendResponse(res, false, null, err.message);
  }
};

const updateFooterStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const { id } = req.params;

    // Validate status value
    if (!["active", "inactive"].includes(status)) {
      return sendResponse(res, false, null, "Invalid status value");
    }

    const footer = await Footer.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!footer) {
      return sendResponse(res, false, null, "Footer not found");
    }

    sendResponse(res, true, footer, "Footer status updated successfully");
  } catch (err) {
    sendResponse(res, false, null, err.message);
  }
};

// Delete footer
const deleteFooter = async (req, res) => {
  try {
    const deletedFooter = await Footer.findByIdAndDelete(req.params.id);
    if (!deletedFooter) return sendResponse(res, false, null, "Footer not found");
    sendResponse(res, true, null, "Footer deleted successfully");
  } catch (err) {
    sendResponse(res, false, null, err.message);
  }
};

// Bulk delete footers
const bulkDeleteFooters = async (req, res) => {
  try {
    const { ids } = req.body;
    if (!ids || !ids.length) return sendResponse(res, false, null, "No IDs provided");

    const result = await Footer.deleteMany({ _id: { $in: ids } });
    sendResponse(res, true, { deletedCount: result.deletedCount }, "Footers deleted successfully");
  } catch (err) {
    sendResponse(res, false, null, err.message);
  }
};

module.exports = {
  getFooters,
  getFooterById,
  createFooter,
  updateFooter,
  deleteFooter,
  bulkDeleteFooters,
  updateFooterStatus
};
