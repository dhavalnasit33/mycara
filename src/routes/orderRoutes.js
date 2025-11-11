const express = require("express");
const router = express.Router();
const {
  getOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
  bulkDeleteOrders,
  updateOrderStatus,
} = require("../controllers/orderController");

const { authMiddleware, authorizeMinRole } = require("../middlewares/authMiddleware");

router.use(authMiddleware);

router.get("/",authorizeMinRole("admin"), getOrders);
router.get("/:id", authorizeMinRole("admin"), getOrderById);
router.post("/", createOrder);
router.put("/:id", authorizeMinRole("admin"), updateOrder);
router.put("/:id/status", authorizeMinRole("admin"), updateOrderStatus);
router.delete("/:id", authorizeMinRole("admin"), deleteOrder);
router.post("/bulk-delete", authorizeMinRole("admin"), bulkDeleteOrders);

module.exports = router;
