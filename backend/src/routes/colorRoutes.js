const express = require("express");
const router = express.Router();

const {
  getColors,
  getColorById,
  createColor,
  updateColor,
  deleteColor,
  bulkDeleteColors,
} = require("../controllers/colorController");

const { authMiddleware, authorizeMinRole } = require("../middlewares/authMiddleware");

router.get("/", getColors);

router.use(authMiddleware); // Admin only below

router.get("/:id", authorizeMinRole("admin"), getColorById);
router.post("/", authorizeMinRole("admin"), createColor);
router.put("/:id", authorizeMinRole("admin"), updateColor);
router.delete("/:id", authorizeMinRole("admin"), deleteColor);
router.post("/bulk-delete", authorizeMinRole("admin"), bulkDeleteColors);

module.exports = router;
