import express from "express";

import validateRequest from "../../middlewares/validateRequest";

import { AuthControllers } from "./auth.controller";
import { AuthValidation } from "./auth.validation";
import auth from "../../middlewares/auth";

const router = express.Router();

router.post(
  "/register",
  validateRequest(AuthValidation.registerValidationSchema),
  AuthControllers.registerUser
);


router.post(
  "/login",
  validateRequest(AuthValidation.loginValidationSchema),
  AuthControllers.loginUser
);

router.get(
  "/me",
  auth("user", "admin"),
  AuthControllers.getMe
);

export const AuthRoutes = router;