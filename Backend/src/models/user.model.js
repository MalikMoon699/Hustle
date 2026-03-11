import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    profileImg: { type: String, default: "" },
    fullName: { type: String, required: true },
    credits: { type: Number, default: 0 },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    email: { type: String, required: true },
    password: { type: String, required: true },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    otpCode: { type: String, default: null },
    otpExpires: { type: Date, default: null },
    otpVerified: { type: Boolean, default: false },
    processedSessions: { type: [String], default: [] },
  },
  { timestamps: true },
);

export default mongoose.model("User", userSchema);
