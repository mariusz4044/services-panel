"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Referrals = new mongoose_1.default.Schema({
    code: { type: String },
    referrer: { type: String },
    value: { type: String },
});
exports.default = mongoose_1.default.model("Referrals", Referrals);
//# sourceMappingURL=Referrals.js.map