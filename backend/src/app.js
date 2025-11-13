import dotnev from "dotenv";
dotnev.config();
import express from "express";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import cors from "cors";
import env from "./config/env.js";
import r from "./routes/auth.routes.js";
import ro from "./routes/user.routes.js";

const app = express();
app.use(express.json({ limit: "1mb" }));
app.use(helmet());
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN,
    credentials: true,
  })
);
app.use(cookieParser());

app.use("/api/auth", r);
app.use("/api/users", ro)

app.get("/health", (req, res) => res.json({ status: "ok" }));

export default app;
