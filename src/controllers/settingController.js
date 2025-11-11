const Setting = require("../models/Setting");
const { sendResponse } = require("../utils/response");

// ✅ Get settings for the logged-in user
const getUserSettings = async (req, res) => {
  try {
    const userId = req.user._id; // make sure auth middleware sets req.user
    const setting = await Setting.findOne({ user: userId });

    if (!setting) {
      return sendResponse(res, true, null, "No settings found for this user");
    }

    sendResponse(res, true, setting, "User settings fetched successfully");
  } catch (err) {
    sendResponse(res, false, null, err.message);
  }
};

// ✅ Update or create settings for the logged-in user
const updateUserSettings = async (req, res) => {
  try {
    const userId = req.user._id;
    const data = req.body;

    let setting = await Setting.findOne({ user: userId });

    if (setting) {
      // Update existing
      setting = await Setting.findOneAndUpdate({ user: userId }, data, { new: true });
      sendResponse(res, true, setting, "Settings updated successfully");
    } else {
      // Create new if not exist
      setting = new Setting({ ...data, user: userId });
      await setting.save();
      sendResponse(res, true, setting, "Settings created successfully");
    }
  } catch (err) {
    sendResponse(res, false, null, err.message);
  }
};

module.exports = {
  getUserSettings,
  updateUserSettings,
};
