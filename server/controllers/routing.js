"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startServer = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const cors_1 = __importDefault(require("cors"));
// @ts-ignore
const connect_mongodb_session_1 = __importDefault(require("connect-mongodb-session"));
const MongoDBStore = (0, connect_mongodb_session_1.default)(express_session_1.default);
const store = new MongoDBStore({
    uri: process.env.DATABASE_URL,
    collection: "sessions",
});
const router = express_1.default.Router();
const app = (0, express_1.default)();
const port = process.env.PORT || "3000";
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
const GetUserIP_1 = __importDefault(require("../middleware/User/GetUserIP"));
const captcha_1 = __importDefault(require("../routes/captcha"));
const register_1 = __importDefault(require("../routes/register"));
//Routes middleware
app.use("/", GetUserIP_1.default);
//Static routes
app.use("/captcha", captcha_1.default);
app.use("/register", register_1.default);
const startServer = () => {
    app.listen(port, () => {
        console.log(`[server]: Server is running at http://localhost:${port}`);
    });
};
exports.startServer = startServer;
//# sourceMappingURL=routing.js.map