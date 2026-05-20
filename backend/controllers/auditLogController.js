import AuditLog from "../models/AuditLog.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/apiResponse.js";

export const getAuditLogs = asyncHandler(async (req, res) => {
  const filter = {};
  if (req.query.search) {
    const re = { $regex: req.query.search, $options: "i" };
    filter.$or = [{ action: re }, { resource: re }];
  }

  const logs = await AuditLog.find(filter)
    .populate("adminId", "name email")
    .sort("-createdAt")
    .limit(100);
  res.json(new ApiResponse(200, logs, "Audit logs fetched"));
});
