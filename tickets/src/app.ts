import express from "express";
import "express-async-errors"; //handle express errors, no needs to pass the new Error into the next() function
import { json } from "body-parser";
import cookieSession from "cookie-session";
import { Request, Response } from "express";

import { NotFoundError, currentUser } from "@ortick/new-common";

import { createTicketRouter } from "./routes/new";
import { showTicketRouter } from "./routes/show";
import { indexTicketRouter } from "./routes";
import { updateTicketRouter } from "./routes/update";

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

app.use(createTicketRouter);
app.use(showTicketRouter);
app.use(indexTicketRouter);
app.use(updateTicketRouter);

app.all("*", async (req: Request, res: Response) => {
  throw new NotFoundError();
});

export { app };
