const mongoose = require("mongoose");

const contactUsSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    order_number: { type: String, required: true },

    message: { type: String, required: true },
    status: { type: String, enum: ["pending", "resolved"], default: "pending" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ContactUs", contactUsSchema);
