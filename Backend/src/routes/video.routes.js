import express from "express";
import {
  genPrompt,
  genVoice,
  genCaption,
  getVideoClips,
  getImageClips,
  genImage,
  uploadVideoData,
  generateVideoWithRunway,
  generateVideoWithDreamMachine,
  generateVideoWithFal,
} from "../controllers/video.controller.js";

const router = express.Router();

router.post("/generate-prompt", genPrompt);
router.post("/generate-voice", genVoice);
router.post("/generate-caption", genCaption);
router.get("/get-videoclips", getVideoClips);
router.get("/get-imageclips", getImageClips);
router.post("/generate-image", genImage);
router.post("/upload-videoData", uploadVideoData);
router.post("/generate-video/runway", generateVideoWithRunway);
router.post("/generate-video/dream-machine", generateVideoWithDreamMachine);
router.post("/generate-video/fal", generateVideoWithFal);

export default router;
