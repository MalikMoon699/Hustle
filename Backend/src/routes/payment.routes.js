import express from "express";
import {
  createCheckoutSection,
  verifyPayment,
} from "../controllers/payment.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/create-checkout-session", verifyToken, createCheckoutSection);
router.post("/verify-payment", verifyToken, verifyPayment);

export default router;
