import Router from "express";
const router = Router();

import type { Captcha } from "../types/express.js";

import generateCaptcha from "../middleware/Captcha/generateCaptcha";

router.get("/", async (req, res) => {
  const captcha: Captcha = await generateCaptcha(req);
  console.log(req.session);
  res.setHeader("Content-Type", "text/html");
  return res.status(200).end(`<img src="${captcha.data}" alt="captcha">`);
});

export default router;
