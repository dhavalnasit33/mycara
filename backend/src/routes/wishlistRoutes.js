const express = require("express");
const router = express.Router();
const {
  createWishlist,
  addItemToWishlist,
  removeItemFromWishlist,
  getWishlistByUser,
  deleteWishlist
} = require("../controllers/wishlistController");

const { authMiddleware } = require("../middlewares/authMiddleware");

router.use(authMiddleware);

router.post("/", createWishlist); 
router.post("/items", addItemToWishlist); 
router.delete("/items", removeItemFromWishlist); 
router.get("/user/:user_id", getWishlistByUser); 
router.delete("/:id", deleteWishlist); 

module.exports = router;
