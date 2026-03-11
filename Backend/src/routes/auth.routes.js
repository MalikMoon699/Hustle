// src/routes/auth.routes.js
import express from "express";
import {
  signUp,
  login,
  getLoggedUserData,
  getUserDetailsById,
  updateUser,
  updatePassword,
  forgetPassword,
  otpCheck,
  newPassword,
} from "../controllers/auth.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/signup", signUp);
router.post("/login", login);
router.get("/logged-user-data", verifyToken, getLoggedUserData);
router.get("/getUserDetailsById/:userId", verifyToken, getUserDetailsById);
router.patch("/:userId", verifyToken, updateUser);
router.patch("/updatePassword/:userId", verifyToken, updatePassword);
router.post("/forget-password", forgetPassword);
router.post("/otp-check", otpCheck);
router.post("/new-password", newPassword);

export default router;
