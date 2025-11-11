const mongoose = require("mongoose");

// Define a reusable sub-schema for flexible social links
const socialLinkSchema = new mongoose.Schema(
  {
    platform: { type: String, required: true }, // e.g. "Facebook", "Instagram"
    url: { type: String, required: true }       // e.g. "https://facebook.com/fashionaura"
  },
  { _id: false }
);

const settingSchema = new mongoose.Schema(
  {
    // Reference to admin or user who manages the settings
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    // Branding & Appearance
    site_name: { type: String, required: true },
    logo_url: { type: String },
    favicon_url: { type: String },
    primary_color: { type: String },
    secondary_color: { type: String },
    button_color: { type: String },
    font_family: { type: String },

    // SEO Settings
    meta_title: { type: String },
    meta_description: { type: String },
    meta_keyphrase: { type: String },
    seo_image: { type: String }, // for sharing previews (OpenGraph, etc.)

    // Footer
    footer_text: { type: String },
    copyright_text: { type: String },

    // Contact info
    contact_email: { type: String },
    contact_phone: { type: String },
    contact_address: {
      street: { type: String },
      city: { type: String },
      state: { type: String },
      country: { type: String },
      postal_code: { type: String }
    },

    // Flexible social links (array of objects)
    social_links: [socialLinkSchema],

    // Optional custom code areas
    custom_css: { type: String },
    custom_js: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Setting", settingSchema);
