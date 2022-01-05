import express from "express";

const router = express.Router();

router.get("/api/users/signout", (req, res) => {
  res.send("Hi there from signout route");
});

export { router as signoutRouter };
