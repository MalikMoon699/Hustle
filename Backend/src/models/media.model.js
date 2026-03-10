import mongoose from "mongoose";

const mediaSchema = new mongoose.Schema(
  {
    filename: { type: String, required: true },
    contentType: { type: String, required: true },
    size: { type: Number, required: true },
    gridfsId: { type: mongoose.Schema.Types.ObjectId, required: true },
  },
  { timestamps: true },
);

export default mongoose.model("Media", mediaSchema);
