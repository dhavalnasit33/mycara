const express = require("express");
const router = express.Router();
const {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
  bulkDeleteCategories,
  getAllCategories,
} = require("../controllers/categoryController");

const { authMiddleware, authorizeMinRole } = require("../middlewares/authMiddleware");
const upload = require("../middlewares/upload");

router.get("/", getCategories);
router.use(authMiddleware);
router.get("/all", getAllCategories);
router.get("/:id", authorizeMinRole("admin"), getCategoryById);
router.post("/", authorizeMinRole("admin"), upload.single("image"), createCategory);
router.put("/:id", authorizeMinRole("admin"),upload.single("image"),  updateCategory);
router.delete("/:id", authorizeMinRole("admin"), deleteCategory);
router.post("/bulk-delete", authorizeMinRole("admin"), bulkDeleteCategories);

module.exports = router;
