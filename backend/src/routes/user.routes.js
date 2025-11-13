import { Router } from "express";
import { me } from "../controllers/user.controller.js";
import { requireAuth } from "../middlewares/auth.js";

const ro = Router();

ro.get("/me", requireAuth(), me);
ro.get("/admin/ping", requireAuth(["admin"]), (req, res) =>
  res.json({ ok: true })
);

export default ro;
