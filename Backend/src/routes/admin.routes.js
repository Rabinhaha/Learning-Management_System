import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import adminOnly from "../middlewares/admin.middleware.js";
import User from "../models/User.js";

const router = express.Router();

// 🔐 Protect all admin routes
router.use(authMiddleware, adminOnly);

// =======================
// Teacher Management
// =======================

// Get all teachers
router.get("/teachers", async (req, res) => {
  try {
    const teachers = await User.find({ role: "teacher" });
    res.json(teachers);
  } catch (err) {
    console.error("Error fetching teachers:", err);
    res.status(500).json({ message: "Error fetching teachers" });
  }
});

// Create teacher
router.post("/teachers", async (req, res) => {
  try {
    const { name, email, masterCourse, password } = req.body;

    const teacher = new User({
      name,
      email,
      masterCourse,
      password,
      role: "teacher",
      status: "pending",
    });

    await teacher.save();
    res.json(teacher);
  } catch (err) {
    console.error("Error creating teacher:", err);
    res
      .status(400)
      .json({ message: "Error creating teacher", error: err.message });
  }
});

// Update teacher status
router.patch("/teachers/:id/status", async (req, res) => {
  try {
    const { status } = req.body;
    const teacher = await User.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.json(teacher);
  } catch (err) {
    console.error("Error updating teacher status:", err);
    res
      .status(400)
      .json({ message: "Error updating teacher status", error: err.message });
  }
});

// Get all students
router.get("/students", async (req, res) => {
  try {
    const students = await User.find({ role: "student" });
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: "Error fetching students" });
  }
});

// Update student status
router.patch("/students/:id/status", async (req, res) => {
  try {
    const { status } = req.body;
    const student = await User.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.json(student);
  } catch (err) {
    res.status(400).json({ message: "Error updating student status" });
  }
});
// Create user (generic)
router.post("/users", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.json(user);
  } catch (err) {
    console.error("Error creating user:", err);
    res
      .status(400)
      .json({ message: "Error creating user", error: err.message });
  }
});

export default router;
