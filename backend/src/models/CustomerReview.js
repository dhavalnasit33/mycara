const mongoose = require("mongoose");

const customerReviewSchema = new mongoose.Schema(
  {
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    product_id: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    rating: { type: Number, required: true },
    title: { type: String, required: true },
    comment: { type: String, required: false },
    is_approved: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("CustomerReview", customerReviewSchema);
