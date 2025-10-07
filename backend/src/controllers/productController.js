const { default: slugify } = require("slugify");
const Product = require("../models/Product");
const { sendResponse } = require("../utils/response");
const ProductVariant = require("../models/ProductVariant");
const mongoose = require("mongoose");


const getProducts = async (req, res) => {
  try {
    let {
      page = 1,
      limit = 10,
      search = "",
      isDownload = "false",
      status,
      categories,
      labels,
      brands,
      sizes,
      types,
      fabrics,
      colors,
      minPrice,
      maxPrice
    } = req.query;

    const download = isDownload.toLowerCase() === "true";
    page = parseInt(page);
    limit = parseInt(limit);

    // ============================
    // 🧭 1️⃣ Base match query
    // ============================
    const matchQuery = {};
    if (search) matchQuery.name = { $regex: search, $options: "i" };
    if (status && ["active", "inactive"].includes(status)) matchQuery.status = status;

    // ============================
    // 🧭 2️⃣ Category Filter
    // ============================
    if (categories) {
      const catArray = categories.split(",").map(id => new mongoose.Types.ObjectId(id));
      matchQuery.category_id = { $in: catArray };
    }

    // ============================
    // 🧭 3️⃣ Product Labels Filter
    // ============================
    if (labels) {
      const labelArray = labels.split(",").map(id => new mongoose.Types.ObjectId(id));
      matchQuery.labels = { $in: labelArray };
    }

    // ============================
    // 🧭 4️⃣ Brand Filter
    // ============================
    if (brands) {
      const brandArray = brands.split(",").map(id => new mongoose.Types.ObjectId(id));
      matchQuery["variants.brand_id"] = { $in: brandArray };
    }

    // ============================
    // 🧭 5️⃣ Size Filter
    // ============================
    if (sizes) {
      const sizeArray = sizes.split(",").map(id => new mongoose.Types.ObjectId(id));
      matchQuery["variants.size_id"] = { $in: sizeArray };
    }

    // ============================
    // 🧭 6️⃣ Type Filter
    // ============================
    if (types) {
      const typeArray = types.split(",").map(id => new mongoose.Types.ObjectId(id));
      matchQuery["variants.type_id"] = { $in: typeArray };
    }

    // ============================
    // 🧭 7️⃣ Fabric Filter
    // ============================
    if (fabrics) {
      const fabricArray = fabrics.split(",").map(id => new mongoose.Types.ObjectId(id));
      matchQuery["variants.fabric_id"] = { $in: fabricArray };
    }

    // ============================
    // 🧭 8️⃣ Color Filter
    // ============================
    if (colors) {
      const colorArray = colors.split(",").map(id => new mongoose.Types.ObjectId(id));
      matchQuery["variants.color_id"] = { $in: colorArray };
    }

    // ============================
    // 🧭 9️⃣ Price Filter
    // ============================
    if (minPrice || maxPrice) {
      matchQuery["variants.price"] = {};
      if (minPrice) matchQuery["variants.price"].$gte = Number(minPrice);
      if (maxPrice) matchQuery["variants.price"].$lte = Number(maxPrice);
    }

    // ============================
    // 🧭 🔟 Aggregation Pipeline
    // ============================
    const pipeline = [
      { $match: matchQuery },

      // Populate category
      {
        $lookup: {
          from: "categories",
          localField: "category_id",
          foreignField: "_id",
          as: "category"
        }
      },
      { $unwind: { path: "$category", preserveNullAndEmptyArrays: true } },

      // Populate product labels
      {
        $lookup: {
          from: "productlabels",
          localField: "labels",
          foreignField: "_id",
          as: "labelsInfo"
        }
      },

      // Populate variants with nested lookups
      {
        $lookup: {
          from: "productvariants",
          let: { productId: "$_id" },
          pipeline: [
            { $match: { $expr: { $eq: ["$product_id", "$$productId"] } } },

            // Convert labels strings to ObjectId if needed
            {
              $addFields: {
                labels: {
                  $map: {
                    input: "$labels",
                    as: "labelId",
                    in: { $toObjectId: "$$labelId" }
                  }
                }
              }
            },

            // Populate variant labels
            {
              $lookup: {
                from: "labels",
                localField: "labels",
                foreignField: "_id",
                as: "labelsInfo"
              }
            },

            // Populate brand, type, fabric, color, size
            {
              $lookup: {
                from: "brands",
                localField: "brand_id",
                foreignField: "_id",
                as: "brand"
              }
            },
            {
              $lookup: {
                from: "types",
                localField: "type_id",
                foreignField: "_id",
                as: "type"
              }
            },
            {
              $lookup: {
                from: "fabrics",
                localField: "fabric_id",
                foreignField: "_id",
                as: "fabric"
              }
            },
            {
              $lookup: {
                from: "colors",
                localField: "color_id",
                foreignField: "_id",
                as: "color"
              }
            },
            {
              $lookup: {
                from: "sizes",
                localField: "size_id",
                foreignField: "_id",
                as: "size"
              }
            }
          ],
          as: "variants"
        }
      },

      { $sort: { createdAt: -1 } }
    ];

    if (!download) {
      pipeline.push({ $skip: (page - 1) * limit }, { $limit: limit });
    }

    // ============================
    // 🧭 11️⃣ Execute Query
    // ============================
    const products = await Product.aggregate(pipeline);
    const total = await Product.countDocuments(matchQuery);

    sendResponse(
      res,
      true,
      { products, total, page, pages: Math.ceil(total / limit) },
      "Products retrieved successfully"
    );

  } catch (err) {
    console.error("❌ getProducts error:", err);
    sendResponse(res, false, null, err.message);
  }
};


const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate("category_id labels", "name")
      .lean();
    if (!product) return sendResponse(res, false, null, "Product not found");

    const variants = await ProductVariant.find({ product_id: product._id })
      .populate("brand_id fabric_id type_id color_id size_id labels", "name")
      .lean();

    sendResponse(res, true, { ...product, variants }, "Product retrieved successfully");
  } catch (err) {
    sendResponse(res, false, null, err.message);
  }
};

const createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      category_id,
      labels,
      status,
      is_featured,
      is_best_seller,
      is_trending,
      variants,
    } = req.body;

    // Handle product images (uploaded files or URLs)
    let productImages = [];
    if (req.files && req.files.length > 0) {
      productImages = req.files.map(file => `/uploads/${file.filename}`);
    } else if (req.body.images) {
      productImages = Array.isArray(req.body.images) ? req.body.images : [req.body.images];
    }

    // Create Product
    const product = new Product({
      name,
      slug: slugify(name, { lower: true, strict: true }),
      description,
      category_id,
      labels: Array.isArray(labels) ? labels : [],
      status: status || "active",
      is_featured: !!is_featured,
      is_best_seller: !!is_best_seller,
      is_trending: !!is_trending,
      images: productImages,
    });

    const savedProduct = await product.save();
  
    // Create Variants
    let savedVariants = [];
    if (Array.isArray(variants) && variants.length > 0) {
      const variantDocs = variants.map((v, idx) => ({
        ...v,
        product_id: savedProduct._id,
        status: v.status || "active",
        images: Array.isArray(v.images) ? v.images : [],
        labels: Array.isArray(v.labels) ? v.labels : [],
        sku: v.sku || `SKU-${Date.now()}-${idx}`,
        price: Number(v.price),
        stock_quantity: Number(v.stock_quantity),
      }));

      savedVariants = await ProductVariant.insertMany(variantDocs);
    }

    // Return product + variants
    sendResponse(res, true, { product: savedProduct, variants: savedVariants }, "Product created with variants successfully");
  } catch (err) {
    sendResponse(res, false, null, err.message);
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { variants, ...productData } = req.body;

    // Update Product
    const updatedProduct = await Product.findByIdAndUpdate(id, productData, { new: true });
    if (!updatedProduct) return sendResponse(res, false, null, "Product not found");

    // Update or create variants
    if (Array.isArray(variants)) {
      for (const v of variants) {
        if (v._id) {
          // update existing variant
          await ProductVariant.findByIdAndUpdate(v._id, v, { new: true });
        } else {
          // create new variant
          const newVariant = new ProductVariant({ ...v, product_id: id });
          await newVariant.save();
        }
      }
    }

    sendResponse(res, true, updatedProduct, "Product and variants updated successfully");
  } catch (err) {
    sendResponse(res, false, null, err.message);
  }
};

// Delete product
const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct)
      return sendResponse(res, false, null, "Product not found");

    // Delete all variants for this product
    await ProductVariant.deleteMany({ product_id: req.params.id });

    sendResponse(res, true, null, "Product and its variants deleted successfully");
  } catch (err) {
    sendResponse(res, false, null, err.message);
  }
};

// Bulk delete products
const bulkDeleteProducts = async (req, res) => {
  try {
    const { ids } = req.body;
    if (!ids || !ids.length)
      return sendResponse(res, false, null, "No IDs provided");

    const result = await Product.deleteMany({ _id: { $in: ids } });

    // Delete variants of all deleted products
    await ProductVariant.deleteMany({ product_id: { $in: ids } });

    sendResponse(
      res,
      true,
      { deletedCount: result.deletedCount },
      "Products and their variants deleted successfully"
    );
  } catch (err) {
    sendResponse(res, false, null, err.message);
  }
};


module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  bulkDeleteProducts,
};
