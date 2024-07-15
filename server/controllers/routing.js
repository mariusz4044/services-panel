"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startServer = void 0;
var dotenv_1 = require("dotenv");
var express_1 = require("express");
var express_session_1 = require("express-session");
var cors_1 = require("cors");
// @ts-ignore
var connect_mongodb_session_1 = require("connect-mongodb-session");
var MongoDBStore = (0, connect_mongodb_session_1.default)(express_session_1.default);
var store = new MongoDBStore({
    uri: process.env.DATABASE_URL,
    collection: "sessions",
});
var router = express_1.default.Router();
var app = (0, express_1.default)();
var port = process.env.PORT || "3000";
dotenv_1.default.config();
//Express Additional config
app.use(express_1.default.json({ limit: "1mb" }));
app.use((0, cors_1.default)({
    methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
    credentials: true,
}));
//Configuring express-session with MongoDBStore
app.use((0, express_session_1.default)({
    secret: process.env.SESSION_SECRET,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true, // 1 week expiration
    },
    store: store,
    saveUninitialized: false,
    resave: false,
}));
//Import routes
var GetUserIP_1 = require("../middleware/User/GetUserIP");
var captcha_1 = require("../routes/captcha");
var register_1 = require("../routes/register");
//Routes middleware
app.use("/", GetUserIP_1.default);
//Static routes
app.use("/captcha", captcha_1.default);
app.use("/register", register_1.default);
var startServer = function () {
    app.listen(port, function () {
        console.log("[server]: Server is running at http://localhost:".concat(port));
    });
};
exports.startServer = startServer;
