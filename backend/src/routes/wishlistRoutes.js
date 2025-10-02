const express = require("express");
const router = express.Router();
const {
  createWishlist,
  addItemToWishlist,
  removeItemFromWishlist,
  getWishlistByUser,
  deleteWishlist
} = require("../controllers/wishlistController");

const { authMiddleware, authorizeMinRole } = require("../middlewares/authMiddleware");

router.use(authMiddleware);

router.post("/",authorizeMinRole("admin"), createWishlist); 
router.post("/items",authorizeMinRole("admin"), addItemToWishlist); 
router.delete("/items",authorizeMinRole("admin"), removeItemFromWishlist); 
router.get("/user/:user_id",authorizeMinRole("admin"), getWishlistByUser); 
router.delete("/:id",authorizeMinRole("admin"), deleteWishlist); 

module.exports = router;
