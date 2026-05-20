import User from "../models/User.js";
import Project from "../models/Project.js";
import Certificate from "../models/Certificate.js";
import Achievement from "../models/Achievement.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/apiResponse.js";

export const getDashboardStats = asyncHandler(async (_req, res) => {
  const [
    totalUsers,
    totalProjects,
    totalCertificates,
    totalAchievements,
    featuredProjects,
    publicProjects,
  ] = await Promise.all([
    User.countDocuments(),
    Project.countDocuments(),
    Certificate.countDocuments(),
    Achievement.countDocuments(),
    Project.countDocuments({ featured: true }),
    Project.countDocuments({ visibility: "Public" }),
  ]);

  const achievementsByDomain = await Achievement.aggregate([
    { $group: { _id: "$type", count: { $sum: 1 } } },
  ]);

  const certificatesPerMonth = await Certificate.aggregate([
    { $group: { _id: { $month: "$issueDate" }, count: { $sum: 1 } } },
    { $sort: { _id: 1 } },
  ]);

  const userGrowth = await User.aggregate([
    { $group: { _id: { $month: "$createdAt" }, count: { $sum: 1 } } },
    { $sort: { _id: 1 } },
  ]);

  res.json(
    new ApiResponse(
      200,
      {
        cards: {
          totalUsers,
          totalProjects,
          totalCertificates,
          totalAchievements,
          featuredProjects,
          publicProjects,
        },
        charts: { achievementsByDomain, certificatesPerMonth, userGrowth },
      },
      "Dashboard stats fetched",
    ),
  );
});
