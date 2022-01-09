import express from "express";
import jwt from "jsonwebtoken";

const router = express.Router();

router.get("/api/users/currentuser", (req, res) => {
  //Check if user have a req.session.jwt set
  if (!req.session || !req.session.jwt) {
    return res.send({ currentUser: null });
  }

  //Check if JWT is valide
  try {
    const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!); //decode jwt
    // if validated
    res.send({ currentUser: payload });
  } catch (err) {
    return res.send({ currentUser: null });
  }
});

export { router as currentUserRouter };
