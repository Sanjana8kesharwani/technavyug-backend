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

  const recentUsers = await User.find()
    .sort({ createdAt: -1 })
    .limit(2)
    .select("fullName createdAt");

  const recentProjects = await Project.find()
    .sort({ createdAt: -1 })
    .limit(2)
    .select("title createdAt");

  const recentCertificates = await Certificate.find()
    .sort({ createdAt: -1 })
    .limit(2)
    .select("certificateTitle createdAt");

  const recentAchievements = await Achievement.find()
    .sort({ createdAt: -1 })
    .limit(2)
    .select("title createdAt");

  const recentUploads = [
    ...recentUsers.map((u) => ({
      type: "user",
      text: `${u.fullName} registered`,
      time: u.createdAt,
    })),

    ...recentProjects.map((p) => ({
      type: "project",
      text: `${p.title} uploaded`,
      time: p.createdAt,
    })),

    ...recentCertificates.map((c) => ({
      type: "certificate",
      text: `${c.certificateTitle} certificate generated`,
      time: c.createdAt,
    })),

    ...recentAchievements.map((a) => ({
      type: "achievement",
      text: `${a.title} achievement added`,
      time: a.createdAt,
    })),
  ]
    .sort((a, b) => new Date(b.time) - new Date(a.time))
    .slice(0, 6);

  const overview = [
    {
      label: "Users Active",
      value: totalUsers
        ? Math.min(Math.round((totalUsers / 100) * 100), 100)
        : 0,
      color: "#8b5cf6",
    },

    {
      label: "Projects Done",
      value: totalProjects
        ? Math.min(Math.round((totalProjects / 100) * 100), 100)
        : 0,
      color: "#34d399",
    },

    {
      label: "Certificates Issued",
      value: totalCertificates
        ? Math.min(Math.round((totalCertificates / 100) * 100), 100)
        : 0,
      color: "#f472b6",
    },
  ];

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

        charts: {
          achievementsByDomain,
          certificatesPerMonth,
          userGrowth,
        },

        recentUploads,
        overview,
      },

      "Dashboard stats fetched",
    ),
  );
});