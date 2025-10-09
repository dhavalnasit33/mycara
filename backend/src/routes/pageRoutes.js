const express = require("express");
const router = express.Router();

const { authMiddleware, authorizeMinRole } = require("../middlewares/authMiddleware");
const { getPages, getPageById, createPage, updatePage, updatePageStatus, deletePage, bulkDeletePages } = require("../controllers/pageController");

router.get("/", getPages);
router.get("/:id", getPageById);
router.use(authMiddleware);

router.post("/", authorizeMinRole("admin"), createPage);
router.put("/:id", authorizeMinRole("admin"), updatePage);
router.put("/:id/status", authorizeMinRole("admin"), updatePageStatus);
router.delete("/:id", authorizeMinRole("admin"), deletePage);
router.post("/bulk-delete", authorizeMinRole("admin"), bulkDeletePages);

module.exports = router;
