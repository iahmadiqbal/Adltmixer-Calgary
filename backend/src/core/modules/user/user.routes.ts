import { Router } from "express";
import { UserController } from "./user.controller";
import { authenticate } from "../../middleware/auth.middleware";

const router = Router();

router.get("/me/profile", authenticate, UserController.getMyProfile);
router.patch("/me/profile", authenticate, UserController.updateMyProfile);
router.get("/discover", authenticate, UserController.discoverUsers);
router.get("/matches", authenticate, UserController.getMatches);
router.get("/:id", authenticate, UserController.getUserById);
export default router;
