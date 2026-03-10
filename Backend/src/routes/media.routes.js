import express from "express";
import { upload } from "../middlewares/media.middleware.js";
import {
  uploadMedia,
  getMediaById,
} from "../controllers/media.controller.js";

const router = express.Router();

router.post("/upload-media", upload.single("file"), uploadMedia);
router.get("/get-media/:id", getMediaById);

export default router;
