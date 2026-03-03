import { Router } from "express";
import { MessageController } from "./message.controller";
import { authenticate } from "../../middleware/auth.middleware";

const router = Router();

router.post("/", authenticate, MessageController.sendMessage);
router.get(
  "/match/:otherUserId",
  authenticate,
  MessageController.getMatchByUsers,
);
router.get("/:matchId", authenticate, MessageController.getMessagesByMatch);
router.get(
  "/conversations/all",
  authenticate,
  MessageController.getConversations,
);

export default router;
