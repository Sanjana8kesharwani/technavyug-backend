import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import connectDB from "./config/db.js";
import { errorHandler } from "./middleware/error.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import achievementRoutes from "./routes/achievementRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import certificateRoutes from "./routes/certificateRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import auditLogRoutes from "./routes/auditLogRoutes.js";
import activityRoutes from "./routes/activityRoutes.js";
import analyticsRoutes from "./routes/analyticsRoutes.js";

const app = express();

connectDB();

app.use(helmet({ crossOriginResourcePolicy: false }));
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  }),
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    success: false,
    message: "Too many requests, please try again later.",
  },
});
app.use("/api", limiter);

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/achievements", achievementRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/certificates", certificateRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/audit-logs", auditLogRoutes);
app.use("/api/activity", activityRoutes);
app.use("/api/analytics", analyticsRoutes);

app.get("/", (_req, res) => {
  res.json({ success: true, message: "Devfolio API is running" });
});

app.use((_req, res) => {
  res.status(404).json({ success: false, message: "Endpoint not found" });
});

app.use(errorHandler);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
