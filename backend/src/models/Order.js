const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    total_price: { type: Number, required: true },
    status: { type: String, enum: ["pending", "processing", "completed", "cancelled"], default: "pending" },
    coupon_id: { type: mongoose.Schema.Types.ObjectId, ref: "Coupon", required: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
