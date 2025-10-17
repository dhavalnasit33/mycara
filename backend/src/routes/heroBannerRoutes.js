//D:\mycara\backend\src\routes\heroBannerRoutes.js
const express = require("express");
const router = express.Router();
const { getActiveHeroBanner } = require("../controllers/heroBannerController");

// GET active banner
router.get("/active", getActiveHeroBanner);

module.exports = router;
