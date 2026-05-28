export type TJwtPayload = {
  userId: string;
  email: string;
  role: "user" | "admin";
};