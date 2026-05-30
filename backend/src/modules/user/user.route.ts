import express from "express";

import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";

import { UserControllers } from "./user.controller";
import { UserValidation } from "./user.validation";

const router = express.Router();

router.get(
  "/me/posts",
  auth("user", "admin"),
  UserControllers.getMyPosts
);

router.patch(
  "/profile",
  auth("user", "admin"),
  validateRequest(
    UserValidation.updateProfileValidationSchema
  ),
  UserControllers.updateProfile
);

router.get(
  "/:id/posts",
  UserControllers.getUserPosts
);

router.get(
  "/:id",
  UserControllers.getUserProfile
);

export const UserRoutes = router;