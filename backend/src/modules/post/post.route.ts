import express from "express";

import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";

import { PostControllers } from "./post.controller";
import { PostValidation } from "./post.validation";

const router = express.Router();

router.post(
  "/",
  auth("user", "admin"),
  validateRequest(PostValidation.createPostValidationSchema),
  PostControllers.createPost
);

router.get("/", PostControllers.getAllPosts);

router.get("/:id", PostControllers.getSinglePost);

router.patch(
  "/:id",
  auth("user", "admin"),
  validateRequest(PostValidation.updatePostValidationSchema),
  PostControllers.updatePost
);

router.delete(
  "/:id",
  auth("user", "admin"),
  PostControllers.deletePost
);

export const PostRoutes = router;