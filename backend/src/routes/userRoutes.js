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
} = require("../controllers/userController");
const { authMiddleware, authorizeRoles, authorizeMinRole } = require("../middlewares/authMiddleware");
const upload = require("../middlewares/upload");

// Protect all routes with authentication
router.use(authMiddleware);

// Routes
router.get("/",authorizeMinRole("admin"), getUsers); 
router.get("/me", getOwnProfile);                       
router.get("/:id", authorizeMinRole("admin"), getUserById);

router.put("/me", upload.single("image"),updateOwnProfile);                
router.post("/", authorizeMinRole("admin"),upload.single("image"),createUser);   
router.put("/:id", authorizeMinRole("admin"), updateUser); 
router.delete("/:id", authorizeMinRole("admin"), deleteUser); 
router.post("/bulk-delete", authorizeMinRole("admin"), bulkDeleteUsers); 

module.exports = router;
