const express = require("express");
const router = express.Router();
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  bulkDeleteProducts,
  updateProductStatus,
} = require("../controllers/productController");

const { authMiddleware, authorizeMinRole } = require("../middlewares/authMiddleware");
const upload = require("../middlewares/upload");
router.get("/", getProducts);
router.use(authMiddleware);


router.get("/:id", getProductById);
router.post("/", authorizeMinRole("admin"),upload.single("image"), createProduct);
router.put("/:id/status",authorizeMinRole("admin"), updateProductStatus);
router.put("/:id", authorizeMinRole("admin"),upload.single("image"), updateProduct);
router.delete("/:id", authorizeMinRole("admin"), deleteProduct);
router.post("/bulk-delete", authorizeMinRole("admin"), bulkDeleteProducts);

module.exports = router;
