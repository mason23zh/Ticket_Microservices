import express from "express";
import "express-async-errors"; //handle express errors, no needs to pass the new Error into the next() function
import { json } from "body-parser";
import cookieSession from "cookie-session";
import { Request, Response } from "express";

import { NotFoundError, currentUser } from "@ortick/new-common";

const app = express();
app.set("trust proxy", true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test", //set https to false if in test env
  })
);

app.use(currentUser);

app.all("*", async (req: Request, res: Response) => {
  throw new NotFoundError();
});

export { app };
