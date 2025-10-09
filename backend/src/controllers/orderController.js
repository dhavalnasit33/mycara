const Discount = require("../models/Discount");
const Order = require("../models/Order");
const OrderItem = require("../models/OrderItem");
const ProductVariant = require("../models/ProductVariant");
const { sendResponse } = require("../utils/response");

// Get all orders with pagination & search / optional download
const getOrders = async (req, res) => {
  try {
    let {
      page = 1,
      limit = 10,
      search = "",
      isDownload = "false",
      status,
    } = req.query;
    const download = isDownload.toLowerCase() === "true";

    const query = {};
    if (search) query.status = { $regex: search, $options: "i" };

    if (status && ["active", "inactive"].includes(status))
      query.status = status;

    const populateOrder = [
      { path: "user_id", select: "name email" },
      { path: "coupon_id", select: "code discount_value" },
    ];

    const populateOrderItems = [
      { path: "product_id", select: "name price" },
      {
        path: "variant_id",
        populate: [
          { path: "color_id", select: "name hexCode" },
          { path: "size_id", select: "name" },
        ],
      },
    ];

    if (download) {
      // Fetch all orders
      const orders = await Order.find(query)
        .sort({ createdAt: -1 })
        .populate(populateOrder);

      // Fetch items for each order with variant details
      const ordersWithItems = await Promise.all(
        orders.map(async (order) => {
          const items = await OrderItem.find({ order_id: order._id }).populate(
            populateOrderItems
          );
          return { ...order.toObject(), items };
        })
      );

      return sendResponse(
        res,
        true,
        { orders: ordersWithItems },
        "All orders retrieved for download"
      );
    }

    page = parseInt(page);
    limit = parseInt(limit);

    const total = await Order.countDocuments(query);

    const orders = await Order.find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 })
      .populate(populateOrder);

    // Fetch items for each order with variant details
    const ordersWithItems = await Promise.all(
      orders.map(async (order) => {
        const items = await OrderItem.find({ order_id: order._id }).populate(
          populateOrderItems
        );
        return { ...order.toObject(), items };
      })
    );

    sendResponse(res, true, {
      orders: ordersWithItems,
      total,
      page,
      pages: Math.ceil(total / limit),
    });
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

// Helper function to check if discount is valid
const isDiscountValid = (discount) => {
  const now = new Date();
  return (
    discount &&
    discount.status === "active" &&
    discount.start_date <= now &&
    discount.end_date >= now
  );
};

// CREATE ORDER
const createOrder = async (req, res) => {
  try {
    const { user_id, items, coupon_id } = req.body;

    if (!items || !items.length) {
      return sendResponse(res, false, null, "No items provided");
    }

    let total_price = 0;
    const orderItems = [];

    for (const item of items) {
      const variant = await ProductVariant.findById(item.variant_id).populate(
        "product_id"
      );
      if (!variant) {
        return sendResponse(res, false, null, "Variant not found");
      }

      if (variant.stock_quantity < item.quantity) {
        return sendResponse(
          res,
          false,
          null,
          `Not enough stock for ${variant.sku}`
        );
      }

      let price = variant.price;

      // Apply discount if exists
      const discount_id = variant.product_id.discount_id;
      if (discount_id) {
        const discount = await Discount.findById(discount_id);

        if (isDiscountValid(discount)) {
          if (discount.type === "percentage") {
            price = price - (price * discount.value) / 100;
          } else if (discount.type === "fixed") {
            price = price - discount.value;
          }
          if (price < 0) price = 0;
        } else {
          console.log(`Discount invalid or expired for ${variant.sku}`);
        }
      }

      total_price += price * item.quantity;

      // Deduct stock
      variant.stock_quantity -= item.quantity;

      await variant.save();

      orderItems.push({
        order_id: null, // will set after order is created
        product_id: variant.product_id._id,
        variant_id: variant._id,
        quantity: item.quantity,
        price_at_order: price,
      });
    }

    // Create order
    const order = new Order({
      user_id,
      total_price,
      coupon_id: coupon_id || null,
    });
    const savedOrder = await order.save();

    // Assign order_id to items and insert
    orderItems.forEach((oi) => (oi.order_id = savedOrder._id));
    await OrderItem.insertMany(orderItems);

    sendResponse(res, true, savedOrder, "Order created successfully");
  } catch (err) {
    console.error("Error creating order:", err);
    sendResponse(res, false, null, err.message);
  }
};

// UPDATE ORDER
const updateOrder = async (req, res) => {
  try {
    const { items, status, coupon_id } = req.body;
    const order = await Order.findById(req.params.id);
    if (!order) return sendResponse(res, false, null, "Order not found");

    // Restore stock from previous items
    const oldItems = await OrderItem.find({ order_id: order._id });
    for (const oldItem of oldItems) {
      const variant = await ProductVariant.findById(oldItem.variant_id);
      if (variant) {
        variant.stock_quantity += oldItem.quantity;
        await variant.save();
      }
    }

    // Delete old order items
    await OrderItem.deleteMany({ order_id: order._id });

    // Add new items & calculate total
    let total_price = 0;
    const newOrderItems = [];

    for (const item of items) {
      const variant = await ProductVariant.findById(item.variant_id).populate(
        "product_id"
      );
      if (!variant) return sendResponse(res, false, null, "Variant not found");
      if (variant.stock_quantity < item.quantity)
        return sendResponse(
          res,
          false,
          null,
          `Not enough stock for ${variant.sku}`
        );

      let price = variant.price;

      // Apply discount if exists
      const discount_id = variant.product_id.discount_id;
      if (discount_id) {
        const discount = await Discount.findById(discount_id);
        if (isDiscountValid(discount)) {
          if (discount.type === "percentage") {
            price = price - (price * discount.value) / 100;
          } else if (discount.type === "fixed") {
            price = price - discount.value;
          }
          if (price < 0) price = 0;
        }
      }

      total_price += price * item.quantity;

      // Deduct stock
      variant.stock_quantity -= item.quantity;
      await variant.save();

      newOrderItems.push({
        order_id: order._id,
        product_id: variant.product_id._id,
        variant_id: variant._id,
        quantity: item.quantity,
        price_at_order: price,
      });
    }

    await OrderItem.insertMany(newOrderItems);

    // Update order
    order.total_price = total_price;
    if (status) order.status = status;
    if (coupon_id) order.coupon_id = coupon_id;
    await order.save();

    sendResponse(res, true, order, "Order updated successfully");
  } catch (err) {
    console.error(err);
    sendResponse(res, false, null, err.message);
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const { id } = req.params;

    // Validate status value
    if (!["active", "inactive"].includes(status)) {
      return sendResponse(res, false, null, "Invalid status value");
    }

    const order = await Order.findByIdAndUpdate(id, { status }, { new: true });

    if (!order) {
      return sendResponse(res, false, null, "Order not found");
    }

    sendResponse(res, true, order, "Order status updated successfully");
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
    if (!ids || !ids.length)
      return sendResponse(res, false, null, "No IDs provided");

    const result = await Order.deleteMany({ _id: { $in: ids } });
    await OrderItem.deleteMany({ order_id: { $in: ids } });

    sendResponse(
      res,
      true,
      { deletedCount: result.deletedCount },
      "Orders deleted successfully"
    );
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
  updateOrderStatus,
};
