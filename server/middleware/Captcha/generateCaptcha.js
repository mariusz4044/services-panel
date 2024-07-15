"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = generateCaptcha;
const svg_captcha_1 = __importDefault(require("svg-captcha"));
const sharp_1 = __importDefault(require("sharp"));
const buffer_1 = require("buffer");
function generateCaptcha(req) {
    return __awaiter(this, void 0, void 0, function* () {
        const captcha = svg_captcha_1.default.create({
            width: 220,
            height: 80,
            background: `transparent`,
            noise: 5,
        });
        req.session.captcha = captcha.text.toLocaleLowerCase();
        const pngImage = yield (0, sharp_1.default)(buffer_1.Buffer.from(captcha.data)).png().toBuffer();
        return {
            data: `data:image/png;base64,${pngImage.toString("base64")}`,
            answer: captcha.text,
        };
    });
}
//# sourceMappingURL=generateCaptcha.js.map