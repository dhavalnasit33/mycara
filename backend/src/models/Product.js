const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    category_id: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
    brand_id: { type: mongoose.Schema.Types.ObjectId, ref: "Brand", required: true },
    type_id: { type: mongoose.Schema.Types.ObjectId, ref: "Type", required: true },
    fabric_id: { type: mongoose.Schema.Types.ObjectId, ref: "Fabric", required: true },
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    discount_id: { type: mongoose.Schema.Types.ObjectId, ref: "Discount" },
    labels: [{ type: String }],
    images: [{ type: String }],
    slug: { type: String, required: true, unique: true },
    is_featured: { type: Boolean, default: false },
    is_best_seller: { type: Boolean, default: false },
    is_trending: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
