import dotenv from "dotenv";
import express from "express";
import session from "express-session";

// @ts-ignore
import connectMongoDBSession from "connect-mongodb-session";
const MongoDBStore = connectMongoDBSession(session);

const store = new MongoDBStore({
  uri: process.env.DATABASE_URL,
  collection: "sessions",
});

const router = express.Router();
const app = express();
const port: string = process.env.PORT;
dotenv.config();

//Express Additional config
app.use(express.json({ limit: "1mb" }));

//Configuring express-session with MongoDBStore
router.use(
  session({
    secret: process.env.SESSION_SECRET,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week expiration
    },
    store: store,
    resave: true,
    saveUninitialized: true,
  }),
);

//Import routes
import GetUserIP from "../middleware/User/GetUserIP";
import captcha from "../routes/captcha";

//Routes middleware
app.use("/", GetUserIP);

//Static routess
app.use("/captcha", captcha);

export const startServer = (): void => {
  app.listen(port, (err: any): boolean => {
    if (err) {
      console.log(`[server]: Error to start the server ${err}`);
      return false;
    }
    console.log(`[server]: Server is running on http://localhost:${port}`);
    return true;
  });
};

module.exports = { startServer, router };
