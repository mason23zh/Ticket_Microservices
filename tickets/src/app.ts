import express from "express";
import "express-async-errors"; //handle express errors, no needs to pass the new Error into the next() function
import { json } from "body-parser";
import cookieSession from "cookie-session";

const app = express();
app.set("trust proxy", true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test", //set https to false if in test env
  })
);

app.all("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
