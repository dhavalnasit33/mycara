const express = require("express");
const router = express.Router();
const {
  getCarts,
  getCartById,
  createCart,
  addCartItem,
  updateCartItem,
  deleteCartItem,
  deleteCart,
  bulkDeleteCartItems,
} = require("../controllers/cartController");

const { authMiddleware, authorizeMinRole } = require("../middlewares/authMiddleware");

router.use(authMiddleware);

router.get("/", authorizeMinRole("admin"),getCarts);
router.get("/:id", getCartById);
router.post("/", createCart);
router.post("/items", addCartItem);
router.put("/items", updateCartItem);
router.delete("/items", deleteCartItem);
router.delete("/:id", deleteCart);
router.post("/bulk-delete",authorizeMinRole("admin"), bulkDeleteCartItems); 


module.exports = router;
