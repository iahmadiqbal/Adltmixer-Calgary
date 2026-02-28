import { Router } from "express";
import authRoutes from "../core/modules/auth/auth.routes";
import userRoutes from "../core/modules/user/user.routes";
import likeRoutes from "../core/modules/like/like.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/likes", likeRoutes);

router.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

export default router;
