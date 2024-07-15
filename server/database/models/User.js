"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var Users = new mongoose_1.default.Schema({
    login: { type: String },
    password: { type: String },
    IP: { type: String },
    session_id: { type: String },
    tokens: { type: Number, default: 0 },
    rank: { type: String, default: "USER" },
    trust_score: { type: Number, default: 0 },
});
exports.default = mongoose_1.default.model("User", Users);
