const express = require("express");
const router = express.Router();
const {
  getDiscounts,
  getDiscountById,
  createDiscount,
  updateDiscount,
  deleteDiscount,
  bulkDeleteDiscounts,
} = require("../controllers/discountController");

const { authMiddleware, authorizeMinRole } = require("../middlewares/authMiddleware");

router.get("/", getDiscounts);
router.use(authMiddleware);
router.get("/:id", authorizeMinRole("admin"), getDiscountById);
router.post("/", authorizeMinRole("admin"), createDiscount);
router.put("/:id", authorizeMinRole("admin"), updateDiscount);
router.delete("/:id", authorizeMinRole("admin"), deleteDiscount);
router.post("/bulk-delete", authorizeMinRole("admin"), bulkDeleteDiscounts);

module.exports = router;
