const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { sendResponse } = require("../utils/response");

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return sendResponse(res, false, null, "Unauthorized: No token provided");
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select("-password");
    if (!user) return sendResponse(res, false, null, "Unauthorized: User not found");

    req.user = user;
    next();
  } catch (err) {
    sendResponse(res, false, null, "Unauthorized: Invalid token");
  }
};

const authorizeRoles = (...allowedRoles) => (req, res, next) => {
  if (!req.user) return sendResponse(res, false, null, "Unauthorized: No user attached");

  if (!allowedRoles.includes(req.user.role)) {
    return sendResponse(res, false, null, "Forbidden: You don't have access");
  }

  next();
};

const roleHierarchy = {
  store_user: 1,
  store_owner: 2,
  super_admin: 3,
};
const authorizeMinRole = (minRole) => (req, res, next) => {
  if (!req.user) return sendResponse(res, false, null, "Unauthorized: User not found");

  if (roleHierarchy[req.user.role] < roleHierarchy[minRole]) {
    return sendResponse(res, false, null, "Forbidden: Insufficient role");
  }

  next();
};

// Check resource belongs to same store (for store owners)
const checkStoreOwnership = (model, idParam = "id") => async (req, res, next) => {
  try {
    const resource = await model.findById(req.params[idParam]);
    if (!resource) return sendResponse(res, false, null, "Resource not found");

    if (req.user.role === "store_owner" && resource.storeId.toString() !== req.user.storeId.toString()) {
      return sendResponse(res, false, null, "Forbidden: Cannot access resource from another store");
    }

    req.resource = resource;
    next();
  } catch (err) {
    sendResponse(res, false, null, err.message);
  }
};

module.exports = { authMiddleware, authorizeRoles, authorizeMinRole,checkStoreOwnership };
