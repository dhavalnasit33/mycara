const express = require("express");
const router = express.Router();

const {
  getSizes,
  getSizeById,
  createSize,
  updateSize,
  deleteSize,
  bulkDeleteSizes,
  updateSizeStatus,
} = require("../controllers/sizeController");

const { authMiddleware, authorizeMinRole } = require("../middlewares/authMiddleware");

router.get("/", getSizes);

router.use(authMiddleware); // Admin only below

router.get("/:id", authorizeMinRole("admin"), getSizeById);
router.post("/", authorizeMinRole("admin"), createSize);
router.put("/:id", authorizeMinRole("admin"), updateSize);
router.put("/:id/status", authorizeMinRole("admin"), updateSizeStatus);
router.delete("/:id", authorizeMinRole("admin"), deleteSize);
router.post("/bulk-delete", authorizeMinRole("admin"), bulkDeleteSizes);

module.exports = router;
