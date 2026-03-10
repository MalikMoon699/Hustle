import Stripe from "stripe";
import { STRIPE_SECRET_KEY } from "../config/env.js";

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
      },

      success_url: "http://localhost:5173/payment-success",
      cancel_url: "http://localhost:5173/pricing",
    });

    res.json({ url: session.url });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
