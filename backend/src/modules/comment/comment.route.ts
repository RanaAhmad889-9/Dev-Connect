import express from "express";

import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";

import { CommentControllers } from "./comment.controller";
import { CommentValidation } from "./comment.validation";

const router = express.Router();

router.post(
  "/:postId",
  auth("user", "admin"),
  validateRequest(
    CommentValidation.createCommentValidationSchema
  ),
  CommentControllers.createComment
);

router.get(
  "/:postId",
  CommentControllers.getComments
);

router.patch(
  "/:commentId",
  auth("user", "admin"),
  validateRequest(
    CommentValidation.updateCommentValidationSchema
  ),
  CommentControllers.updateComment
);

router.delete(
  "/:commentId",
  auth("user", "admin"),
  CommentControllers.deleteComment
);

export const CommentRoutes = router;