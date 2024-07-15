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
exports.default = default_1;
const Referrals_1 = __importDefault(require("../../database/models/Referrals"));
const User_1 = __importDefault(require("../../database/models/User"));
const makeID_1 = __importDefault(require("../../utils/makeID"));
function default_1(_a) {
    return __awaiter(this, arguments, void 0, function* ({ login, password, captcha, referrer, session, }) {
        let errors = {};
        let referralsTokens = 0;
        if (!session.captcha) {
            //If captcha is not generated then return error without checking other fields
            errors["captcha"] = "Captcha is not generated!";
            return errors;
        }
        if (captcha !== session.captcha.toLocaleLowerCase()) {
            //If captcha is wrong then return error without checking other fields
            errors["captcha"] = "Captcha is wrong!";
            return errors;
        }
        if (password.length < 6 || password.length > 32) {
            errors["password"] = "Password must be between 6 and 32 characters long!";
        }
        if (login.length < 4 || login.length > 32) {
            errors["login"] = "Login must be between 4 and 32 characters long!";
        }
        let loginAllowed = /^[a-zA-Z0-9]+$/;
        if (!loginAllowed.test(login)) {
            errors["login"] = "Login must contain only letters and numbers!";
        }
        if (referrer) {
            const referrerCode = yield Referrals_1.default.findOne({ code: referrer });
            if (!referrerCode) {
                errors["referrer"] = "Referrer not found!";
                return errors;
            }
            // @ts-ignore
            referralsTokens = referrerCode.value;
        }
        const existingUser = yield User_1.default.findOne({ login: login });
        if (existingUser) {
            errors["login"] = "Login already exists!";
        }
        if (Object.keys(errors).length > 0)
            return { errors };
        const existingIP = yield User_1.default.find({ IP: session.userIP });
        const newUser = new User_1.default({
            login,
            password,
            IP: session.userIP,
            session_id: (0, makeID_1.default)(32),
            tokens: referralsTokens,
            trust_score: existingIP.length * -1,
        });
        try {
            yield newUser.save();
            session.session_id = newUser.session_id;
        }
        catch (e) {
            return { error: "Error while saving user to database!" };
        }
        return { message: "User registered successfully!" };
    });
}
//# sourceMappingURL=register.js.map