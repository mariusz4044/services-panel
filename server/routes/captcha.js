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
const express_1 = __importDefault(require("express"));
const router = (0, express_1.default)();
const generateCaptcha_1 = __importDefault(require("../middleware/Captcha/generateCaptcha"));
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const captcha = yield (0, generateCaptcha_1.default)(req);
    const data = captcha.data.replace(/^data:image\/(png|jpeg|jpg);base64,/, "");
    const img = Buffer.from(data, "base64");
    res.setHeader("Content-Type", "image/png");
    res.writeHead(200, {
        "Content-Type": "image/png",
        "Content-Length": img.length,
    });
    return res.end(img);
}));
exports.default = router;
//# sourceMappingURL=captcha.js.map