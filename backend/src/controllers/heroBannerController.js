// D:\mycara\backend\src\controllers\heroBannerController.js
const HeroBanner = require("../models/HeroBanner");

// ✅ Get active HeroBanner
exports.getActiveHeroBanner = async (req, res) => {
  try {
    const banner = await HeroBanner.findOne({ active: true }); // Fetch only active banner
    if (!banner) {
      return res.status(404).json({ success: false, message: "No active hero banner found" });
    }
    res.json({ success: true, data: { heroBanner: banner } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message || "Server error" });
  }
};
