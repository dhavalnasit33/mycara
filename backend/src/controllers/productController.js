const Product = require("../models/Product");
const { sendResponse } = require("../utils/response");

// Get all products
const getProducts = async (req, res) => {
  try {
    let { page = 1, limit = 10, search = "", isDownload = "false" } = req.query;
    const download = isDownload.toLowerCase() === "true";

    const query = search ? { name: { $regex: search, $options: "i" } } : {};

    if (download) {
      const products = await Product.find(query).sort({ createdAt: -1 });
      return sendResponse(res, true, { products }, "All products retrieved for download");
    }

    page = parseInt(page);
    limit = parseInt(limit);

    const total = await Product.countDocuments(query);
    const products = await Product.find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });

    sendResponse(res, true, { products, total, page, pages: Math.ceil(total / limit) }, "Products retrieved successfully");
  } catch (err) {
    sendResponse(res, false, null, err.message);
  }
};

// Get product by ID
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return sendResponse(res, false, null, "Product not found");
    sendResponse(res, true, product, "Product retrieved successfully");
  } catch (err) {
    sendResponse(res, false, null, err.message);
  }
};

// Create product
const createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    const savedProduct = await product.save();
    sendResponse(res, true, savedProduct, "Product created successfully");
  } catch (err) {
    sendResponse(res, false, null, err.message);
  }
};

// Update product
const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedProduct) return sendResponse(res, false, null, "Product not found");
    sendResponse(res, true, updatedProduct, "Product updated successfully");
  } catch (err) {
    sendResponse(res, false, null, err.message);
  }
};

// Delete product
const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) return sendResponse(res, false, null, "Product not found");
    sendResponse(res, true, null, "Product deleted successfully");
  } catch (err) {
    sendResponse(res, false, null, err.message);
  }
};

// Bulk delete products
const bulkDeleteProducts = async (req, res) => {
  try {
    const { ids } = req.body;
    if (!ids || !ids.length) return sendResponse(res, false, null, "No IDs provided");
    const result = await Product.deleteMany({ _id: { $in: ids } });
    sendResponse(res, true, { deletedCount: result.deletedCount }, "Products deleted successfully");
  } catch (err) {
    sendResponse(res, false, null, err.message);
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  bulkDeleteProducts,
};
