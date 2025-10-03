const CustomerReview = require("../models/CustomerReview");
const { sendResponse } = require("../utils/response");

// Get all reviews
const getReviews = async (req, res) => {
  try {
    let { page = 1, limit = 10, search = "", isDownload = "false" } = req.query;
    const download = isDownload.toLowerCase() === "true";

    const query = search
      ? { title: { $regex: search, $options: "i" } }
      : {};

    if (download) {
      const customerReviews = await CustomerReview.find(query)
        .populate("user_id product_id")
        .sort({ createdAt: -1 });
      return sendResponse(res, true, { customerReviews }, "All reviews retrieved for download");
    }

    page = parseInt(page);
    limit = parseInt(limit);

    const total = await CustomerReview.countDocuments(query);
    const customerReviews = await CustomerReview.find(query)
      .populate("user_id product_id")
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });

    sendResponse(res, true, { customerReviews, total, page, pages: Math.ceil(total / limit) });
  } catch (err) {
    sendResponse(res, false, null, err.message);
  }
};

// Get review by ID
const getReviewById = async (req, res) => {
  try {
    const review = await CustomerReview.findById(req.params.id).populate("user_id product_id");
    if (!review) return sendResponse(res, false, null, "Review not found");
    sendResponse(res, true, review, "Review retrieved successfully");
  } catch (err) {
    sendResponse(res, false, null, err.message);
  }
};

// Create review
const createReview = async (req, res) => {
  try {
    const review = new CustomerReview(req.body);
    const savedReview = await review.save();
    sendResponse(res, true, savedReview, "Review submitted successfully");
  } catch (err) {
    sendResponse(res, false, null, err.message);
  }
};

// Update review (approve/reject)
const updateReview = async (req, res) => {
  try {
    const updatedReview = await CustomerReview.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedReview) return sendResponse(res, false, null, "Review not found");
    sendResponse(res, true, updatedReview, "Review updated successfully");
  } catch (err) {
    sendResponse(res, false, null, err.message);
  }
};

// Delete review
const deleteReview = async (req, res) => {
  try {
    const deletedReview = await CustomerReview.findByIdAndDelete(req.params.id);
    if (!deletedReview) return sendResponse(res, false, null, "Review not found");
    sendResponse(res, true, null, "Review deleted successfully");
  } catch (err) {
    sendResponse(res, false, null, err.message);
  }
};

// Bulk delete reviews
const bulkDeleteReviews = async (req, res) => {
  try {
    const { ids } = req.body;
    if (!ids || !ids.length) return sendResponse(res, false, null, "No IDs provided");

    const result = await CustomerReview.deleteMany({ _id: { $in: ids } });
    sendResponse(res, true, { deletedCount: result.deletedCount }, "Reviews deleted successfully");
  } catch (err) {
    sendResponse(res, false, null, err.message);
  }
};

module.exports = {
  getReviews,
  getReviewById,
  createReview,
  updateReview,
  deleteReview,
  bulkDeleteReviews,
};
