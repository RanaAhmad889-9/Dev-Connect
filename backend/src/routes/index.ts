import express from "express";

import { AuthRoutes } from "../modules/auth/auth.route";
import { PostRoutes } from "../modules/post/post.route";
import { ReactionRoutes } from "../modules/reaction/reaction.route";
import { CommentRoutes } from "../modules/comment/comment.route";
import { ReportRoutes } from "../modules/report/report.route";
import { UserRoutes } from "../modules/user/user.route";
import { AdminRoutes } from "../modules/admin/admin.route";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/posts",
    route: PostRoutes,
  },
  {
    path: "/reactions",
    route: ReactionRoutes,
  },
  {
    path: "/comments",
    route: CommentRoutes,
  },
  {
    path: "/users",
    route: UserRoutes,
  },
  {
    path: "/reports",
    route: ReportRoutes,
  },
  {
  path: "/admin",
  route: AdminRoutes,
}
];

moduleRoutes.forEach((route) =>
  router.use(route.path, route.route)
);

export default router;