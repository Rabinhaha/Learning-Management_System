import express from "express";
import Course from "../models/Course.js";
import User from "../models/User.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import upload from "../middlewares/upload.middleware.js";

const router = express.Router();

// ✅ Get all courses purchased by the logged-in student
router.get("/my/purchases", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "student") {
      return res
        .status(403)
        .json({ message: "Only students can view their purchases" });
    }

    const user = await User.findById(req.user.id).populate({
      path: "purchasedCourses",
      populate: { path: "instructor", select: "name email" },
    });

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user.purchasedCourses);
  } catch (err) {
    console.error("Error in /my/purchases:", err);
    res.status(500).json({ message: err.message });
  }
});

// Create course (teacher only)
router.post("/", authMiddleware, upload.single("image"), async (req, res) => {
  try {
    if (req.user.role !== "teacher") {
      return res
        .status(403)
        .json({ message: "Only teachers can create courses" });
    }

    const { title, description, amount } = req.body;

    const course = new Course({
      title,
      description,
      amount: Number(amount),
      instructor: req.user.id,
      imageUrl: req.file ? req.file.path : null,
      imagePublicId: req.file ? req.file.filename : null,
    });

    await course.save();
    res.status(201).json(course);
  } catch (err) {
    console.error("Course creation error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get all courses
router.get("/", async (req, res) => {
  try {
    const courses = await Course.find().populate("instructor", "name email");
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get single course by ID
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

    if (!Array.isArray(user.purchasedCourses)) {
      user.purchasedCourses = [];
    }

    if (!user.purchasedCourses.includes(course._id)) {
      user.purchasedCourses.push(course._id);
      await user.save();
    }

    res.json({ message: "Course purchased successfully", course });
  } catch (err) {
    console.error("Purchase error:", err);
    res.status(500).json({ message: err.message });
  }
});

// Get all students who purchased a specific course
router.get("/:id/purchasers", authMiddleware, async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: "Course not found" });

    const purchasers = await User.find({ purchasedCourses: course._id }).select(
      "name email role"
    );

    res.json({ course: course.title, purchasers });
  } catch (err) {
    console.error("Error fetching purchasers:", err);
    res.status(500).json({ message: err.message });
  }
});

export default router;
