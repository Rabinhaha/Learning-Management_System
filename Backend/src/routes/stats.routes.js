import express from "express";
import User from "../models/User.js"; // adjust path if needed
import Course from "../models/Course.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    // Count teachers, students, courses
    const teachers = await User.countDocuments({ role: "teacher" });
    const students = await User.countDocuments({ role: "student" });
    const courses = await Course.countDocuments();

    // Revenue: sum all course.amount values
    const revenueAgg = await Course.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: "$amount" },
        },
      },
    ]);
    const revenue = revenueAgg.length > 0 ? revenueAgg[0].total : 0;

    res.json({ teachers, students, courses, revenue });
  } catch (err) {
    console.error("Stats error:", err);
    res.status(500).json({ message: err.message });
  }
});

export default router;
