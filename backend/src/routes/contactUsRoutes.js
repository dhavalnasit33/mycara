const express = require("express");
const router = express.Router();
const {
  getContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
  bulkDeleteContacts,
} = require("../controllers/contactUsController");

const { authMiddleware, authorizeMinRole } = require("../middlewares/authMiddleware");

router.get("/", authMiddleware, authorizeMinRole("admin"), getContacts);
router.get("/:id", authMiddleware, authorizeMinRole("admin"), getContactById);
router.post("/", createContact); 
router.put("/:id", authMiddleware, authorizeMinRole("admin"), updateContact);
router.delete("/:id", authMiddleware, authorizeMinRole("admin"), deleteContact);
router.post("/bulk-delete", authMiddleware, authorizeMinRole("admin"), bulkDeleteContacts);

module.exports = router;
