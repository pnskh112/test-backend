import express from "express";
import passport from "passport";

const router = express.Router();

router
  .route("/login")
  .post(passport.authenticate("local", { session: true }), (_req, res) => {
    res.json({ success: true });
  });

export default router;
