const express = require("express");
const router = express.Router();
const {
  getTypes,
  getTypeById,
  createType,
  updateType,
  deleteType,
  bulkDeleteTypes,
} = require("../controllers/typeController");

const { authMiddleware, authorizeMinRole } = require("../middlewares/authMiddleware");

router.get("/", getTypes);

router.use(authMiddleware);
router.get("/:id", authorizeMinRole("admin"), getTypeById);
router.post("/", authorizeMinRole("admin"), createType);
router.put("/:id", authorizeMinRole("admin"), updateType);
router.delete("/:id", authorizeMinRole("admin"), deleteType);
router.post("/bulk-delete", authorizeMinRole("admin"), bulkDeleteTypes);

module.exports = router;
