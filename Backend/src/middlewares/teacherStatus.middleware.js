// middlewares/teacherStatus.middleware.js
import User from "../models/User.js";

export default async function checkTeacherApproved(req, res, next) {
  try {
    const teacher = await User.findById(req.user._id);
    if (!teacher) return res.status(404).json({ message: "User not found" });

    if (teacher.role !== "teacher") {
      return res
        .status(403)
        .json({ message: "Only teachers can create courses" });
    }

    if (teacher.status !== "approved") {
      return res
        .status(403)
        .json({ message: "Teacher profile not approved yet" });
    }

    next(); // ✅ teacher is approved, allow course creation
  } catch (err) {
    res.status(500).json({ message: "Error checking teacher status" });
  }
}
