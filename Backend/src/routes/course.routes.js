import express from "express";
import Course from "../models/Course.js";
import User from "../models/User.js"; // ✅ import User model
import authMiddleware from "../middlewares/auth.middleware.js";
import upload from "../middlewares/upload.middleware.js"; // ✅ Cloudinary multer storage

const router = express.Router();

// Create course (teacher only)
router.post("/", authMiddleware, upload.single("image"), async (req, res) => {
  try {
    if (req.user.role !== "teacher") {
      return res
        .status(403)
        .json({ message: "Only teachers can create courses" });
    }

    const { title, description, amount } = req.body;

    // ✅ Cloudinary returns `req.file.path` (secure URL) and `req.file.filename` (public_id)
    const course = new Course({
      title,
      description,
      amount: Number(amount),
      instructor: req.user.id,
      imageUrl: req.file ? req.file.path : null, // secure URL
      imagePublicId: req.file ? req.file.filename : null, // public_id
    });

    await course.save();
    res.status(201).json(course);
  } catch (err) {
    console.error("Course creation error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get all courses (populate instructor)
router.get("/", async (req, res) => {
  try {
    const courses = await Course.find().populate("instructor", "name email");
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get single course by ID (populate instructor)
router.get("/:id", async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate(
      "instructor",
      "name email"
    );
    if (!course) return res.status(404).json({ message: "Course not found" });
    res.json(course);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Buy course (student only)
router.post("/:id/buy", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "student") {
      return res.status(403).json({ message: "Only students can buy courses" });
    }

    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: "Course not found" });

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Add course to student's purchased list
    if (!user.purchasedCourses.includes(course._id)) {
      user.purchasedCourses.push(course._id);
      await user.save();
    }

    res.json({ message: "Course purchased successfully", course });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
