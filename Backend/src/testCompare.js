import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User.js";

dotenv.config();

async function test() {
  await mongoose.connect(process.env.MONGO_URI);
  const user = await User.findOne({ email: "admin@test.com" });
  const isMatch = await user.comparePassword("admin1234");
  console.log("Password matches:", isMatch);
  process.exit();
}

test();
