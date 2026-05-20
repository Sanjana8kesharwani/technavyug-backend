import Achievement from "../models/Achievement.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";
import { logAction } from "../utils/auditLogger.js";

export const getAchievements = asyncHandler(async (req, res) => {
  const filter = {};
  if (req.query.featured) filter.featured = req.query.featured === "true";
  if (req.query.search)
    filter.title = { $regex: req.query.search, $options: "i" };
  if (req.query.type) filter.type = req.query.type;

  const achievements = await Achievement.find(filter).sort("-createdAt");
  res.json(new ApiResponse(200, achievements, "Achievements fetched"));
});

export const getAchievement = asyncHandler(async (req, res) => {
  const item = await Achievement.findById(req.params.id);
  if (!item) throw new ApiError(404, "Achievement not found");
  res.json(new ApiResponse(200, item, "Achievement fetched"));
});

export const createAchievement = asyncHandler(async (req, res) => {
  const data = { ...req.body };
  if (req.file) data.badgeImage = req.file.path;
  const item = await Achievement.create(data);
  await logAction(req.admin._id, "CREATE", "Achievement", item._id, {
    title: item.title,
  });
  res.status(201).json(new ApiResponse(201, item, "Achievement created"));
});

export const updateAchievement = asyncHandler(async (req, res) => {
  let item = await Achievement.findById(req.params.id);
  if (!item) throw new ApiError(404, "Achievement not found");
  const data = { ...req.body };
  if (req.file) data.badgeImage = req.file.path;
  item = await Achievement.findByIdAndUpdate(req.params.id, data, {
    new: true,
    runValidators: true,
  });
  await logAction(req.admin._id, "UPDATE", "Achievement", item._id, {
    title: item.title,
  });
  res.json(new ApiResponse(200, item, "Achievement updated"));
});

export const deleteAchievement = asyncHandler(async (req, res) => {
  const item = await Achievement.findById(req.params.id);
  if (!item) throw new ApiError(404, "Achievement not found");
  await item.deleteOne();
  await logAction(req.admin._id, "DELETE", "Achievement", item._id, {
    title: item.title,
  });
  res.json(new ApiResponse(200, {}, "Achievement deleted"));
});
