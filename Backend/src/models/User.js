import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      index: true,
    },
    password: { type: String, required: true, minlength: 8 },
    role: {
      type: String,
      enum: ["student", "teacher", "admin"],
      required: true,
      index: true,
    },

    // Teacher-specific fields
    masterCourse: { type: String, trim: true },
    status: {
      type: String,
      enum: ["pending", "approved", "in-progress", "denied"],
      default: "pending",
    },
    idCardImage: { type: String },

    // ✅ Track courses purchased by this student
    purchasedCourses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        default: [], // ensure empty array by default
      },
    ],
  },
  { timestamps: true }
);

// 🔒 Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// 🔑 Compare password method
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// 👨‍🏫 Approve teacher helper
userSchema.methods.approveTeacher = async function () {
  this.status = "approved";
  return this.save();
};

const User = mongoose.model("User", userSchema);
export default User;
