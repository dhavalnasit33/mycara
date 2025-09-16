const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

     role: { type: String, enum: ["admin", "user"], default: "user" }, 


    // Additional fields
    mobile_number: { type: String, required: false },
    address: {
      street: { type: String, required: false },
      city: { type: String, required: false },
      state: { type: String, required: false },
      country: { type: String, required: false },
      zip_code: { type: String, required: false },
    },
    gender: { type: String, enum: ["male", "female", "other"], required: false },
    date_of_birth: { type: Date, required: false },
    profile_picture: { type: String, required: false }, 

    is_active: { type: Boolean, default: true }, 
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
