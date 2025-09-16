const express = require("express");
const router = express.Router();
const {
  getProductLabels,
  getProductLabelById,
  createProductLabel,
  updateProductLabel,
  deleteProductLabel,
  bulkDeleteProductLabels,
} = require("../controllers/productLabelController");

const { authMiddleware, authorizeMinRole } = require("../middlewares/authMiddleware");

router.get("/", getProductLabels);
router.use(authMiddleware);
router.get("/:id", authorizeMinRole("admin"), getProductLabelById);
router.post("/", authorizeMinRole("admin"), createProductLabel);
router.put("/:id", authorizeMinRole("admin"), updateProductLabel);
router.delete("/:id", authorizeMinRole("admin"), deleteProductLabel);
router.post("/bulk-delete", authorizeMinRole("admin"), bulkDeleteProductLabels);

module.exports = router;
