// D:\mycara\backend\src\models\HeroBanner.js
const mongoose = require("mongoose");

const heroBannerSchema = new mongoose.Schema({
  heading: { type: String, required: true },
  description: { type: String, required: true },
  priceText: { type: String },
  discountText: { type: String },
  heroImage: { type: String },
  buttonText: { type: String },
  active: { type: Boolean, default: false },
});

module.exports = mongoose.model("HeroBanner", heroBannerSchema);
