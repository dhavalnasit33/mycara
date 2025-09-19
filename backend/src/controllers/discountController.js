const Discount = require("../models/Discount");
const { sendResponse } = require("../utils/response");

// Implement get, getById, create, update, delete, bulkDelete (same pattern as above)
const getDiscounts = async (req, res) => {
  try {
    let { page = 1, limit = 10, search = "", isDownload = "false" } = req.query;
    const download = isDownload.toLowerCase() === "true";

    const query = search ? { name: { $regex: search, $options: "i" } } : {};

    if (download) {
      const discounts = await Discount.find(query).sort({ createdAt: -1 });
      return sendResponse(res, true, { discounts }, "All discounts retrieved for download");
    }

    page = parseInt(page);
    limit = parseInt(limit);

    const total = await Discount.countDocuments(query);
    const discounts = await Discount.find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });

    sendResponse(res, true, { discounts, total, page, pages: Math.ceil(total / limit) });
  } catch (err) {
    sendResponse(res, false, null, err.message);
  }
};

const getDiscountById = async (req, res) => {
  try {
    const discount = await Discount.findById(req.params.id);
    if (!discount) return sendResponse(res, false, null, "Discount not found");
    sendResponse(res, true, discount, "Discount retrieved successfully");
  } catch (err) {
    sendResponse(res, false, null, err.message);
  }
};

const createDiscount = async (req, res) => {
  try {
    const discount = new Discount(req.body);
    const savedDiscount = await discount.save();
    sendResponse(res, true, savedDiscount, "Discount created successfully");
  } catch (err) {
    sendResponse(res, false, null, err.message);
  }
};

const updateDiscount = async (req, res) => {
  try {
    const updatedDiscount = await Discount.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedDiscount) return sendResponse(res, false, null, "Discount not found");
    sendResponse(res, true, updatedDiscount, "Discount updated successfully");
  } catch (err) {
    sendResponse(res, false, null, err.message);
  }
};

const deleteDiscount = async (req, res) => {
  try {
    const deletedDiscount = await Discount.findByIdAndDelete(req.params.id);
    if (!deletedDiscount) return sendResponse(res, false, null, "Discount not found");
    sendResponse(res, true, null, "Discount deleted successfully");
  } catch (err) {
    sendResponse(res, false, null, err.message);
  }
};

const bulkDeleteDiscounts = async (req, res) => {
  try {
    const { ids } = req.body;
    if (!ids || !ids.length) return sendResponse(res, false, null, "No IDs provided");

    const result = await Discount.deleteMany({ _id: { $in: ids } });
    sendResponse(res, true, { deletedCount: result.deletedCount }, "Discounts deleted successfully");
  } catch (err) {
    sendResponse(res, false, null, err.message);
  }
};

module.exports = {
  getDiscounts,
  getDiscountById,
  createDiscount,
  updateDiscount,
  deleteDiscount,
  bulkDeleteDiscounts,
};
