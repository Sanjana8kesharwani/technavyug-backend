import mongoose from "mongoose";

const achievementSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    type: { type: String, required: true },
    description: { type: String, required: true },
    issuingAuthority: { type: String, required: true },
    badgeImage: { type: String, default: "" },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export default mongoose.model("Achievement", achievementSchema);
