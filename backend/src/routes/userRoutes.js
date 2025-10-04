const express = require("express");
const router = express.Router();
const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  bulkDeleteUsers,
  updateOwnProfile,
  getOwnProfile,
  deleteOwnProfile,
} = require("../controllers/userController");
const { authMiddleware, authorizeRoles, authorizeMinRole, checkStoreOwnership } = require("../middlewares/authMiddleware");
const upload = require("../middlewares/upload");


router.use(authMiddleware);

// Own profile
router.get("/me", getOwnProfile);
router.put("/me", upload.fields([
    { name: "profile_picture", maxCount: 1 },
    { name: "logo", maxCount: 1 },
    { name: "banner", maxCount: 1 },
  ]), updateOwnProfile);
router.delete("/me", deleteOwnProfile);

// Super Admin: manage all users
router.get("/", authorizeMinRole("store_owner"), getUsers);
router.get("/:id", authorizeMinRole("store_owner"), getUserById);
router.post(
  "/",
  authorizeMinRole("store_owner"),
  upload.fields([
    { name: "profile_picture", maxCount: 1 },
    { name: "logo", maxCount: 1 },
    { name: "banner", maxCount: 1 },
  ]),
  createUser
);

router.put(
  "/:id",
  authorizeMinRole("store_owner"),
   upload.fields([
    { name: "profile_picture", maxCount: 1 },
    { name: "logo", maxCount: 1 },
    { name: "banner", maxCount: 1 },
  ]),
  updateUser
);
router.delete("/:id", authorizeMinRole("store_owner"), deleteUser);
router.post("/bulk-delete", authorizeMinRole("store_owner"), bulkDeleteUsers);

module.exports = router;
