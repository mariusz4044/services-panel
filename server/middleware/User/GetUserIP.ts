import { Router } from "express";

const router = Router();

declare module "express-session" {
  export interface SessionData {
    userIP: string;
  }
}

export default router.use((req, res, next): void => {
  const cloudflareIP: string = req.header("cf-connecting-ip");

  req.session.userIP = cloudflareIP
    ? cloudflareIP
    : req.connection.remoteAddress.replace("::ffff:", "");

  next();
});
