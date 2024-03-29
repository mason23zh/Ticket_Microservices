import express from "express";

import { currentUser } from "@ortick/new-common";

const router = express.Router();

router.get("/api/users/currentuser", currentUser, (req, res) => {
  //currentUser is the actual JSON payload
  res.send({ currentUser: req.currentUser || null });
});

export { router as currentUserRouter };
