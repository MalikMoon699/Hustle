// src/models/video.model.js
import mongoose from "mongoose";

const videoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: "",
    },
    duration: {
      type: String,
      default: "",
    },
    fullContent: {
      type: String,
      default: "",
    },
    voiceUrl: {
      type: String,
      default: "",
    },
    captions: {
      type: Object,
      default: {},
    },
    scenes: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
  },
);

const Video = mongoose.model("Video", videoSchema);

export default Video;
