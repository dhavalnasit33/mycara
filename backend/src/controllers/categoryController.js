const Category = require("../models/Category");
const { sendResponse } = require("../utils/response");

const getCategories = async (req, res) => {
  try {
    let { page = 1, limit = 10, search = "", isDownload = "false" } = req.query;
    const download = isDownload.toLowerCase() === "true";

    const query = search ? { name: { $regex: search, $options: "i" } } : {};

    if (download) {
      const categories = await Category.find(query).sort({ createdAt: -1 });
      return sendResponse(res, true, { categories }, "All categories retrieved for download");
    }

    page = parseInt(page);
    limit = parseInt(limit);

    const total = await Category.countDocuments(query);
    const categories = await Category.find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });

    sendResponse(res, true, { categories, total, page, pages: Math.ceil(total / limit) });
  } catch (err) {
    sendResponse(res, false, null, err.message);
  }
};

const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return sendResponse(res, false, null, "Category not found");
    sendResponse(res, true, category, "Category retrieved successfully");
  } catch (err) {
    sendResponse(res, false, null, err.message);
  }
};

const createCategory = async (req, res) => {
  try {
    const category = new Category(req.body);
    const savedCategory = await category.save();
    sendResponse(res, true, savedCategory, "Category created successfully");
  } catch (err) {
    sendResponse(res, false, null, err.message);
  }
};

const updateCategory = async (req, res) => {
  try {
    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedCategory) return sendResponse(res, false, null, "Category not found");
    sendResponse(res, true, updatedCategory, "Category updated successfully");
  } catch (err) {
    sendResponse(res, false, null, err.message);
  }
};

const deleteCategory = async (req, res) => {
  try {
    const deletedCategory = await Category.findByIdAndDelete(req.params.id);
    if (!deletedCategory) return sendResponse(res, false, null, "Category not found");
    sendResponse(res, true, null, "Category deleted successfully");
  } catch (err) {
    sendResponse(res, false, null, err.message);
  }
};

const bulkDeleteCategories = async (req, res) => {
  try {
    const { ids } = req.body;
    if (!ids || !ids.length) return sendResponse(res, false, null, "No IDs provided");

    const result = await Category.deleteMany({ _id: { $in: ids } });
    sendResponse(res, true, { deletedCount: result.deletedCount }, "Categories deleted successfully");
  } catch (err) {
    sendResponse(res, false, null, err.message);
  }
};

module.exports = {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
  bulkDeleteCategories,
};
