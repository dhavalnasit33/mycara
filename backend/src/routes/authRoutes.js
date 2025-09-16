const express = require("express");
const router = express.Router();
const { login, registerUser, registerAdmin } = require("../controllers/authController");
const { authorizeMinRole, authMiddleware } = require("../middlewares/authMiddleware");

router.post("/login", login);
router.post("/register", registerUser);
router.post("/admin-register", registerAdmin);
module.exports = router;
