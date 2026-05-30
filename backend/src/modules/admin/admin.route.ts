import express from "express";

import auth from "../../middlewares/auth";

import { AdminControllers } from "./admin.controller";

const router = express.Router();

router.get(
  "/users",
  auth("admin"),
  AdminControllers.getAllUsers
);

router.patch(
  "/users/:id/block",
  auth("admin"),
  AdminControllers.blockUser
);

router.patch(
  "/users/:id/unblock",
  auth("admin"),
  AdminControllers.unblockUser
);

router.get(
  "/dashboard",
  auth("admin"),
  AdminControllers.getDashboardStats
);


export const AdminRoutes = router;