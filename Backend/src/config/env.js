import dotenv from "dotenv";

dotenv.config({ path: `.env.${process.env.NODE_ENV || "development"}.local` });

export const {
  NODE_ENV,
  DB_URI,
  PORT,
  Backend_Url,
  JWT_SECRET,
  EMAIL_HOST,
  EMAIL_PORT,
  EMAIL_USER,
  EMAIL_PASS,
  FRONTEND_URL,
  ELEVENLABS_API_KEY,
  CLAUDE_API_KEY,
  ASSEMBLYAI_API_KEY,
  REPLICATE_API_KEY,
  PEXELS_API_KEY,
  RUNWAY_API_KEY,
  DREAM_MACHINE_API_KEY,
  FAL_AI_API_KEY,
  STRIPE_SECRET_KEY,
} = process.env;
