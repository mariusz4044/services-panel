import dotenv from "dotenv";
import express from "express";
import session from "express-session";
import cors from "cors";

// @ts-ignore
import connectMongoDBSession from "connect-mongodb-session";
const MongoDBStore = connectMongoDBSession(session);

const store = new MongoDBStore({
  uri: process.env.DATABASE_URL,
  collection: "sessions",
});

const router = express.Router();
const app = express();
const port: string = process.env.PORT || "3000";
dotenv.config();

//Express Additional config
app.use(express.json({ limit: "1mb" }));
app.use(
  cors({
    methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
    credentials: true,
  }),
);

//Configuring express-session with MongoDBStore
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true, // 1 week expiration
    },
    store: store,
    saveUninitialized: false,
    resave: false,
  }),
);

//Import routes
import GetUserIP from "../middleware/User/GetUserIP";
import captcha from "../routes/captcha";
import register from "../routes/register";

//Routes middleware
app.use("/", GetUserIP);

//Static routes
app.use("/captcha", captcha);
app.use("/register", register);

export const startServer = (): void => {
  app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
  });
};
