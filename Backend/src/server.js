import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

// Route imports
import authRoutes from "./routes/auth.routes.js";
import courseRoutes from "./routes/course.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import userRoutes from "./routes/user.routes.js";
import statsRoutes from "./routes/stats.routes.js";

// ✅ Swagger imports
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ES module friendly __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Ensure uploads directory exists (Backend/uploads)
const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Serve uploaded images statically
app.use("/uploads", express.static(uploadDir));

// Middleware
app.use(cors());
app.use(express.json());

// ✅ Swagger configuration
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "LMS API",
      version: "1.0.0",
      description: "API documentation for your LMS backend",
    },
    servers: [
      {
        url: `http://localhost:${PORT}/api`, // base path for your routes
      },
    ],
  },
  apis: ["./routes/*.js"], // path to your route files
};

const specs = swaggerJsdoc(options);

// ✅ Mount Swagger UI at /swagger/api
app.use("/swagger/api", swaggerUi.serve, swaggerUi.setup(specs));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/user", userRoutes);
app.use("/api/stats", statsRoutes);

// MongoDB connection + start server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log("Uploads folder served from:", uploadDir);
      console.log(
        `Swagger docs available at http://localhost:${PORT}/swagger/api`
      );
    });
  })
  .catch((err) => console.error("❌ MongoDB connection failed:", err));
