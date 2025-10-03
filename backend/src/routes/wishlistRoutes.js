const express = require("express");
const router = express.Router();
const {
  addItemToWishlist,
  removeItemFromWishlist,
  getWishlistByUser,
  deleteWishlist,
  getWishlist,
  bulkDeleteWishlistItems
} = require("../controllers/wishlistController");

const { authMiddleware, authorizeMinRole } = require("../middlewares/authMiddleware");

router.use(authMiddleware);
router.get("/", authorizeMinRole("admin"),getWishlist);
router.post("/items", addItemToWishlist); 
router.delete("/items",authorizeMinRole("admin"), removeItemFromWishlist); 
router.get("/user/:user_id",authorizeMinRole("admin"), getWishlistByUser); 
router.delete("/:id",authorizeMinRole("admin"), deleteWishlist); 
router.post("/bulk-delete",authorizeMinRole("admin"), bulkDeleteWishlistItems); 

module.exports = router;
