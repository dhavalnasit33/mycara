const ContactUs = require("../models/ContactUs");
const { sendResponse } = require("../utils/response");

// Get all contact messages
const getContacts = async (req, res) => {
  try {
    let { page = 1, limit = 10, search = "", isDownload = "false" } = req.query;
    const download = isDownload.toLowerCase() === "true";

    const query = search
      ? { subject: { $regex: search, $options: "i" } }
      : {};

    if (download) {
      const contacts = await ContactUs.find(query).sort({ createdAt: -1 });
      return sendResponse(res, true, { contacts }, "All contact messages retrieved for download");
    }

    page = parseInt(page);
    limit = parseInt(limit);

    const total = await ContactUs.countDocuments(query);
    const contacts = await ContactUs.find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });

    sendResponse(res, true, { contacts, total, page, pages: Math.ceil(total / limit) });
  } catch (err) {
    sendResponse(res, false, null, err.message);
  }
};

// Get contact by ID
const getContactById = async (req, res) => {
  try {
    const contact = await ContactUs.findById(req.params.id);
    if (!contact) return sendResponse(res, false, null, "Contact message not found");
    sendResponse(res, true, contact, "Contact message retrieved successfully");
  } catch (err) {
    sendResponse(res, false, null, err.message);
  }
};

// Create contact
const createContact = async (req, res) => {
  try {
    const contact = new ContactUs(req.body);
    const savedContact = await contact.save();
    sendResponse(res, true, savedContact, "Contact message submitted successfully");
  } catch (err) {
    sendResponse(res, false, null, err.message);
  }
};

// Update contact (status)
const updateContact = async (req, res) => {
  try {
    const updatedContact = await ContactUs.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedContact) return sendResponse(res, false, null, "Contact message not found");
    sendResponse(res, true, updatedContact, "Contact message updated successfully");
  } catch (err) {
    sendResponse(res, false, null, err.message);
  }
};

// Delete contact
const deleteContact = async (req, res) => {
  try {
    const deletedContact = await ContactUs.findByIdAndDelete(req.params.id);
    if (!deletedContact) return sendResponse(res, false, null, "Contact message not found");
    sendResponse(res, true, null, "Contact message deleted successfully");
  } catch (err) {
    sendResponse(res, false, null, err.message);
  }
};

// Bulk delete contacts
const bulkDeleteContacts = async (req, res) => {
  try {
    const { ids } = req.body;
    if (!ids || !ids.length) return sendResponse(res, false, null, "No IDs provided");

    const result = await ContactUs.deleteMany({ _id: { $in: ids } });
    sendResponse(res, true, { deletedCount: result.deletedCount }, "Contact messages deleted successfully");
  } catch (err) {
    sendResponse(res, false, null, err.message);
  }
};

module.exports = {
  getContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
  bulkDeleteContacts,
};
