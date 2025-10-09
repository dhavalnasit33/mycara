const Section = require("../models/Section");
const { sendResponse } = require("../utils/response");

// Get all sections with pagination & search / optional full download
const getSections = async (req, res) => {
  try {
    let { page = 1, limit = 10, search = "", isDownload = "false",status } = req.query;
    const download = isDownload.toLowerCase() === "true";

    const query = search
      ? { title: { $regex: search, $options: "i" } }
      : {};

    if (download) {
      const sections = await Section.find(query).sort({ order: 1 });
      return sendResponse(res, true, { sections }, "All sections retrieved for download");
    }
if (status && ["active", "inactive"].includes(status)) query.status = status;

    page = parseInt(page);
    limit = parseInt(limit);

    const total = await Section.countDocuments(query);
    const sections = await Section.find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ order: 1 });

    sendResponse(res, true, {
      sections,
      total,
      page,
      pages: Math.ceil(total / limit),
    });
  } catch (err) {
    sendResponse(res, false, null, err.message);
  }
};

// Get section by ID
const getSectionById = async (req, res) => {
  try {
    const section = await Section.findById(req.params.id);
    if (!section) return sendResponse(res, false, null, "Section not found");
    sendResponse(res, true, section, "Section retrieved successfully");
  } catch (err) {
    sendResponse(res, false, null, err.message);
  }
};

// Create section
const createSection = async (req, res) => {
  try {
    const section = new Section(req.body);
    const savedSection = await section.save();
    sendResponse(res, true, savedSection, "Section created successfully");
  } catch (err) {
    sendResponse(res, false, null, err.message);
  }
};

// Update section
const updateSection = async (req, res) => {
  try {
    const updatedSection = await Section.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedSection) return sendResponse(res, false, null, "Section not found");
    sendResponse(res, true, updatedSection, "Section updated successfully");
  } catch (err) {
    sendResponse(res, false, null, err.message);
  }
};

const updateSectionStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const { id } = req.params;

    // Validate status value
    if (!["active", "inactive"].includes(status)) {
      return sendResponse(res, false, null, "Invalid status value");
    }

    const section = await Section.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!section) {
      return sendResponse(res, false, null, "Section not found");
    }

    sendResponse(res, true, section, "Section status updated successfully");
  } catch (err) {
    sendResponse(res, false, null, err.message);
  }
};

// Delete section
const deleteSection = async (req, res) => {
  try {
    const deletedSection = await Section.findByIdAndDelete(req.params.id);
    if (!deletedSection) return sendResponse(res, false, null, "Section not found");
    sendResponse(res, true, null, "Section deleted successfully");
  } catch (err) {
    sendResponse(res, false, null, err.message);
  }
};

// Bulk delete sections
const bulkDeleteSections = async (req, res) => {
  try {
    const { ids } = req.body; // expects { ids: ["id1", "id2"] }
    if (!ids || !ids.length) return sendResponse(res, false, null, "No IDs provided");

    const result = await Section.deleteMany({ _id: { $in: ids } });
    sendResponse(res, true, { deletedCount: result.deletedCount }, "Sections deleted successfully");
  } catch (err) {
    sendResponse(res, false, null, err.message);
  }
};

module.exports = {
  getSections,
  getSectionById,
  createSection,
  updateSection,
  deleteSection,
  bulkDeleteSections,
  updateSectionStatus
};
