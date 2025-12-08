const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    total_price: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "processing", "completed", "cancelled"],
      default: "pending",
    },
    shippingAddress: {
      firstName: String,
      lastName: String,
      address: String,
      state: String,
      city: String,
      pincode: String,
      phone: String,
    },
    coupon_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Coupon",
      required: false,
    },
    discount_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Discount",
      default: null,
    },
    // New order number field
    order_number: { type: String, unique: true },
  },
  { timestamps: true }
);

// Auto-generate order number before saving
orderSchema.pre("save", async function (next) {
  if (!this.order_number) {
    const randomPart = Math.floor(1000 + Math.random() * 9000); // 4 digit random
    const datePart = new Date()
      .toISOString()
      .replace(/[-T:.Z]/g, "")
      .slice(0, 8); // YYYYMMDD
    this.order_number = `ORD-${datePart}-${randomPart}`;
  }
  next();
});

module.exports = mongoose.model("Order", orderSchema);
