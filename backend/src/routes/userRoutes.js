const express = require("express");
const router = express.Router();
const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  bulkDeleteUsers,
} = require("../controllers/userController");
const { authMiddleware, authorizeRoles, authorizeMinRole } = require("../middlewares/authMiddleware");

// Protect all routes with authentication
router.use(authMiddleware);

// Routes
router.get("/",authorizeMinRole("admin"), getUsers);                        
router.get("/:id", authorizeMinRole("admin"), getUserById);                
router.post("/", authorizeMinRole("admin"),createUser);   
router.put("/:id", authorizeMinRole("admin"), updateUser); 
router.delete("/:id", authorizeMinRole("admin"), deleteUser); 
router.post("/bulk-delete", authorizeMinRole("admin"), bulkDeleteUsers); 

module.exports = router;
