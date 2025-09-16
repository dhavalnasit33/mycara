const express = require("express");
const router = express.Router();
const {
  getFabrics,
  getFabricById,
  createFabric,
  updateFabric,
  deleteFabric,
  bulkDeleteFabrics,
} = require("../controllers/fabricController");

const { authMiddleware, authorizeMinRole } = require("../middlewares/authMiddleware");

router.get("/", getFabrics);

router.use(authMiddleware);
router.get("/:id", authorizeMinRole("admin"), getFabricById);
router.post("/", authorizeMinRole("admin"), createFabric);
router.put("/:id", authorizeMinRole("admin"), updateFabric);
router.delete("/:id", authorizeMinRole("admin"), deleteFabric);
router.post("/bulk-delete", authorizeMinRole("admin"), bulkDeleteFabrics);

module.exports = router;
