import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import upload from "../middlewares/upload.middleware.js";
import User from "../models/User.js";

const router = express.Router();

// Teacher profile submission (approval workflow)
router.post(
  "/teacher/profile", // ✅ no duplicate /user
  authMiddleware,
  upload.single("idCardImage"),
  async (req, res) => {
    try {
      console.log("File received:", req.file);
      console.log("Body:", req.body);

      const updates = {
        name: req.body.name,
        email: req.body.email,
        masterCourse: req.body.masterCourse,
        status: "pending",
      };

      if (req.file) {
        updates.idCardImage = req.file.filename;
      }

      const updated = await User.findByIdAndUpdate(req.user.id, updates, {
        new: true,
      });

      if (!updated) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json({ message: "Profile submitted", user: updated });
    } catch (err) {
      console.error("Error submitting profile:", err);
      res
        .status(500)
        .json({ message: "Error submitting profile", error: err.message });
    }
  }
);

// Generic user profile update (students/admin)
router.put(
  "/profile", // ✅ no duplicate /user
  authMiddleware,
  upload.none(),
  async (req, res) => {
    try {
      const updates = {
        name: req.body.name,
        email: req.body.email,
      };

      const updated = await User.findByIdAndUpdate(req.user._id, updates, {
        new: true,
      });

      if (!updated) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json({ message: "Profile updated successfully", user: updated });
    } catch (err) {
      console.error("Error updating profile:", err);
      res
        .status(500)
        .json({ message: "Error updating profile", error: err.message });
    }
  }
);

export default router;
