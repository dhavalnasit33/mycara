const Payment = require("../models/Payment");
const { sendResponse } = require("../utils/response");

// Get all payments with pagination & optional download
const getPayments = async (req, res) => {
  try {
    let { page = 1, limit = 10, search = "", isDownload = "false",status } = req.query;
    const download = isDownload.toLowerCase() === "true";

    const query = {};
    if (search) query.payment_status = { $regex: search, $options: "i" };
   
    if (status && ["pending", "pending", "failed"].includes(status)) {
      query.status = status;
    }

    if (download) {
      const payments = await Payment.find(query).sort({ createdAt: -1 });
      return sendResponse(res, true, { payments }, "All payments retrieved for download");
    }

    page = parseInt(page);
    limit = parseInt(limit);

    const total = await Payment.countDocuments(query);
    const payments = await Payment.find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 })
      .populate("order_id", "total_price status")
      .populate("user_id", "name email")
      .populate("coupon_id", "code discount_value");

    sendResponse(res, true, { payments, total, page, pages: Math.ceil(total / limit) });
  } catch (err) {
    sendResponse(res, false, null, err.message);
  }
};

// Get payment by ID
const getPaymentById = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id)
      .populate("order_id", "total_price status")
      .populate("user_id", "name email")
      .populate("coupon_id", "code discount_value");

    if (!payment) return sendResponse(res, false, null, "Payment not found");
    sendResponse(res, true, payment, "Payment retrieved successfully");
  } catch (err) {
    sendResponse(res, false, null, err.message);
  }
};

// Create payment
const createPayment = async (req, res) => {
  try {
    const payment = new Payment(req.body);
    const savedPayment = await payment.save();
    sendResponse(res, true, savedPayment, "Payment created successfully");
  } catch (err) {
    sendResponse(res, false, null, err.message);
  }
};

// Update payment
const updatePayment = async (req, res) => {
  try {
    const updatedPayment = await Payment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedPayment) return sendResponse(res, false, null, "Payment not found");
    sendResponse(res, true, updatedPayment, "Payment updated successfully");
  } catch (err) {
    sendResponse(res, false, null, err.message);
  }
};

// Delete payment
const deletePayment = async (req, res) => {
  try {
    const deletedPayment = await Payment.findByIdAndDelete(req.params.id);
    if (!deletedPayment) return sendResponse(res, false, null, "Payment not found");
    sendResponse(res, true, null, "Payment deleted successfully");
  } catch (err) {
    sendResponse(res, false, null, err.message);
  }
};

// Bulk delete payments
const bulkDeletePayments = async (req, res) => {
  try {
    const { ids } = req.body;
    if (!ids || !ids.length) return sendResponse(res, false, null, "No IDs provided");

    const result = await Payment.deleteMany({ _id: { $in: ids } });
    sendResponse(res, true, { deletedCount: result.deletedCount }, "Payments deleted successfully");
  } catch (err) {
    sendResponse(res, false, null, err.message);
  }
};

module.exports = {
  getPayments,
  getPaymentById,
  createPayment,
  updatePayment,
  deletePayment,
  bulkDeletePayments,
};
