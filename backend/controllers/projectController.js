import Project from "../models/Project.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";
import { logAction } from "../utils/auditLogger.js";

const parseJsonField = (val) => {
  try {
    return typeof val === "string" ? JSON.parse(val) : val;
  } catch {
    return val;
  }
};

export const getProjects = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 50;
  const skip = (page - 1) * limit;

  const filter = {};
  if (req.query.search)
    filter.title = { $regex: req.query.search, $options: "i" };
  if (req.query.category) filter.category = req.query.category;
  if (req.query.featured) filter.featured = req.query.featured === "true";
  if (req.query.status) filter.status = req.query.status;

  if (!req.admin) {
    filter.visibility = "Public";
    filter.published = true;
  }

  const sortField = req.query.sort || "-createdAt";
  const total = await Project.countDocuments(filter);
  const projects = await Project.find(filter)
    .populate("teamMembers", "fullName profilePhoto")
    .sort(sortField)
    .skip(skip)
    .limit(limit);

  res.json(
    new ApiResponse(
      200,
      {
        projects,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
        },
      },
      "Projects fetched",
    ),
  );
});

export const getProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id).populate(
    "teamMembers",
    "fullName profilePhoto designation",
  );
  if (!project) throw new ApiError(404, "Project not found");
  res.json(new ApiResponse(200, project, "Project fetched"));
});

export const createProject = asyncHandler(async (req, res) => {
  const data = { ...req.body };
  if (req.files) {
    if (req.files.thumbnailImage)
      data.thumbnailImage = req.files.thumbnailImage[0].path;
    if (req.files.galleryImages)
      data.galleryImages = req.files.galleryImages.map((f) => f.path);
  }
  data.techStack = parseJsonField(data.techStack);
  data.teamMembers = parseJsonField(data.teamMembers);
  data.demoVideoLinks = parseJsonField(data.demoVideoLinks);

  const project = await Project.create(data);
  await logAction(req.admin._id, "CREATE", "Project", project._id, {
    title: project.title,
  });
  res.status(201).json(new ApiResponse(201, project, "Project created"));
});

export const updateProject = asyncHandler(async (req, res) => {
  let project = await Project.findById(req.params.id);
  if (!project) throw new ApiError(404, "Project not found");

  const data = { ...req.body };
  if (req.files) {
    if (req.files.thumbnailImage)
      data.thumbnailImage = req.files.thumbnailImage[0].path;
    if (req.files.galleryImages) {
      data.galleryImages = [
        ...project.galleryImages,
        ...req.files.galleryImages.map((f) => f.path),
      ];
    }
  }
  data.techStack = parseJsonField(data.techStack);
  data.teamMembers = parseJsonField(data.teamMembers);
  data.demoVideoLinks = parseJsonField(data.demoVideoLinks);

  project = await Project.findByIdAndUpdate(req.params.id, data, {
    new: true,
    runValidators: true,
  });
  await logAction(req.admin._id, "UPDATE", "Project", project._id, {
    title: project.title,
  });
  res.json(new ApiResponse(200, project, "Project updated"));
});

export const deleteProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) throw new ApiError(404, "Project not found");
  await project.deleteOne();
  await logAction(req.admin._id, "DELETE", "Project", project._id, {
    title: project.title,
  });
  res.json(new ApiResponse(200, {}, "Project deleted"));
});

export const duplicateProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) throw new ApiError(404, "Project not found");

  const dup = project.toObject();
  delete dup._id;
  delete dup.createdAt;
  delete dup.updatedAt;
  dup.title = `${dup.title} (Copy)`;
  dup.status = "Planned";

  const newProject = await Project.create(dup);
  await logAction(req.admin._id, "DUPLICATE", "Project", newProject._id, {
    originalId: project._id,
  });
  res.status(201).json(new ApiResponse(201, newProject, "Project duplicated"));
});
