const Order = require("../models/Order");
const OrderItem = require("../models/OrderItem");
const { sendResponse } = require("../utils/response");

// Get all orders with pagination & search / optional download
const getOrders = async (req, res) => {
  try {
    let { page = 1, limit = 10, search = "", isDownload = "false" } = req.query;
    const download = isDownload.toLowerCase() === "true";

    const query = {};
    if (search) query.status = { $regex: search, $options: "i" };

    if (download) {
      const orders = await Order.find(query).sort({ createdAt: -1 });
      return sendResponse(res, true, { orders }, "All orders retrieved for download");
    }

    page = parseInt(page);
    limit = parseInt(limit);

    const total = await Order.countDocuments(query);
    const orders = await Order.find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 })
      .populate("user_id", "name email")
      .populate("coupon_id", "code discount_value");

    sendResponse(res, true, { orders, total, page, pages: Math.ceil(total / limit) });
  } catch (err) {
    sendResponse(res, false, null, err.message);
  }
};

// Get order by ID
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("user_id", "name email")
      .populate("coupon_id", "code discount_value");

    if (!order) return sendResponse(res, false, null, "Order not found");

    const items = await OrderItem.find({ order_id: order._id })
      .populate("product_id", "name price")
      .populate("variant_id", "color size");

    sendResponse(res, true, { order, items }, "Order retrieved successfully");
  } catch (err) {
    sendResponse(res, false, null, err.message);
  }
};

// Create order
const createOrder = async (req, res) => {
  try {
    const { user_id, total_price, status, coupon_id, items } = req.body;

    const order = new Order({ user_id, total_price, status, coupon_id });
    const savedOrder = await order.save();

    // Save order items
    const orderItems = items.map(i => ({
      ...i,
      order_id: savedOrder._id,
    }));
    await OrderItem.insertMany(orderItems);

    sendResponse(res, true, savedOrder, "Order created successfully");
  } catch (err) {
    sendResponse(res, false, null, err.message);
  }
};

// Update order
const updateOrder = async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedOrder) return sendResponse(res, false, null, "Order not found");
    sendResponse(res, true, updatedOrder, "Order updated successfully");
  } catch (err) {
    sendResponse(res, false, null, err.message);
  }
};

// Delete order
const deleteOrder = async (req, res) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id);
    if (!deletedOrder) return sendResponse(res, false, null, "Order not found");

    // Delete order items
    await OrderItem.deleteMany({ order_id: deletedOrder._id });

    sendResponse(res, true, null, "Order deleted successfully");
  } catch (err) {
    sendResponse(res, false, null, err.message);
  }
};

// Bulk delete orders
const bulkDeleteOrders = async (req, res) => {
  try {
    const { ids } = req.body;
    if (!ids || !ids.length) return sendResponse(res, false, null, "No IDs provided");

    const result = await Order.deleteMany({ _id: { $in: ids } });
    await OrderItem.deleteMany({ order_id: { $in: ids } });

    sendResponse(res, true, { deletedCount: result.deletedCount }, "Orders deleted successfully");
  } catch (err) {
    sendResponse(res, false, null, err.message);
  }
};

module.exports = {
  getOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
  bulkDeleteOrders,
};
