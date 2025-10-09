const mongoose = require("mongoose");

// Section Subschema (embedded inside Page)
const sectionSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    image_url: { type: String },
    background_image_url: { type: String },
    order: { type: Number, default: 1 },
    is_button: { type: Boolean, default: false },
    button_name: { type: String },
    button_link: { type: String },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
  },
  { timestamps: true }
);

// Auto-assign order if missing
sectionSchema.pre("save", function (next) {
  if (this.order == null) this.order = 1;
  next();
});

// Page Schema
const pageSchema = new mongoose.Schema(
  {
    // General page info
    page_name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    description: { type: String },

    // Sections (embedded array)
    sections: [sectionSchema],

    // SEO fields
    meta_title: { type: String },
    meta_description: { type: String },
    meta_keyphrase: { type: String },
    seo_image: { type: String },

    // Status & ordering
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    order: { type: Number, default: 1 },

    // Optional created by (admin)
    created_by: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

// Generate slug automatically if not provided
pageSchema.pre("validate", function (next) {
  if (!this.slug && this.page_name) {
    this.slug = this.page_name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
  }
  next();
});

module.exports = mongoose.model("Page", pageSchema);
