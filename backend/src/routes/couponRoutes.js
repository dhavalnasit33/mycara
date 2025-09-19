const express = require("express");
const router = express.Router();
const {
  getCoupons,
  getCouponById,
  createCoupon,
  updateCoupon,
  deleteCoupon,
  bulkDeleteCoupons,
} = require("../controllers/couponController");

const { authMiddleware, authorizeMinRole } = require("../middlewares/authMiddleware");

router.use(authMiddleware);

router.get("/", getCoupons);                               
router.get("/:id", authorizeMinRole("admin"), getCouponById); 
router.post("/", authorizeMinRole("admin"), createCoupon); 
router.put("/:id", authorizeMinRole("admin"), updateCoupon); 
router.delete("/:id", authorizeMinRole("admin"), deleteCoupon);
router.post("/bulk-delete", authorizeMinRole("admin"), bulkDeleteCoupons);

module.exports = router;
