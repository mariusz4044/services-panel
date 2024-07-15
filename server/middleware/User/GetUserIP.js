"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
exports.default = router.use((req, res, next) => {
    const cloudflareIP = req.header("cf-connecting-ip");
    req.session.userIP = cloudflareIP
        ? cloudflareIP
        : req.connection.remoteAddress.replace("::ffff:", "");
    next();
});
//# sourceMappingURL=GetUserIP.js.map