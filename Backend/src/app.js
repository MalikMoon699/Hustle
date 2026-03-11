import { PORT } from "./config/env.js";

import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";

import authRoute from "./routes/auth.routes.js";
import mediaRoute from "./routes/media.routes.js";
import videoRoute from "./routes/video.routes.js";
import paymrntRoute from "./routes/payment.routes.js";
import connectToDB from "./database/mongodb.js";

const app = express();
connectToDB();

app.use(cors());

app.use(
  cors({ origin: "https://hustle-ai-short.vercel.app", credentials: true }),
);

app.use(
  cors({
    origin: (origin, callback) => {
      callback(null, true);
    },
    credentials: true,
  }),
);

app.use(morgan("dev"));

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/video", videoRoute);
app.use("/api/media", mediaRoute);
app.use("/api/payment", paymrntRoute);

app.get("/", (req, res) => {
  res.send("Welcome to the Server API");
});

app.listen(PORT, async () => {
  await connectToDB();
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;
