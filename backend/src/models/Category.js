//D:\mycara\backend\src\models\Category.js

const mongoose = require("mongoose");
const slugify = require("slugify"); 

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, default: "" },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
    image_url: { type: String, default: null },
    parent_id: { type: mongoose.Schema.Types.ObjectId, ref: "Category", default: null },
  },
  { timestamps: true }
);

// Pre-save hook to auto-generate slug from name if not provided
categorySchema.pre("validate", function (next) {
  if (!this.slug && this.name) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
  next();
});

module.exports = mongoose.model("Category", categorySchema);
