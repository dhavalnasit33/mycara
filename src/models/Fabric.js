const mongoose = require("mongoose");
const slugify = require("slugify");

const fabricSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, unique: true }, // slug field
    description: { type: String },
    image_url: { type: String, default: null },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  { timestamps: true }
);

// Pre-save middleware to generate slug from name
fabricSchema.pre("save", function (next) {
  if (this.isModified("name") || !this.slug) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
  next();
});

module.exports = mongoose.model("Fabric", fabricSchema);
