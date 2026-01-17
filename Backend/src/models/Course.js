import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    amount: { type: Number, required: true, min: 1 },
    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    imageUrl: { type: String }, // Cloudinary secure URL
    imagePublicId: { type: String }, // Cloudinary public_id

    // 👇 Track which students bought this course
    purchasers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

// Virtual field for formatted price
courseSchema.virtual("formattedAmount").get(function () {
  return `NPR ${this.amount}`;
});

export default mongoose.model("Course", courseSchema);
