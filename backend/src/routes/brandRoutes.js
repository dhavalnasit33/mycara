const express = require("express");
const router = express.Router();

const {
  getBrands,
  getBrandById,
  createBrand,
  updateBrand,
  deleteBrand,
  bulkDeleteBrands,
} = require("../controllers/brandController");

const { authMiddleware, authorizeMinRole } = require("../middlewares/authMiddleware");

router.get("/", getBrands);

router.use(authMiddleware);

// Admin-only routes
router.get("/:id", authorizeMinRole("admin"), getBrandById);
router.post("/", authorizeMinRole("admin"), createBrand);
router.put("/:id", authorizeMinRole("admin"), updateBrand);
router.delete("/:id", authorizeMinRole("admin"), deleteBrand);
router.post("/bulk-delete", authorizeMinRole("admin"), bulkDeleteBrands);

module.exports = router;
