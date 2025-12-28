import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User.js";
import Course from "./models/Course.js";

dotenv.config();

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected");

    // Clear existing data
    await User.deleteMany({});
    await Course.deleteMany({});

    // Create users
    const admin = await User.create({
      name: "Admin User",
      email: "admin@test.com",
      password: "admin1234",
      role: "admin",
    });

    const teacher = await User.create({
      name: "Teacher User",
      email: "teacher@test.com",
      password: "teacher1234",
      role: "teacher",
    });

    const student = await User.create({
      name: "Student User",
      email: "student@test.com",
      password: "student1234",
      role: "student",
    });

    // ✅ Use teacher._id instead of "<teacherId>"
    await Course.create({
      title: "Math 101",
      description: "Basic math",
      amount: 100,
      instructor: teacher._id,
    });

    console.log("✅ Seed complete");
    process.exit();
  } catch (err) {
    console.error("❌ Seed failed:", err);
    process.exit(1);
  }
}

seed();
