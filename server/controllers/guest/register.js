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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
var Referrals_1 = require("../../database/models/Referrals");
var User_1 = require("../../database/models/User");
function makeid(length) {
    var result = "";
    var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
function default_1(_a) {
    return __awaiter(this, arguments, void 0, function (_b) {
        var errors, referralsTokens, loginAllowed, referrerCode, existingUser, existingIP, newUser, e_1;
        var login = _b.login, password = _b.password, captcha = _b.captcha, referrer = _b.referrer, session = _b.session;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    errors = {};
                    referralsTokens = 0;
                    if (!session.captcha) {
                        //If captcha is not generated then return error without checking other fields
                        errors["captcha"] = "Captcha is not generated!";
                        return [2 /*return*/, errors];
                    }
                    if (captcha !== session.captcha.toLocaleLowerCase()) {
                        //If captch is wrong then return error without checking other fields
                        errors["captcha"] = "Captcha is wrong!";
                        return [2 /*return*/, errors];
                    }
                    if (password.length < 6 || password.length > 32) {
                        errors["password"] = "Password must be between 6 and 32 characters long!";
                    }
                    if (login.length < 4 || login.length > 32) {
                        errors["login"] = "Login must be between 4 and 32 characters long!";
                    }
                    loginAllowed = /^[a-zA-Z0-9]+$/;
                    if (!loginAllowed.test(login)) {
                        errors["login"] = "Login must contain only letters and numbers!";
                    }
                    if (!referrer) return [3 /*break*/, 2];
                    return [4 /*yield*/, Referrals_1.default.findOne({ code: referrer })];
                case 1:
                    referrerCode = _c.sent();
                    if (!referrerCode) {
                        errors["referrer"] = "Referrer not found!";
                        return [2 /*return*/, errors];
                    }
                    // @ts-ignore
                    referralsTokens = referrerCode.value;
                    _c.label = 2;
                case 2: return [4 /*yield*/, User_1.default.findOne({ login: login })];
                case 3:
                    existingUser = _c.sent();
                    if (existingUser) {
                        errors["login"] = "Login already exists!";
                    }
                    if (Object.keys(errors).length > 0)
                        return [2 /*return*/, { errors: errors }];
                    return [4 /*yield*/, User_1.default.find({ IP: session.userIP })];
                case 4:
                    existingIP = _c.sent();
                    newUser = new User_1.default({
                        login: login,
                        password: password,
                        IP: session.userIP,
                        session_id: makeid(32),
                        tokens: referralsTokens,
                        trust_score: existingIP.length * -1,
                    });
                    _c.label = 5;
                case 5:
                    _c.trys.push([5, 7, , 8]);
                    return [4 /*yield*/, newUser.save()];
                case 6:
                    _c.sent();
                    session.session_id = newUser.session_id;
                    return [3 /*break*/, 8];
                case 7:
                    e_1 = _c.sent();
                    return [2 /*return*/, { error: "Error while saving user to database!" }];
                case 8: return [2 /*return*/, { message: "User registered successfully!" }];
            }
        });
    });
}
