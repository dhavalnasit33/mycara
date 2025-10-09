const express = require("express");
const router = express.Router();
const {
  getSections,
  getSectionById,
  createSection,
  updateSection,
  deleteSection,
  bulkDeleteSections,
  updateSectionStatus,
} = require("../controllers/sectionController");

const { authMiddleware, authorizeMinRole } = require("../middlewares/authMiddleware");

router.get("/", getSections);
router.use(authMiddleware);
router.get("/:id", authorizeMinRole("admin"), getSectionById);
router.post("/", authorizeMinRole("admin"), createSection);
router.put("/:id", authorizeMinRole("admin"), updateSection);
router.put("/:id/status", authorizeMinRole("admin"), updateSectionStatus);
router.delete("/:id", authorizeMinRole("admin"), deleteSection);
router.post("/bulk-delete", authorizeMinRole("admin"), bulkDeleteSections);

module.exports = router;
