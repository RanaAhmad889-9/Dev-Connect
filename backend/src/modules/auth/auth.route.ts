import express from "express";

import validateRequest from "../../middlewares/validateRequest";

import { AuthControllers } from "./auth.controller";
import { AuthValidation } from "./auth.validation";
import auth from "../../middlewares/auth";
import { authLimiter } from "../../middlewares/rateLimiter";

const router = express.Router();

router.post(
  "/register",
   authLimiter,
  validateRequest(AuthValidation.registerValidationSchema),
  AuthControllers.registerUser
);


router.post(
  "/login",
   authLimiter,
  validateRequest(AuthValidation.loginValidationSchema),
  AuthControllers.loginUser
);

router.get(
  "/me",
  auth("user", "admin"),
  AuthControllers.getMe
);

export const AuthRoutes = router;