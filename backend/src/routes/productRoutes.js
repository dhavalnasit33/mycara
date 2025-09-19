const express = require("express");
const router = express.Router();
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  bulkDeleteProducts,
} = require("../controllers/productController");

const { authMiddleware, authorizeMinRole } = require("../middlewares/authMiddleware");

router.use(authMiddleware);

router.get("/", getProducts);
router.get("/:id", getProductById);
router.post("/", authorizeMinRole("admin"), createProduct);
router.put("/:id", authorizeMinRole("admin"), updateProduct);
router.delete("/:id", authorizeMinRole("admin"), deleteProduct);
router.post("/bulk-delete", authorizeMinRole("admin"), bulkDeleteProducts);

module.exports = router;
