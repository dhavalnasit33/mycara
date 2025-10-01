const mongoose = require("mongoose");

const sizeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true }, 
    measurement: { type: String }, 
    status: { type: String, enum: ["active", "inactive"], default: "active" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Size", sizeSchema);
