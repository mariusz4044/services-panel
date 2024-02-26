import { Router } from "express";
import type { RequestExpess, ResponseExpress } from "../../types/express.js";

const router = Router();

router.use((req: RequestExpess, res: ResponseExpress, next: any): void => {
  const cloudflareIP = req.header("cf-connecting-ip");

  req.body.ip = cloudflareIP
    ? cloudflareIP
    : req.connection.remoteAddress.replace("::ffff:", "");

  next();
});

export default router;
