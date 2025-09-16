const Setting = require("../models/Setting");
const { sendResponse } = require("../utils/response"); 

// Get all settings with pagination & search / optional full download
const getSettings = async (req, res) => {
  try {
    let { page = 1, limit = 10, search = "", isDownload = "false" } = req.query;
    const download = isDownload.toLowerCase() === "true";

    const query = search
      ? { site_name: { $regex: search, $options: "i" } }
      : {};

    if (download) {
      // Return all data without pagination
      const settings = await Setting.find(query).sort({ createdAt: -1 });
      return sendResponse(res, true, { settings }, "All settings retrieved for download");
    }

    // Default paginated response
    page = parseInt(page);
    limit = parseInt(limit);

    const total = await Setting.countDocuments(query);
    const settings = await Setting.find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });

    sendResponse(res, true, {
      settings,
      total,
      page,
      pages: Math.ceil(total / limit),
    });
  } catch (err) {
    sendResponse(res, false, null, err.message);
  }
};

// Get setting by ID
const getSettingById = async (req, res) => {
  try {
    const setting = await Setting.findById(req.params.id);
    if (!setting) return sendResponse(res, false, null, "Setting not found");
    sendResponse(res, true, setting, "Setting found");
  } catch (err) {
    sendResponse(res, false, null, err.message);
  }
};

// Create setting
const createSetting = async (req, res) => {
  try {
    const setting = new Setting(req.body);
    const savedSetting = await setting.save();
    sendResponse(res, true, savedSetting, "Setting created successfully");
  } catch (err) {
    sendResponse(res, false, null, err.message);
  }
};

// Update setting
const updateSetting = async (req, res) => {
  try {
    const updatedSetting = await Setting.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedSetting) return sendResponse(res, false, null, "Setting not found");
    sendResponse(res, true, updatedSetting, "Setting updated successfully");
  } catch (err) {
    sendResponse(res, false, null, err.message);
  }
};

// Delete setting
const deleteSetting = async (req, res) => {
  try {
    const deletedSetting = await Setting.findByIdAndDelete(req.params.id);
    if (!deletedSetting) return sendResponse(res, false, null, "Setting not found");
    sendResponse(res, true, null, "Setting deleted successfully");
  } catch (err) {
    sendResponse(res, false, null, err.message);
  }
};

// Bulk delete settings
const bulkDeleteSettings = async (req, res) => {
  try {
    const { ids } = req.body; // expects { ids: ["id1", "id2"] }
    if (!ids || !ids.length) return sendResponse(res, false, null, "No IDs provided");

    const result = await Setting.deleteMany({ _id: { $in: ids } });
    sendResponse(res, true, { deletedCount: result.deletedCount }, "Settings deleted successfully");
  } catch (err) {
    sendResponse(res, false, null, err.message);
  }
};

module.exports = {
  getSettings,
  getSettingById,
  createSetting,
  updateSetting,
  deleteSetting,
  bulkDeleteSettings,
};
