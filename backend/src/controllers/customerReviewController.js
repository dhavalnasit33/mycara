const CustomerReview = require("../models/CustomerReview");
const { sendResponse } = require("../utils/response");

// Get all reviews
const getReviews = async (req, res) => {
  try {
    let { page = 1, limit = 10, search = "", isDownload = "false", is_approved } = req.query;
    const download = isDownload.toLowerCase() === "true";

    const query = {};

    // Search filter
    if (search) {
      query.title = { $regex: search, $options: "i" };
    }

    // is_approved filter
    if (is_approved === "true") query.is_approved = true;
    else if (is_approved === "false") query.is_approved = false;

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

const updateReviewStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { is_approved } = req.body; 
    if (typeof is_approved !== "boolean") {
      return res.status(400).json({ success: false, message: "is_approved must be a boolean" });
    }

    const review = await CustomerReview.findByIdAndUpdate(
      id,
      { is_approved },
      { new: true }
    );

    if (!review) {
      return res.status(404).json({ success: false, message: "Review not found" });
    }

    res.json({ success: true, data: review, message: "Review status updated successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
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
  updateReviewStatus
};
