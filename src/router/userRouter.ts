import { badRequest, internal, unauthorized } from "@hapi/boom";
import express from "express";
import { getUserById } from "../application/userApplication";
import { User as User } from "../model/User";

const router = express.Router();

type UserResponse = {
  userId: string;
};

const toUserResponse = (user: User): UserResponse => {
  return {
    userId: user.id,
  };
};

router.route("/users/me").get<{}, UserResponse>(async (req, res, next) => {
  const userId = req.user?.userId;

  if (userId == null) {
    next(unauthorized());
    return;
  }

  await getUserById(userId)
    .then((user) => {
      if (user == null) {
        next(badRequest());
        return;
      }
      res.status(200).json(toUserResponse(user));
    })
    .catch(() => {
      next(internal());
      return;
    });
});

export default router;
