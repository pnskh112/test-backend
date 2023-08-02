import express from "express";

const router = express.Router();

router.route("/session").get((req, res) => {
  res.json({ userId: req.user?.userId });
});

router.route("/session/logout").post((req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.json({ success: true });
  });
});

export default router;
