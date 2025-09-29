const mongoose = require("mongoose");
const slugify = require("slugify");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },

    // Category reference
    category_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    // General product images (main gallery)
    images: [{ type: String }],

    // Labels that apply to the whole product (e.g., Trending, New)
    labels: [{ type: mongoose.Schema.Types.ObjectId, ref: "ProductLabel" }],

    slug: { type: String, required: true, unique: true },

    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  { timestamps: true }
);

// Auto-generate slug from name
productSchema.pre("save", function (next) {
  if (this.isModified("name") || !this.slug) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
  next();
});

module.exports = mongoose.model("Product", productSchema);
