import Router from "express";
const router = Router();

import type {
  RequestExpess,
  ResponseExpress,
  Captcha,
} from "../types/express.js";

import generateCaptcha from "../middleware/Captcha/generateCaptcha";

router.get("/", async (req: RequestExpess, res: ResponseExpress) => {
  const captcha: Captcha = await generateCaptcha();
  console.log(req.body.ip);
  return res.status(200).send(captcha.data);
});

export default router;
