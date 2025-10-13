const Product = require("../models/Product");
const Order = require("../models/Order");
const OrderItem = require("../models/OrderItem");
const Payment = require("../models/Payment");
const User = require("../models/User");
const Coupon = require("../models/Coupon");
const { sendResponse } = require("../utils/response");

const getDashboard = async (req, res) => {
  try {

     const now = new Date();
    // 🔹 Total Products
    const totalProducts = await Product.countDocuments({ status: "active" });

    // 🔹 Total Orders
    const totalOrders = await Order.countDocuments();

    // 🔹 Total Users
    const totalUsers = await User.countDocuments({ is_active: true,role:"store_user" });

    // 🔹 Total Revenue (sum of completed payments)
    const revenueAgg = await Payment.aggregate([
      { $match: { status: "completed" } },
      { $group: { _id: null, totalRevenue: { $sum: "$amount_paid" } } },
    ]);
    const totalRevenue = revenueAgg[0]?.totalRevenue || 0;

    // 🔹 Active Coupons
   const activeCoupons = await Coupon.countDocuments({
      status: "active",
      $and: [
        { $or: [{ start_date: { $lte: now } }, { start_date: null }] },
        { $or: [{ end_date: { $gte: now } }, { end_date: null }] },
      ],
    });


    // 🔹 Sales Overview (last 30 days revenue per day)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const salesOverview = await Payment.aggregate([
      { $match: { status: "completed", payment_date: { $gte: thirtyDaysAgo } } },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$payment_date" } },
          revenue: { $sum: "$amount_paid" },
          orders: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    // 🔹 Orders by Status
    const ordersByStatus = await Order.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]);

    // 🔹 Top Selling Products
    const topSellingProducts = await OrderItem.aggregate([
      { 
        $group: { 
          _id: "$product_id", 
          quantity: { $sum: "$quantity" } 
        } 
      },
      { $sort: { quantity: -1 } },
      { $limit: 5 },
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "_id",
          as: "product",
        },
      },
      { $unwind: "$product" },
      { $project: { _id: 0, name: "$product.name", quantity: 1 } },
    ]);

    // 🔹 Recent Orders (populate items)
    const recentOrdersRaw = await Order.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("user_id", "name email");

    // Populate order items for recent orders
    const recentOrders = await Promise.all(
      recentOrdersRaw.map(async (order) => {
        const items = await OrderItem.find({ order_id: order._id })
          .populate("product_id", "name")
          .populate("variant_id", "sku price");
        return {
          ...order.toObject(),
          items,
        };
      })
    );

    return sendResponse(res, true, {
      totalProducts,
      totalOrders,
      totalUsers,
      totalRevenue,
      activeCoupons,
      salesOverview,
      ordersByStatus,
      topSellingProducts,
      recentOrders,
    }, "Dashboard data retrieved successfully");

  } catch (error) {
    console.error(error);
    return sendResponse(res, false, null, error.message);
  }
};

module.exports = {
  getDashboard,
};
