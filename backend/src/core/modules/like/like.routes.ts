import { Router } from "express";
import { LikeController } from "./like.controller";
import { authenticate } from "../../middleware/auth.middleware";

const router = Router();

router.post("/", authenticate, LikeController.createLike);

export default router;
