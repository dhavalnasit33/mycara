const ProductLabel = require("../models/ProductLabel");
const { sendResponse } = require("../utils/response");

const getProductLabels = async (req, res) => {
  try {
    let { page = 1, limit = 10, search = "", isDownload = "false", status } = req.query;
    const download = isDownload.toLowerCase() === "true";

    // Build query
    const query = {};
    if (search) query.name = { $regex: search, $options: "i" };
    if (status && ["active", "inactive"].includes(status)) query.status = status;

    if (download) {
      const labels = await ProductLabel.find(query).sort({ createdAt: -1 });
      return sendResponse(res, true, { labels }, "All labels retrieved for download");
    }

    page = parseInt(page);
    limit = parseInt(limit);

    const total = await ProductLabel.countDocuments(query);
    const labels = await ProductLabel.find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });

    sendResponse(res, true, { labels, total, page, pages: Math.ceil(total / limit) });
  } catch (err) {
    sendResponse(res, false, null, err.message);
  }
};

const getProductLabelById = async (req, res) => {
  try {
    const label = await ProductLabel.findById(req.params.id);
    if (!label) return sendResponse(res, false, null, "Product label not found");
    sendResponse(res, true, label, "Product label retrieved successfully");
  } catch (err) {
    sendResponse(res, false, null, err.message);
  }
};

const createProductLabel = async (req, res) => {
  try {
    const label = new ProductLabel(req.body);
    const savedLabel = await label.save();
    sendResponse(res, true, savedLabel, "Product label created successfully");
  } catch (err) {
    sendResponse(res, false, null, err.message);
  }
};

const updateProductLabel = async (req, res) => {
  try {
    const updatedLabel = await ProductLabel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedLabel) return sendResponse(res, false, null, "Product label not found");
    sendResponse(res, true, updatedLabel, "Product label updated successfully");
  } catch (err) {
    sendResponse(res, false, null, err.message);
  }
};

const deleteProductLabel = async (req, res) => {
  try {
    const deletedLabel = await ProductLabel.findByIdAndDelete(req.params.id);
    if (!deletedLabel) return sendResponse(res, false, null, "Product label not found");
    sendResponse(res, true, null, "Product label deleted successfully");
  } catch (err) {
    sendResponse(res, false, null, err.message);
  }
};

const bulkDeleteProductLabels = async (req, res) => {
  try {
    const { ids } = req.body;
    if (!ids || !ids.length) return sendResponse(res, false, null, "No IDs provided");

    const result = await ProductLabel.deleteMany({ _id: { $in: ids } });
    sendResponse(res, true, { deletedCount: result.deletedCount }, "Product labels deleted successfully");
  } catch (err) {
    sendResponse(res, false, null, err.message);
  }
};

module.exports = {
  getProductLabels,
  getProductLabelById,
  createProductLabel,
  updateProductLabel,
  deleteProductLabel,
  bulkDeleteProductLabels,
};
