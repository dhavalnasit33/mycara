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
  updateUserStatus,
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
router.get("/", authorizeMinRole("admin"), getUsers);
router.get("/:id", authorizeMinRole("admin"), getUserById);
router.post(
  "/",
  authorizeMinRole("admin"),
  upload.fields([
    { name: "profile_picture", maxCount: 1 },
    { name: "logo", maxCount: 1 },
    { name: "banner", maxCount: 1 },
  ]),
  createUser
);

router.put(
  "/:id",
  authorizeMinRole("admin"),
   upload.fields([
    { name: "profile_picture", maxCount: 1 },
    { name: "logo", maxCount: 1 },
    { name: "banner", maxCount: 1 },
  ]),
  updateUser
);
router.put("/:id/status", authorizeMinRole("admin"), updateUserStatus);
router.delete("/:id", authorizeMinRole("admin"), deleteUser);
router.post("/bulk-delete", authorizeMinRole("admin"), bulkDeleteUsers);

module.exports = router;
