//D:\mycara\backend\src\routes\upload.js

const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload");

router.post("/image", upload.single("image"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    // Return the uploaded file path
    res.json({
      success: true,
      data: {
        image_url: `/uploads/${req.file.filename}`,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
