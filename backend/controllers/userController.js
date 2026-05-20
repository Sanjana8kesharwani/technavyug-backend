import User from "../models/User.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";
import { logAction } from "../utils/auditLogger.js";

export const getUsers = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 50;
  const skip = (page - 1) * limit;

  const filter = {};
  if (req.query.search) {
    const re = { $regex: req.query.search, $options: "i" };
    filter.$or = [{ fullName: re }, { email: re }, { designation: re }];
  }

  const total = await User.countDocuments(filter);
  const users = await User.find(filter)
    .sort("-createdAt")
    .skip(skip)
    .limit(limit);

  res.json(
    new ApiResponse(
      200,
      {
        users,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
        },
      },
      "Users fetched",
    ),
  );
});

export const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) throw new ApiError(404, "User not found");
  res.json(new ApiResponse(200, user, "User fetched"));
});

export const createUser = asyncHandler(async (req, res) => {
  const data = { ...req.body };
  if (req.file) data.profilePhoto = req.file.path;
  if (typeof data.skills === "string") data.skills = JSON.parse(data.skills);
  if (typeof data.socialLinks === "string")
    data.socialLinks = JSON.parse(data.socialLinks);

  const user = await User.create(data);
  await logAction(req.admin._id, "CREATE", "User", user._id, {
    fullName: user.fullName,
  });
  res.status(201).json(new ApiResponse(201, user, "User created"));
});

export const updateUser = asyncHandler(async (req, res) => {
  let user = await User.findById(req.params.id);
  if (!user) throw new ApiError(404, "User not found");

  const data = { ...req.body };
  if (req.file) data.profilePhoto = req.file.path;
  if (typeof data.skills === "string") data.skills = JSON.parse(data.skills);
  if (typeof data.socialLinks === "string")
    data.socialLinks = JSON.parse(data.socialLinks);

  user = await User.findByIdAndUpdate(req.params.id, data, {
    new: true,
    runValidators: true,
  });
  await logAction(req.admin._id, "UPDATE", "User", user._id, {
    fullName: user.fullName,
  });
  res.json(new ApiResponse(200, user, "User updated"));
});

export const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) throw new ApiError(404, "User not found");
  await user.deleteOne();
  await logAction(req.admin._id, "DELETE", "User", user._id, {
    fullName: user.fullName,
  });
  res.json(new ApiResponse(200, {}, "User deleted"));
});
