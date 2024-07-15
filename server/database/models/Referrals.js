"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var Referrals = new mongoose_1.default.Schema({
    code: { type: String },
    referrer: { type: String },
    value: { type: String },
});
exports.default = mongoose_1.default.model("Referrals", Referrals);
