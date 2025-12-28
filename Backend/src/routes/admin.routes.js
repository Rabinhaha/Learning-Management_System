import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import adminOnly from "../middlewares/admin.middleware.js";

import User from "../models/User.js";
import Course from "../models/Course.js";

const router = express.Router();

// 🔐 Protect all admin routes
router.use(authMiddleware, adminOnly);

// =======================
// User Management
// =======================

// Get all users
router.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Error fetching users" });
  }
});

// Create user
router.post("/users", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.json(user);
  } catch (err) {
    res.status(400).json({ message: "Error creating user" });
  }
});

// Update user
router.put("/users/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(user);
  } catch (err) {
    res.status(400).json({ message: "Error updating user" });
  }
});

// Delete user
router.delete("/users/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(400).json({ message: "Error deleting user" });
  }
});

// =======================
// Course Management
// =======================

// Get all courses
router.get("/courses", async (req, res) => {
  try {
    const courses = await Course.find().populate("instructor", "name email");
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: "Error fetching courses" });
  }
});

// Update course
router.put("/courses/:id", async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(course);
  } catch (err) {
    res.status(400).json({ message: "Error updating course" });
  }
});

// Delete course
router.delete("/courses/:id", async (req, res) => {
  try {
    await Course.findByIdAndDelete(req.params.id);
    res.json({ message: "Course deleted" });
  } catch (err) {
    res.status(400).json({ message: "Error deleting course" });
  }
});

export default router;
