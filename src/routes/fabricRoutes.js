const express = require("express");
const router = express.Router();
const {
  getFabrics,
  getFabricById,
  createFabric,
  updateFabric,
  deleteFabric,
  bulkDeleteFabrics,
  updateFabricStatus,
} = require("../controllers/fabricController");

const { authMiddleware, authorizeMinRole } = require("../middlewares/authMiddleware");
const upload = require("../middlewares/upload");

router.get("/", getFabrics);

router.use(authMiddleware);
router.get("/:id", authorizeMinRole("admin"), getFabricById);
router.post("/", authorizeMinRole("admin"),upload.single("image"), createFabric);
router.put("/:id", authorizeMinRole("admin"),upload.single("image"), updateFabric);
router.put("/:id/status", authorizeMinRole("admin"), updateFabricStatus);
router.delete("/:id", authorizeMinRole("admin"), deleteFabric);
router.post("/bulk-delete", authorizeMinRole("admin"), bulkDeleteFabrics);

module.exports = router;
