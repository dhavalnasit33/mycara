const express = require("express");
const router = express.Router();
const {
  getPayments,
  getPaymentById,
  createPayment,
  updatePayment,
  deletePayment,
  bulkDeletePayments,
} = require("../controllers/paymentController");

const { authMiddleware, authorizeMinRole } = require("../middlewares/authMiddleware");

router.use(authMiddleware);

router.get("/", getPayments);
router.get("/:id", authorizeMinRole("admin"), getPaymentById);
router.post("/", authorizeMinRole("admin"), createPayment);
router.put("/:id", authorizeMinRole("admin"), updatePayment);
router.delete("/:id", authorizeMinRole("admin"), deletePayment);
router.post("/bulk-delete", authorizeMinRole("admin"), bulkDeletePayments);

module.exports = router;
