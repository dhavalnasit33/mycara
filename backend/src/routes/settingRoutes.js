const express = require("express");
const router = express.Router();
const {
  getSettings,
  getSettingById,
  createSetting,
  updateSetting,
  deleteSetting,
  bulkDeleteSettings,
} = require("../controllers/settingController");
const { authMiddleware,authorizeMinRole } = require("../middlewares/authMiddleware");

router.use(authMiddleware);


router.get("/", getSettings);                
router.get("/:id", authorizeMinRole("admin"), getSettingById);          
router.post("/", authorizeMinRole("admin"), createSetting); 
router.put("/:id", authorizeMinRole("admin"), updateSetting); 
router.delete("/:id", authorizeMinRole("admin"), deleteSetting); 
router.post("/bulk-delete", authorizeMinRole("admin"), bulkDeleteSettings); 

module.exports = router;
