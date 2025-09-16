const Navbar = require("../models/Navbar");
const { sendResponse } = require("../utils/response");

// Get all navbars with pagination & search / optional full download
const getNavbars = async (req, res) => {
  try {
    let { page = 1, limit = 10, search = "", isDownload = "false" } = req.query;
    const download = isDownload.toLowerCase() === "true";

    const query = search
      ? { label: { $regex: search, $options: "i" } }
      : {};

    if (download) {
      const navbars = await Navbar.find(query).sort({ order: 1 });
      return sendResponse(res, true, { navbars }, "All navbars retrieved for download");
    }

    page = parseInt(page);
    limit = parseInt(limit);

    const total = await Navbar.countDocuments(query);
    const navbars = await Navbar.find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ order: 1 });

    sendResponse(res, true, {
      navbars,
      total,
      page,
      pages: Math.ceil(total / limit),
    });
  } catch (err) {
    sendResponse(res, false, null, err.message);
  }
};

// Get navbar by ID
const getNavbarById = async (req, res) => {
  try {
    const navbar = await Navbar.findById(req.params.id);
    if (!navbar) return sendResponse(res, false, null, "Navbar not found");
    sendResponse(res, true, navbar, "Navbar retrieved successfully");
  } catch (err) {
    sendResponse(res, false, null, err.message);
  }
};

// Create navbar
const createNavbar = async (req, res) => {
  try {
    const navbar = new Navbar(req.body);
    const savedNavbar = await navbar.save();
    sendResponse(res, true, savedNavbar, "Navbar created successfully");
  } catch (err) {
    sendResponse(res, false, null, err.message);
  }
};

// Update navbar
const updateNavbar = async (req, res) => {
  try {
    const updatedNavbar = await Navbar.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedNavbar) return sendResponse(res, false, null, "Navbar not found");
    sendResponse(res, true, updatedNavbar, "Navbar updated successfully");
  } catch (err) {
    sendResponse(res, false, null, err.message);
  }
};

// Delete navbar
const deleteNavbar = async (req, res) => {
  try {
    const deletedNavbar = await Navbar.findByIdAndDelete(req.params.id);
    if (!deletedNavbar) return sendResponse(res, false, null, "Navbar not found");
    sendResponse(res, true, null, "Navbar deleted successfully");
  } catch (err) {
    sendResponse(res, false, null, err.message);
  }
};

// Bulk delete navbars
const bulkDeleteNavbars = async (req, res) => {
  try {
    const { ids } = req.body;
    if (!ids || !ids.length) return sendResponse(res, false, null, "No IDs provided");

    const result = await Navbar.deleteMany({ _id: { $in: ids } });
    sendResponse(res, true, { deletedCount: result.deletedCount }, "Navbars deleted successfully");
  } catch (err) {
    sendResponse(res, false, null, err.message);
  }
};

module.exports = {
  getNavbars,
  getNavbarById,
  createNavbar,
  updateNavbar,
  deleteNavbar,
  bulkDeleteNavbars,
};
