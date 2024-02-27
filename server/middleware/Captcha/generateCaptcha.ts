import svgCaptcha from "svg-captcha";
import type { Captcha } from "../../types/express";
import sharp from "sharp";
import { Buffer } from "buffer";

export default async function generateCaptcha(req): Promise<Captcha> {
  const captcha: svgCaptcha.CaptchaObj = svgCaptcha.create({
    width: 208,
    height: 80,
    background: `transparent`,
    noise: 6,
  });

  req.session.captcha = captcha.text.toLocaleLowerCase();

  const pngImage = await sharp(Buffer.from(captcha.data)).png().toBuffer();

  return {
    data: `data:image/png;base64,${pngImage.toString("base64")}`,
    answer: captcha.text,
  };
}
