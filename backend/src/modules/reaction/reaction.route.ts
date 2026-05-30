import express from "express";

import auth from "../../middlewares/auth";

import { ReactionControllers } from "./reaction.controller";

const router = express.Router();

router.post(
  "/:postId",
  auth("user", "admin"),
  ReactionControllers.addReaction
);

router.delete(
  "/:postId",
  auth("user", "admin"),
  ReactionControllers.removeReaction
);

router.get(
  "/:postId/count",
  ReactionControllers.getReactionCount
);

export const ReactionRoutes = router;