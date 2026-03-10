import mongoose from "mongoose";
import { GridFSBucket } from "mongodb";

let bucket;

export const initGridFS = () => {
  const db = mongoose.connection.db;
  bucket = new GridFSBucket(db, {
    bucketName: "media",
  });
};

export const getBucket = () => bucket;
