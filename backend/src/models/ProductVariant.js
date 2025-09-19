const mongoose = require("mongoose");

const productVariantSchema = new mongoose.Schema(
  {
    product_id: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    color: { type: String, required: true },
    size: { type: String, required: true },
    stock_quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    sku: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ProductVariant", productVariantSchema);
