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
      brands,
      sizes,
      types,
      fabrics,
      colors,
      minPrice,
      maxPrice,
    } = req.query;

    const download = isDownload.toLowerCase() === "true";
    page = parseInt(page);
    limit = parseInt(limit);

    // ============================
    // 1️⃣ Base Product Match Query
    // ============================
    const productMatch = {};
    if (search) productMatch.name = { $regex: search, $options: "i" };
    if (status && ["active", "inactive"].includes(status)) productMatch.status = status;
    if (categories) {
      const catArray = categories.split(",").map((id) => new mongoose.Types.ObjectId(id));
      productMatch.category_id = { $in: catArray };
    }

    // ============================
    // 2️⃣ Variants Match Query
    // ============================
    const variantMatch= {};
    if (brands) variantMatch.brand_id = { $in: brands.split(",").map((id) => new mongoose.Types.ObjectId(id)) };
    if (sizes) variantMatch.size_id = { $in: sizes.split(",").map((id) => new mongoose.Types.ObjectId(id)) };
    if (types) variantMatch.type_id = { $in: types.split(",").map((id) => new mongoose.Types.ObjectId(id)) };
    if (fabrics) variantMatch.fabric_id = { $in: fabrics.split(",").map((id) => new mongoose.Types.ObjectId(id)) };
    if (colors) variantMatch.color_id = { $in: colors.split(",").map((id) => new mongoose.Types.ObjectId(id)) };
    if (minPrice || maxPrice) {
      variantMatch.price = {};
      if (minPrice) variantMatch.price.$gte = Number(minPrice);
      if (maxPrice) variantMatch.price.$lte = Number(maxPrice);
    }

    // ============================
    // 3️⃣ Aggregation Pipeline
    // ============================
    const pipeline= [
      { $match: productMatch },

      // Populate category
      {
        $lookup: {
          from: "categories",
          localField: "category_id",
          foreignField: "_id",
          as: "category",
        },
      },
      { $unwind: { path: "$category", preserveNullAndEmptyArrays: true } },

      // Lookup matching variants
      {
        $lookup: {
          from: "productvariants",
          let: { productId: "$_id" },
          pipeline: [
            { $match: { $expr: { $eq: ["$product_id", "$$productId"] }, ...variantMatch } },

            // Populate variant relations
            { $lookup: { from: "brands", localField: "brand_id", foreignField: "_id", as: "brand" } },
            { $lookup: { from: "types", localField: "type_id", foreignField: "_id", as: "type" } },
            { $lookup: { from: "fabrics", localField: "fabric_id", foreignField: "_id", as: "fabric" } },
            { $lookup: { from: "colors", localField: "color_id", foreignField: "_id", as: "color" } },
            { $lookup: { from: "sizes", localField: "size_id", foreignField: "_id", as: "size" } },

            // Labels
            {
              $addFields: {
                labels: { $map: { input: "$labels", as: "l", in: { $toObjectId: "$$l" } } },
              },
            },
            { $lookup: { from: "labels", localField: "labels", foreignField: "_id", as: "labelsInfo" } },
          ],
          as: "variants",
        },
      },

      // Only keep products that have at least 1 matching variant
      { $match: { "variants.0": { $exists: true } } },

      { $sort: { createdAt: -1 } },
    ];

    if (!download) {
      pipeline.push({ $skip: (page - 1) * limit }, { $limit: limit });
    }

    // ============================
    // 4️⃣ Execute Query
    // ============================
    const products = await Product.aggregate(pipeline);

    // Total count of products that have matching variants
    const total = await Product.aggregate([
      { $match: productMatch },
      {
        $lookup: {
          from: "productvariants",
          let: { productId: "$_id" },
          pipeline: [{ $match: { $expr: { $eq: ["$product_id", "$$productId"] }, ...variantMatch } }],
          as: "variants",
        },
      },
      { $match: { "variants.0": { $exists: true } } },
      { $count: "total" },
    ]);
    const totalCount = total[0]?.total || 0;

    sendResponse(
      res,
      true,
      { products, total: totalCount, page, pages: Math.ceil(totalCount / limit) },
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
      .populate("category_id", "name")
      .lean();
    if (!product) return sendResponse(res, false, null, "Product not found");

    const variants = await ProductVariant.find({ product_id: product._id })
      .populate("brand_id fabric_id type_id color_id size_id", "name")
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
      status,
      discount_id,
      variants,
    } = req.body;


    // Handle product images
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
      discount_id: discount_id || null,
      status: status || "active",
      images: productImages,
    });

    const savedProduct = await product.save();
  

    // Create Variants
    let savedVariants = [];
    if (Array.isArray(variants) && variants.length > 0) {
      const variantDocs = variants.map((v, idx) => {
        return {
          ...v,
          product_id: savedProduct._id,
          status: v.status || "active",
          images: Array.isArray(v.images) ? v.images : [],
          labels: Array.isArray(v.labels) ? v.labels : [],
          sku: v.sku || `SKU-${Date.now()}-${idx}`,
          price: Number(v.price),
          stock_quantity: Number(v.stock_quantity),
          is_featured: !!v.is_featured,
          is_best_seller: !!v.is_best_seller,
          is_trending: !!v.is_trending,
        };
      });

      savedVariants = await ProductVariant.insertMany(variantDocs);
    }

    // Return product + variants
    sendResponse(
      res,
      true,
      { product: savedProduct, variants: savedVariants },
      "Product created with variants successfully"
    );
  } catch (err) {
    console.error("Error creating product:", err);
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

// ✅ Update product status (active/inactive)
const updateProductStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["active", "inactive"].includes(status)) {
      return sendResponse(res, false, null, "Invalid status value");
    }

    const updated = await Product.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updated) {
      return sendResponse(res, false, null, "Product not found");
    }

    sendResponse(res, true, updated, `Product status updated to ${status}`);
  } catch (err) {
    console.error("❌ updateProductStatus error:", err);
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
  updateProductStatus
};
