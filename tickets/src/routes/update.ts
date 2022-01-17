import express, { Request, Response } from "express";
import { body } from "express-validator";
import {
  validateRequest,
  NotFoundError,
  requireAuth,
  NotAuthorizedError,
} from "@ortick/new-common";
import { Ticket } from "../../models/ticket";

const router = express.Router();

router.put(
  "/api/tickets/:id",
  requireAuth,
  [
    body("title").not().isEmpty().withMessage("Title is required"),
    body("price")
      .isFloat({ gt: 0 })
      .withMessage("Price needs to be greater than 0"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      throw new NotFoundError();
    }

    console.log("ticket user id:", ticket.userId);
    console.log("current user id:", req.currentUser!.id);
    if (ticket.userId !== req.currentUser!.id) {
      // current user will be defined by requerAuth middleware
      throw new NotAuthorizedError();
    }

    // if user owns the ticket than update
    //!In mongoDb memory
    ticket.set({
      title: req.body.title,
      price: req.body.price,
    });
    await ticket.save();
    //save to DB
    res.send(ticket);
  }
);

export { router as updateTicketRouter };
