// @ts-ignore
import svgCaptcha from "svg-captcha";
import type { Captcha } from "../../types/express";

export default async function generateCaptcha(): Promise<Captcha> {
  const captcha: svgCaptcha.CaptchaObj = svgCaptcha.create({
    width: 208,
    height: 80,
    background: `transparent`,
    noise: 96,
  });

  return {
    data: captcha.data,
    answer: "test",
  };
}
