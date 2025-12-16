import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import courseRoutes from "./routes/course.routes.js";

const app = express();

app.use(
  cors({
    origin: [
      "https://your-frontend-name.vercel.app", // ✅ your actual Vercel URL
      "http://localhost:5173", // for local testing
    ],
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("✅ Backend is running!");
});

app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);

export default app;
