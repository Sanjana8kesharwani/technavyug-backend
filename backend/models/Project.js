import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    category: { type: String, required: true },
    shortDescription: { type: String, required: true },
    fullDescription: { type: String, required: true },
    teamMembers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    startDate: { type: Date },
    endDate: { type: Date },
    status: {
      type: String,
      enum: ["Completed", "Ongoing", "Planned"],
      default: "Completed",
    },
    thumbnailImage: { type: String, default: "" },
    galleryImages: [{ type: String }],
    demoVideoLinks: [{ type: String }],
    liveProjectUrl: { type: String, default: "" },
    featured: { type: Boolean, default: false },
    visibility: {
      type: String,
      enum: ["Public", "Private"],
      default: "Public",
    },
    published: { type: Boolean, default: true },
    techStack: [{ type: String }],
  },
  { timestamps: true },
);

export default mongoose.model("Project", projectSchema);
