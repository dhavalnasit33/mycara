const mongoose = require("mongoose");

const settingSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    site_name: { type: String, required: true },
    logo_url: { type: String },
    primary_color: { type: String },
    favicon_url: { type: String }, 
    secondary_color: { type: String },
    button_color: { type: String },
    footer_text: { type: String },
    meta_title: { type: String },
    meta_description: { type: String },
  },
  { timestamps: true } 
);

module.exports = mongoose.model("Setting", settingSchema);
