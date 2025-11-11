//D:\mycara\backend\src\controllers\categoryController.js

const { default: slugify } = require("slugify");
const Category = require("../models/Category");
const { sendResponse } = require("../utils/response");

const getCategories = async (req, res) => {
  try {
    let { page = 1, limit = 10, search = "", isDownload = "false", status } = req.query;
    const download = isDownload.toLowerCase() === "true";

    // Build query
    const query = {};
    if (search) query.name = { $regex: search, $options: "i" };
    if (status && ["active", "inactive"].includes(status)) query.status = status;

    if (download) {
      // Populate parent category name
      const categories = await Category.find(query)
        .sort({ createdAt: -1 })
        .populate("parent_id", "name"); // only get parent name
      return sendResponse(res, true, { categories }, "All categories retrieved for download");
    }

    page = parseInt(page);
    limit = parseInt(limit);

    const total = await Category.countDocuments(query);

    const categories = await Category.find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 })
      .populate("parent_id", "name"); // populate parent category name

    sendResponse(res, true, { categories, total, page, pages: Math.ceil(total / limit) });
  } catch (err) {
    sendResponse(res, false, null, err.message);
  }
};

const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find().select("_id name");
    res.json({ success: true, data: categories });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
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
  const { name, slug, parent_id, image, status, description } = req.body;

  if (!name)
    return res
      .status(400)
      .json({ success: false, message: "Name is required" });

  // Use uploaded file if exists, otherwise use frontend-provided image URL
  const image_url = req.file ? `/uploads/${req.file.filename}` : image || null;

  const categoryData = {
    name,
    slug: slug || slugify(name, { lower: true, strict: true }),
    parent_id: parent_id || null,
    image_url,
    description: description || "", // Add description field
    status: status || "active",
  };

  try {
    const category = new Category(categoryData);
    const savedCategory = await category.save();
    sendResponse(res, true, savedCategory, "Category created successfully");
  } catch (err) {
    sendResponse(res, false, null, err.message);
  }
};

const updateCategory = async (req, res) => {
  try {
    // Prepare update data
    const updateData = { ...req.body };

    // Normalize parent_id
    if (updateData.parent_id === "") {
      updateData.parent_id = null;
    }

    // Handle uploaded file
    if (req.file) {
      updateData.image_url = `/uploads/${req.file.filename}`;
    } else if (req.body.image) {
      // Use image from frontend if provided
      updateData.image_url = req.body.image;
    }

    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!updatedCategory)
      return sendResponse(res, false, null, "Category not found");

    sendResponse(res, true, updatedCategory, "Category updated successfully");
  } catch (err) {
    sendResponse(res, false, null, err.message);
  }
};

const updateCategoryStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const { id } = req.params;

    // Validate status value
    if (!["active", "inactive"].includes(status)) {
      return sendResponse(res, false, null, "Invalid status value");
    }

    const category = await Category.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!category) {
      return sendResponse(res, false, null, "Category not found");
    }

    sendResponse(res, true, category, "Category status updated successfully");
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
  getAllCategories,
  updateCategoryStatus
};
