const Brand = require("../models/Brand");
const { sendResponse } = require("../utils/response");

// Get all brands with pagination & search / optional full download
const getBrands = async (req, res) => {
  try {
    let { page = 1, limit = 10, search = "", isDownload = "false" } = req.query;
    const download = isDownload.toLowerCase() === "true";

    const query = search
      ? { name: { $regex: search, $options: "i" } }
      : {};

    if (download) {
      const brands = await Brand.find(query).sort({ name: 1 });
      return sendResponse(res, true, { brands }, "All brands retrieved for download");
    }

    page = parseInt(page);
    limit = parseInt(limit);

    const total = await Brand.countDocuments(query);
    const brands = await Brand.find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ name: 1 });

    sendResponse(res, true, {
      brands,
      total,
      page,
      pages: Math.ceil(total / limit),
    });
  } catch (err) {
    sendResponse(res, false, null, err.message);
  }
};

// Get brand by ID
const getBrandById = async (req, res) => {
  try {
    const brand = await Brand.findById(req.params.id);
    if (!brand) return sendResponse(res, false, null, "Brand not found");
    sendResponse(res, true, brand, "Brand retrieved successfully");
  } catch (err) {
    sendResponse(res, false, null, err.message);
  }
};

// Create brand
const createBrand = async (req, res) => {
  try {
    const brand = new Brand(req.body);
    const savedBrand = await brand.save();
    sendResponse(res, true, savedBrand, "Brand created successfully");
  } catch (err) {
    sendResponse(res, false, null, err.message);
  }
};

// Update brand
const updateBrand = async (req, res) => {
  try {
    const updatedBrand = await Brand.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedBrand) return sendResponse(res, false, null, "Brand not found");
    sendResponse(res, true, updatedBrand, "Brand updated successfully");
  } catch (err) {
    sendResponse(res, false, null, err.message);
  }
};

// Delete brand
const deleteBrand = async (req, res) => {
  try {
    const deletedBrand = await Brand.findByIdAndDelete(req.params.id);
    if (!deletedBrand) return sendResponse(res, false, null, "Brand not found");
    sendResponse(res, true, null, "Brand deleted successfully");
  } catch (err) {
    sendResponse(res, false, null, err.message);
  }
};

// Bulk delete brands
const bulkDeleteBrands = async (req, res) => {
  try {
    const { ids } = req.body;
    if (!ids || !ids.length) return sendResponse(res, false, null, "No IDs provided");

    const result = await Brand.deleteMany({ _id: { $in: ids } });
    sendResponse(res, true, { deletedCount: result.deletedCount }, "Brands deleted successfully");
  } catch (err) {
    sendResponse(res, false, null, err.message);
  }
};

module.exports = {
  getBrands,
  getBrandById,
  createBrand,
  updateBrand,
  deleteBrand,
  bulkDeleteBrands,
};
