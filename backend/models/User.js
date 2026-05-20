import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    designation: { type: String, required: true },
    profilePhoto: { type: String, default: "" },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, default: "" },
    linkedinUrl: { type: String, default: "" },
    bio: { type: String, default: "" },
    skills: [{ type: String }],
    socialLinks: {
      github: { type: String, default: "" },
      twitter: { type: String, default: "" },
      portfolio: { type: String, default: "" },
    },
  },
  { timestamps: true },
);

export default mongoose.model("User", userSchema);
