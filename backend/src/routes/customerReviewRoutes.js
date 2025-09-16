const express = require("express");
const router = express.Router();
const {
  getReviews,
  getReviewById,
  createReview,
  updateReview,
  deleteReview,
  bulkDeleteReviews,
} = require("../controllers/customerReviewController");

const { authMiddleware, authorizeMinRole } = require("../middlewares/authMiddleware");

router.get("/", authMiddleware, authorizeMinRole("admin"), getReviews);
router.get("/:id", authMiddleware, authorizeMinRole("admin"), getReviewById);
router.post("/", authMiddleware, createReview); 
router.put("/:id", authMiddleware, authorizeMinRole("admin"), updateReview);
router.delete("/:id", authMiddleware, authorizeMinRole("admin"), deleteReview);
router.post("/bulk-delete", authMiddleware, authorizeMinRole("admin"), bulkDeleteReviews);

module.exports = router;
