const express = require("express");
const router = express.Router();
const { authMiddleware, authorizeMinRole } = require("../middlewares/authMiddleware");
const {
  getStores,
  getStoreById,
  createStore,
  updateStore,
  deleteStore,
  bulkDeleteStores,
} = require("../controllers/storeController");

router.use(authMiddleware);

// Public route: get all stores
router.get("/",authorizeMinRole("super_admin"), getStores);
router.get("/:id", authorizeMinRole("super_admin"), getStoreById);
router.post("/", authorizeMinRole("super_admin"), createStore);
router.put("/:id", authorizeMinRole("super_admin"), updateStore);
router.delete("/:id", authorizeMinRole("super_admin"), deleteStore);
router.post("/bulk-delete", authorizeMinRole("super_admin"), bulkDeleteStores);

module.exports = router;
