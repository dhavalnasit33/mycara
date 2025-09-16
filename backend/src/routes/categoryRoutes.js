const express = require("express");
const router = express.Router();
const {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
  bulkDeleteCategories,
} = require("../controllers/categoryController");

const { authMiddleware, authorizeMinRole } = require("../middlewares/authMiddleware");

router.get("/", getCategories);
router.use(authMiddleware);
router.get("/:id", authorizeMinRole("admin"), getCategoryById);
router.post("/", authorizeMinRole("admin"), createCategory);
router.put("/:id", authorizeMinRole("admin"), updateCategory);
router.delete("/:id", authorizeMinRole("admin"), deleteCategory);
router.post("/bulk-delete", authorizeMinRole("admin"), bulkDeleteCategories);

module.exports = router;
