import express from "express";
import { createCheckoutSection } from "../controllers/payment.controller.js";

const router = express.Router();

router.post("/create-checkout-session", createCheckoutSection);

export default router;
