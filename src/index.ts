import * as dotenv from "dotenv";
dotenv.config();

import "./auth/auth";
import "reflect-metadata";
import passport from "passport";
import express from "express";
import session from "express-session";
import { AppDataSource } from "./db/data-source";
import connectPgSimple from "connect-pg-simple";
import pg from "pg";
import { checkSession, headerTimezoneHandler } from "./router/routerUtils";
import loginRouter from "./router/loginRouter";
import userRouter from "./router/userRouter";
import sessionRouter from "./router/sessionRouter";
import { errorHandler } from "./router/routerError";
import httpContext from "express-http-context";
import adminRouter from "./router/adminRouter";

const pool = new pg.Pool({
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DATABASE,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
});

const app = express();
if (process.env.NODE_ENV === "production") {
  app.set("trust proxy", 1);
}
app.use(express.json());
app.use(httpContext.middleware);
app.use(
  session({
    store: new (connectPgSimple(session))({
      pool,
      tableName: "sessions",
    }),
    secret: process.env.SESSION_SECRET || "session secret",
    resave: true,
    saveUninitialized: false,
    cookie: {
      maxAge: 60 * 60 * 24 * 7 * 1000,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production", // production時はHTTPS前提なので
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

const port = process.env.port ?? 4000;

AppDataSource.initialize();

app.use("/", adminRouter);
app.use("/", loginRouter);
app.use(
  "/",
  [
    userRouter,
    sessionRouter,
  ].map((r) => r.use(checkSession, headerTimezoneHandler))
);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`backend listening on port ${port}`);
});
