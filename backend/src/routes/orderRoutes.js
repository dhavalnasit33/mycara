const express = require("express");
const router = express.Router();
const {
  getOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
  bulkDeleteOrders,
} = require("../controllers/orderController");

const { authMiddleware, authorizeMinRole } = require("../middlewares/authMiddleware");

router.use(authMiddleware);

router.get("/", getOrders);
router.get("/:id", authorizeMinRole("admin"), getOrderById);
router.post("/", authorizeMinRole("admin"), createOrder);
router.put("/:id", authorizeMinRole("admin"), updateOrder);
router.delete("/:id", authorizeMinRole("admin"), deleteOrder);
router.post("/bulk-delete", authorizeMinRole("admin"), bulkDeleteOrders);

module.exports = router;
