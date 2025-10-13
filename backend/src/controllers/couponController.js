const Coupon = require("../models/Coupon");
const { sendResponse } = require("../utils/response");

// Helper function to generate a random coupon code
const generateCouponCode = (length = 8) => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";
  for (let i = 0; i < length; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
};

// Get all coupons with pagination & search / optional download
const getCoupons = async (req, res) => {
  try {
    let { page = 1, limit = 10, search = "", isDownload = "false",status } = req.query;
    const download = isDownload.toLowerCase() === "true";

    const query = search ? { code: { $regex: search, $options: "i" } } : {};

    if (status && ["active", "inactive"].includes(status)) query.status = status;

    if (download) {
      const coupons = await Coupon.find(query).sort({ createdAt: -1 });
      return sendResponse(res, true, { coupons }, "All coupons retrieved for download");
    }

    page = parseInt(page);
    limit = parseInt(limit);

    const total = await Coupon.countDocuments(query);
    const coupons = await Coupon.find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });

    sendResponse(res, true, { coupons, total, page, pages: Math.ceil(total / limit) });
  } catch (err) {
    sendResponse(res, false, null, err.message);
  }
};

// Get coupon by ID
const getCouponById = async (req, res) => {
  try {
    const coupon = await Coupon.findById(req.params.id);
    if (!coupon) return sendResponse(res, false, null, "Coupon not found");
    sendResponse(res, true, coupon, "Coupon retrieved successfully");
  } catch (err) {
    sendResponse(res, false, null, err.message);
  }
};

// ✅ Create Coupon
const createCoupon = async (req, res) => {
  try {
    let { code } = req.body;

    // If no code provided, generate one
    if (!code) {
      code = generateCouponCode();
      req.body.code = code;
    }

    // Ensure uniqueness
    const existingCoupon = await Coupon.findOne({ code });
    if (existingCoupon) {
      return sendResponse(res, false, null, "Coupon code already exists");
    }

    const coupon = new Coupon(req.body);
    const savedCoupon = await coupon.save();
    sendResponse(res, true, savedCoupon, "Coupon created successfully");
  } catch (err) {
    sendResponse(res, false, null, err.message);
  }
};

// ✅ Update Coupon
const updateCoupon = async (req, res) => {
  try {
    // Optional: prevent updating code to a duplicate one
    if (req.body.code) {
      const existingCoupon = await Coupon.findOne({
        code: req.body.code,
        _id: { $ne: req.params.id },
      });
      if (existingCoupon) {
        return sendResponse(res, false, null, "Coupon code already exists");
      }
    }

    const updatedCoupon = await Coupon.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!updatedCoupon) return sendResponse(res, false, null, "Coupon not found");

    sendResponse(res, true, updatedCoupon, "Coupon updated successfully");
  } catch (err) {
    sendResponse(res, false, null, err.message);
  }
};

const updateCouponStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const { id } = req.params;

    // Validate status value
    if (!["active", "inactive"].includes(status)) {
      return sendResponse(res, false, null, "Invalid status value");
    }

    const coupon = await Coupon.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!coupon) {
      return sendResponse(res, false, null, "Coupon not found");
    }

    sendResponse(res, true, coupon, "Coupon status updated successfully");
  } catch (err) {
    sendResponse(res, false, null, err.message);
  }
};


// Delete coupon
const deleteCoupon = async (req, res) => {
  try {
    const deletedCoupon = await Coupon.findByIdAndDelete(req.params.id);
    if (!deletedCoupon) return sendResponse(res, false, null, "Coupon not found");
    sendResponse(res, true, null, "Coupon deleted successfully");
  } catch (err) {
    sendResponse(res, false, null, err.message);
  }
};

// Bulk delete coupons
const bulkDeleteCoupons = async (req, res) => {
  try {
    const { ids } = req.body;
    if (!ids || !ids.length) return sendResponse(res, false, null, "No IDs provided");

    const result = await Coupon.deleteMany({ _id: { $in: ids } });
    sendResponse(res, true, { deletedCount: result.deletedCount }, "Coupons deleted successfully");
  } catch (err) {
    sendResponse(res, false, null, err.message);
  }
};

module.exports = {
  getCoupons,
  getCouponById,
  createCoupon,
  updateCoupon,
  deleteCoupon,
  bulkDeleteCoupons,
  updateCouponStatus
};
