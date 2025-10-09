const Page = require("../models/Page");
const { sendResponse } = require("../utils/response");

// 📄 Get all pages (with pagination, search, status filter)
const getPages = async (req, res) => {
  try {
    let { page = 1, limit = 10, search = "", status, isDownload = "false" } = req.query;
    const download = isDownload.toLowerCase() === "true";

    const query = {};

    if (search) {
      query.page_name = { $regex: search, $options: "i" };
    }

    if (status && ["draft", "published"].includes(status)) {
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

// ➕ Create new page
const createPage = async (req, res) => {
  try {
    const page = new Page(req.body);
    const savedPage = await page.save();
    sendResponse(res, true, savedPage, "Page created successfully");
  } catch (err) {
    sendResponse(res, false, null, err.message);
  }
};

// ✏️ Update page
const updatePage = async (req, res) => {
  try {
    const updatedPage = await Page.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedPage) return sendResponse(res, false, null, "Page not found");
    sendResponse(res, true, updatedPage, "Page updated successfully");
  } catch (err) {
    sendResponse(res, false, null, err.message);
  }
};

// 🔄 Update page status
const updatePageStatus = async (req, res) => {
  try {
    const { status } = req.body;
    if (!["draft", "published"].includes(status)) {
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
  createPage,
  updatePage,
  updatePageStatus,
  deletePage,
  bulkDeletePages,
};
