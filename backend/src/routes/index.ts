import { Router } from "express";
import authRoutes from "../core/modules/auth/auth.routes";

const router = Router();

router.use("/auth", authRoutes);

router.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

export default router;