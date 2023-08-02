import { internal } from "@hapi/boom";
import express from "express";
import { signup, SignupParams } from "../auth/signup";
import basicAuth from "express-basic-auth";

const router = express.Router();

const basicAuthUser = process.env.BASIC_AUTH_USER;
const basicAuthSecret = process.env.BASIC_AUTH_SECRET;

if (basicAuthUser == null || basicAuthSecret == null)
  throw Error("BASIC認証用の環境変数を定義してください");

const option = {
  users: {
    [basicAuthUser]: basicAuthSecret,
  },
};
router.post<{}, {}, SignupParams>(
  "/admin/signup",
  basicAuth(option),
  async (req, res, next) => {
    await signup(req.body)
      .then((user) => {
        res.status(200).json(user);
      })
      .catch(() => {
        next(internal());
      });
  }
);

export default router;
