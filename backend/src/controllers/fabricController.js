const Fabric = require("../models/Fabric");
const { sendResponse } = require("../utils/response");

// Get all fabrics (with pagination, search, optional download)
const getFabrics = async (req, res) => {
  try {
    let { page = 1, limit = 10, search = "", isDownload = "false" } = req.query;
    const download = isDownload.toLowerCase() === "true";

    const query = search
      ? { name: { $regex: search, $options: "i" } }
      : {};

    if (download) {
      const fabrics = await Fabric.find(query).sort({ createdAt: -1 });
      return sendResponse(res, true, { fabrics }, "All fabrics retrieved for download");
    }

    page = parseInt(page);
    limit = parseInt(limit);

    const total = await Fabric.countDocuments(query);
    const fabrics = await Fabric.find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });

    sendResponse(res, true, {
      fabrics,
      total,
      page,
      pages: Math.ceil(total / limit),
    });
  } catch (err) {
    sendResponse(res, false, null, err.message);
  }
};

// Get fabric by ID
const getFabricById = async (req, res) => {
  try {
    const fabric = await Fabric.findById(req.params.id);
    if (!fabric) return sendResponse(res, false, null, "Fabric not found");
    sendResponse(res, true, fabric, "Fabric retrieved successfully");
  } catch (err) {
    sendResponse(res, false, null, err.message);
  }
};

// Create fabric
const createFabric = async (req, res) => {
  try {
    const fabric = new Fabric(req.body);
    const savedFabric = await fabric.save();
    sendResponse(res, true, savedFabric, "Fabric created successfully");
  } catch (err) {
    sendResponse(res, false, null, err.message);
  }
};

// Update fabric
const updateFabric = async (req, res) => {
  try {
    const updatedFabric = await Fabric.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedFabric) return sendResponse(res, false, null, "Fabric not found");
    sendResponse(res, true, updatedFabric, "Fabric updated successfully");
  } catch (err) {
    sendResponse(res, false, null, err.message);
  }
};

// Delete fabric
const deleteFabric = async (req, res) => {
  try {
    const deletedFabric = await Fabric.findByIdAndDelete(req.params.id);
    if (!deletedFabric) return sendResponse(res, false, null, "Fabric not found");
    sendResponse(res, true, null, "Fabric deleted successfully");
  } catch (err) {
    sendResponse(res, false, null, err.message);
  }
};

// Bulk delete fabrics
const bulkDeleteFabrics = async (req, res) => {
  try {
    const { ids } = req.body;
    if (!ids || !ids.length)
      return sendResponse(res, false, null, "No IDs provided");

    const result = await Fabric.deleteMany({ _id: { $in: ids } });
    sendResponse(res, true, { deletedCount: result.deletedCount }, "Fabrics deleted successfully");
  } catch (err) {
    sendResponse(res, false, null, err.message);
  }
};

module.exports = {
  getFabrics,
  getFabricById,
  createFabric,
  updateFabric,
  deleteFabric,
  bulkDeleteFabrics,
};
