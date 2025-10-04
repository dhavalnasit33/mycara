const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    role: {
      type: String,
      enum: ["super_admin", "store_owner", "store_user"],
      default: "store_user",
    },

    mobile_number: { type: String },
    profile_picture: { type: String },

    // Address of user (optional)
    address: {
      street: String,
      city: String,
      state: String,
      country: String,
      zip_code: String,
    },

    gender: { type: String, enum: ["male", "female", "other"] },
    date_of_birth: { type: Date },
    is_active: { type: Boolean, default: true },

    storeId: { type: mongoose.Schema.Types.ObjectId, ref: "Store" }, // linked store
  },
  { timestamps: true }
);

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

module.exports = mongoose.model("User", userSchema);
