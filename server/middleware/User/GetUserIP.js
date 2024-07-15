"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var router = (0, express_1.Router)();
exports.default = router.use(function (req, res, next) {
    var cloudflareIP = req.header("cf-connecting-ip");
    req.session.userIP = cloudflareIP
        ? cloudflareIP
        : req.connection.remoteAddress.replace("::ffff:", "");
    next();
});
