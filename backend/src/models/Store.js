const mongoose = require("mongoose");
const slugify = require("slugify");

const storeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, unique: true },
    email: { type: String, required: true }, // store contact email
    phone: { type: String },                 // store phone
    website: { type: String },               // optional
    logo: { type: String },                  // URL to logo
    banner: { type: String },                // URL to banner
    description: { type: String },
    theme: {
      primaryColor: { type: String, default: "#000000" },
      secondaryColor: { type: String, default: "#ffffff" },
      fontFamily: { type: String, default: "Roboto" },
    },
    address: {
      street: String,
      city: String,
      state: String,
      country: String,
      zip_code: String,
    },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
  },
  { timestamps: true }
);

// Auto-generate slug
storeSchema.pre("save", function (next) {
  if (this.isModified("name")) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
  next();
});

module.exports = mongoose.model("Store", storeSchema);
