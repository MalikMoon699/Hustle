import Stripe from "stripe";
import { STRIPE_SECRET_KEY, FRONTEND_URL } from "../config/env.js";
import User from "../models/user.model.js";

const stripe = new Stripe(STRIPE_SECRET_KEY);

export const createCheckoutSection = async (req, res) => {
  try {
    const { credits, price } = req.body;
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",

      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: `${credits} Credits`,
            },
            unit_amount: Math.round(price * 100),
          },
          quantity: 1,
        },
      ],

      metadata: {
        credits: credits,
        userId: req.user.id,
      },

      success_url: `${FRONTEND_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${FRONTEND_URL}/pricing`,
    });

    res.status(200).json({ url: session.url });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const verifyPayment = async (req, res) => {
  try {
    const { sessionId } = req.body;
    if (!sessionId)
      return res.status(400).json({ error: "Session ID missing" });

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== "paid") {
      return res.status(400).json({ error: "Payment not completed" });
    }

    const credits = Number(session.metadata.credits);
    const userId = session.metadata.userId;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });
    user.processedSessions = user.processedSessions || [];
    if (user.processedSessions.includes(sessionId)) {
      return res.status(200).json({ message: "credits already processed" });
    }

    user.credits += credits;
    user.processedSessions.push(sessionId);

    await user.save();

    res.status(200).json({ success: true, message: "Credits added successfully" });
  } catch (error) {
    console.error("Verify payment error:", error);
    res.status(500).json({ error: error.message });
  }
};