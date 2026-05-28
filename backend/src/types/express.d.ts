import { TJwtPayload } from "../interfaces/jwt.types";

declare global {
  namespace Express {
    interface Request {
      user: TJwtPayload;
    }
  }
}

export {};