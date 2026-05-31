import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

import AppError from "../utils/AppError";

import { env } from "../config/env";
import { TJwtPayload } from "../interfaces/jwt.types";
import { UserRole } from "../modules/auth/auth.interface";
import { User } from "../modules/auth/auth.model";

const auth =
  (...requiredRoles: UserRole[]) =>
    async (req: Request, _res: Response, next: NextFunction) => {
      try {
        // get authorization header
        const authorization = req.headers.authorization;

        if (!authorization) {
          throw new AppError(401, "You are not authorized");
        }

        // extract bearer token
        const token = authorization.split(" ")[1];

        if (!token) {
          throw new AppError(401, "Invalid token");
        }

        // verify token
        const verifiedToken = jwt.verify(
          token,
          env.JWT_ACCESS_SECRET
        ) as JwtPayload & TJwtPayload;


        const user = await User.findById(
          verifiedToken.userId
        );

        if (!user) {
          throw new AppError(
            404,
            "User not found"
          );
        }

        if (user.isBlocked) {
          throw new AppError(
            403,
            "User is blocked"
          );
        }

        // set user into request
        req.user = verifiedToken;

        // role checking
        if (
          requiredRoles.length &&
          !requiredRoles.includes(verifiedToken.role)
        ) {
          throw new AppError(403, "Forbidden access");
        }

        next();
      } catch (error) {
        next(error);
      }
    };

export default auth;