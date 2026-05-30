import express from "express";

import { AuthRoutes } from "../modules/auth/auth.route";
import { PostRoutes } from "../modules/post/post.route";
import { ReactionRoutes } from "../modules/reaction/reaction.route";
import { CommentRoutes } from "../modules/comment/comment.route";

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
  }
];

moduleRoutes.forEach((route) =>
  router.use(route.path, route.route)
);

export default router;