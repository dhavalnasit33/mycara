const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    order_id: { type: mongoose.Schema.Types.ObjectId, ref: "Order", required: true },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    payment_method: { type: String, required: true },
    status: { type: String, enum: ["pending", "completed", "failed"], default: "pending" },
    transaction_id: { type: String, required: false },
    amount_paid: { type: Number, required: true },
    discount_amount: { type: Number, default: 0 },
    coupon_id: { type: mongoose.Schema.Types.ObjectId, ref: "Coupon", required: false },
    payment_date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Payment", paymentSchema);
