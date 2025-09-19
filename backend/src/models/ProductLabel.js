const mongoose = require("mongoose");

const productLabelSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    color: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ProductLabel", productLabelSchema);
