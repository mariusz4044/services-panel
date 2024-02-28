import Router from "express";
const router = Router();

import type { Captcha } from "../types/express.js";

import generateCaptcha from "../middleware/Captcha/generateCaptcha";

router.get("/", async (req, res) => {
  const captcha: Captcha = await generateCaptcha(req);

  const data = captcha.data.replace(/^data:image\/(png|jpeg|jpg);base64,/, "");
  const img = Buffer.from(data, "base64");

  res.setHeader("Content-Type", "image/png");
  res.writeHead(200, {
    "Content-Type": "image/png",
    "Content-Length": img.length,
  });

  return res.end(img);
});

export default router;
