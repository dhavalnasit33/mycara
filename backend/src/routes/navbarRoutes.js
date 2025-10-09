const express = require("express");
const router = express.Router();
const {
  getNavbars,
  getNavbarById,
  createNavbar,
  updateNavbar,
  deleteNavbar,
  bulkDeleteNavbars,
  updateNavbarStatus,
} = require("../controllers/navbarController");

const { authMiddleware, authorizeMinRole } = require("../middlewares/authMiddleware");

router.get("/", getNavbars);
router.use(authMiddleware);
router.get("/:id", authorizeMinRole("admin"), getNavbarById);
router.post("/", authorizeMinRole("admin"), createNavbar);
router.put("/:id", authorizeMinRole("admin"), updateNavbar);
router.put("/:id/status", authorizeMinRole("admin"), updateNavbarStatus);
router.delete("/:id", authorizeMinRole("admin"), deleteNavbar);
router.post("/bulk-delete", authorizeMinRole("admin"), bulkDeleteNavbars);

module.exports = router;
