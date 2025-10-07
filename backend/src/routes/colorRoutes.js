const express = require("express");
const router = express.Router();

const {
  getColors,
  getColorById,
  createColor,
  updateColor,
  deleteColor,
  bulkDeleteColors,
  updateColorStatus,
} = require("../controllers/colorController");

const { authMiddleware, authorizeMinRole } = require("../middlewares/authMiddleware");

router.get("/", getColors);

router.use(authMiddleware); // Admin only below

router.get("/:id", authorizeMinRole("admin"), getColorById);
router.post("/", authorizeMinRole("admin"), createColor);
router.put("/:id", authorizeMinRole("admin"), updateColor);
router.put("/:id/status", authorizeMinRole("admin"), updateColorStatus);
router.delete("/:id", authorizeMinRole("admin"), deleteColor);
router.post("/bulk-delete", authorizeMinRole("admin"), bulkDeleteColors);

module.exports = router;
