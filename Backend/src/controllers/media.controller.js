import Media from "../models/media.model.js";
import { getBucket } from "../config/gridfs.js";
import { Readable } from "stream";
import { Backend_Url } from "../config/env.js";

export const uploadMedia = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const bucket = getBucket();

    const readableStream = Readable.from(req.file.buffer);

    const uploadStream = bucket.openUploadStream(req.file.originalname, {
      contentType: req.file.mimetype,
    });

    readableStream.pipe(uploadStream);

    uploadStream.on("finish", async () => {
      const newMedia = await Media.create({
        filename: req.file.originalname,
        contentType: req.file.mimetype,
        size: req.file.size,
        gridfsId: uploadStream.id,
      });

      res.status(201).json({
        message: "File uploaded successfully",
        fileId: newMedia._id,
        fileUrl: `${Backend_Url}/api/media/get-media/${newMedia._id}`,
      });
    });

    uploadStream.on("error", (err) => {
      res.status(500).json({ message: err.message });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMediaById = async (req, res) => {
  try {
    const media = await Media.findById(req.params.id);
    if (!media) {
      return res.status(404).json({ message: "File not found" });
    }

    const bucket = getBucket();

    res.set("Content-Type", media.contentType);

    const downloadStream = bucket.openDownloadStream(media.gridfsId);

    downloadStream.pipe(res);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
