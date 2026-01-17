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

// ✅ Create course (teacher only)
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

// ✅ Get all courses
router.get("/", async (req, res) => {
  try {
    const courses = await Course.find().populate("instructor", "name email");
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Get all courses created by the logged-in teacher (with purchasers)
// ⚠️ Put this BEFORE the dynamic `/:id` route
router.get("/instructor", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "teacher") {
      return res
        .status(403)
        .json({ message: "Only teachers can view their courses" });
    }

    const courses = await Course.find({ instructor: req.user.id })
      .populate("instructor", "name email")
      .populate("purchasers", "name email");

    res.json(courses);
  } catch (err) {
    console.error("Error fetching instructor courses:", err);
    res.status(500).json({ message: err.message });
  }
});

// ✅ Get single course by ID (with alreadyPurchased flag for students)
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate(
      "instructor",
      "name email"
    );
    if (!course) return res.status(404).json({ message: "Course not found" });

    let alreadyPurchased = false;
    if (req.user.role === "student") {
      const user = await User.findById(req.user.id);
      if (user && user.purchasedCourses.some((id) => id.equals(course._id))) {
        alreadyPurchased = true;
      }
    }

    res.json({ ...course.toObject(), alreadyPurchased });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Buy course (student only) → updates both user and course
router.post("/:id/buy", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "student") {
      return res.status(403).json({ message: "Only students can buy courses" });
    }

    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: "Course not found" });

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Add course to student's purchases
    if (!user.purchasedCourses.some((id) => id.equals(course._id))) {
      user.purchasedCourses.push(course._id);
      await user.save();
    }

    // Add student to course purchasers
    if (!course.purchasers.some((id) => id.equals(user._id))) {
      course.purchasers.push(user._id);
      await course.save();
    }

    res.json({ message: "Course purchased successfully", course });
  } catch (err) {
    console.error("Purchase error:", err);
    res.status(500).json({ message: err.message });
  }
});

// ✅ Get all students who purchased a specific course
router.get("/:id/purchasers", authMiddleware, async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate(
      "purchasers",
      "name email role"
    );
    if (!course) return res.status(404).json({ message: "Course not found" });

    res.json({ course: course.title, purchasers: course.purchasers });
  } catch (err) {
    console.error("Error fetching purchasers:", err);
    res.status(500).json({ message: err.message });
  }
});

export default router;
