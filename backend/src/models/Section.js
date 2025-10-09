const mongoose = require("mongoose");

// Section Schema
const sectionSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: false },
    image_url: { type: String, required: false },
    background_image_url: { type: String, required: false },
    order: { type: Number, default: 1 },
    is_button: { type: Boolean, default: false },
    button_name: { type: String, required: false },
    button_link: { type: String, required: false },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
  },
  { timestamps: true }
);

sectionSchema.pre("save", function (next) {
  if (this.order == null) this.order = 1; 
  next();
});

module.exports = mongoose.model("Section", sectionSchema);
