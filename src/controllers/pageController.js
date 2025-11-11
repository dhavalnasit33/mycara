//D:\mycara\backend\src\controllers\pageController.js

const Page = require("../models/Page");
const { sendResponse } = require("../utils/response");

// 📄 Get all pages (with pagination, search, status filter)
const getPages = async (req, res) => {
  try {
    let { page = 1, limit = 10, search = "", status, isDownload = "false" } = req.query;
    const download = isDownload.toLowerCase() === "true";

    const query = {};

    // 🔍 Search by page_name
    if (search) {
      query.page_name = { $regex: search, $options: "i" };
    }

    // ✅ Status filter (active / inactive)
    if (status && ["active", "inactive"].includes(status)) {
      query.status = status;
    }

    if (download) {
      const pages = await Page.find(query).sort({ order: 1 });
      return sendResponse(res, true, { pages }, "All pages retrieved for download");
    }

    page = parseInt(page);
    limit = parseInt(limit);

    const total = await Page.countDocuments(query);
    const pages = await Page.find(query)
      .sort({ order: 1 })
      .skip((page - 1) * limit)
      .limit(limit);

    sendResponse(res, true, {
      pages,
      total,
      page,
      pagesCount: Math.ceil(total / limit),
    });
  } catch (err) {
    sendResponse(res, false, null, err.message);
  }
};


// 📄 Get page by ID
const getPageById = async (req, res) => {
  try {
    const page = await Page.findById(req.params.id);
    if (!page) return sendResponse(res, false, null, "Page not found");
    sendResponse(res, true, page, "Page retrieved successfully");
  } catch (err) {
    sendResponse(res, false, null, err.message);
  }
};

// 🌐 Get page by slug
const getPageBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    if (!slug) return sendResponse(res, false, null, "Slug is required");

    const page = await Page.findOne({ slug });
    if (!page) return sendResponse(res, false, null, "Page not found");

    sendResponse(res, true, page, "Page retrieved successfully by slug");
  } catch (err) {
    sendResponse(res, false, null, err.message);
  }
};


// ➕ Create new page
const createPage = async (req, res) => {
  try {
    const data = req.body;

    // 🧹 Clean up sections (remove empty ones)
    if (Array.isArray(data.sections)) {
      data.sections = data.sections.filter(
        (sec) =>
          sec.title?.trim() ||
          sec.description?.trim() ||
          sec.image_url?.trim() ||
          sec.background_image_url?.trim()
      );
    }

    // 🧠 Auto-generate slug if missing
    if (!data.slug && data.page_name) {
      data.slug = data.page_name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");
    }

    const page = new Page(data);
    const savedPage = await page.save();

    sendResponse(res, true, savedPage, "Page created successfully");
  } catch (err) {
    sendResponse(res, false, null, err.message || "Failed to create page");
  }
};

// ✏️ Update existing page
const updatePage = async (req, res) => {
  try {
    const data = req.body;

    // 🧹 Clean up empty sections before update
    if (Array.isArray(data.sections)) {
      data.sections = data.sections.filter(
        (sec) =>
          sec.title?.trim() ||
          sec.description?.trim() ||
          sec.image_url?.trim() ||
          sec.background_image_url?.trim()
      );
    }

    // 🧠 Auto-update slug if page_name changed
    if (!data.slug && data.page_name) {
      data.slug = data.page_name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");
    }

    const updatedPage = await Page.findByIdAndUpdate(req.params.id, data, {
      new: true,
      runValidators: true,
    });

    if (!updatedPage) {
      return sendResponse(res, false, null, "Page not found");
    }

    sendResponse(res, true, updatedPage, "Page updated successfully");
  } catch (err) {
    sendResponse(res, false, null, err.message || "Failed to update page");
  }
};

// 🔄 Update page status
const updatePageStatus = async (req, res) => {
  try {
    const { status } = req.body;
    if (!["active", "inactive"].includes(status)) {
      return sendResponse(res, false, null, "Invalid status value");
    }

    const page = await Page.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!page) return sendResponse(res, false, null, "Page not found");
    sendResponse(res, true, page, "Page status updated successfully");
  } catch (err) {
    sendResponse(res, false, null, err.message);
  }
};

// ❌ Delete single page
const deletePage = async (req, res) => {
  try {
    const deleted = await Page.findByIdAndDelete(req.params.id);
    if (!deleted) return sendResponse(res, false, null, "Page not found");
    sendResponse(res, true, null, "Page deleted successfully");
  } catch (err) {
    sendResponse(res, false, null, err.message);
  }
};

// 🗑️ Bulk delete pages
const bulkDeletePages = async (req, res) => {
  try {
    const { ids } = req.body;
    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return sendResponse(res, false, null, "No valid IDs provided");
    }

    const result = await Page.deleteMany({ _id: { $in: ids } });
    sendResponse(
      res,
      true,
      { deletedCount: result.deletedCount },
      "Pages deleted successfully"
    );
  } catch (err) {
    sendResponse(res, false, null, err.message);
  }
};

module.exports = {
  getPages,
  getPageById,
  getPageBySlug,
  createPage,
  updatePage,
  updatePageStatus,
  deletePage,
  bulkDeletePages,
};
