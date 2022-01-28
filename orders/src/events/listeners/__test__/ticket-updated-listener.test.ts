import { TicketUpdatedListener } from "../ticket-updated-listener";
import { Message } from "node-nats-streaming";
import { natsWrapper } from "../../../nats-wrapper";
import { Ticket } from "../../../models/ticket";
import { TicketUpdatedEvent } from "@ortick/new-common";
import mongoose, { mongo } from "mongoose";

const setup = async () => {
  // Create a listener
  const listener = new TicketUpdatedListener(natsWrapper.client);

  // Create and save a ticket
  const ticket = Ticket.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    title: "concert",
    price: 20,
  });
  await ticket.save();

  // Create a fake data object
  const data: TicketUpdatedEvent["data"] = {
    id: ticket.id,
    version: ticket.version + 1,
    title: "concert 2",
    price: 50,
    userId: new mongoose.Types.ObjectId().toHexString(),
  };
  // Create a fake msg object
  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };
  // return
  return { data, msg, ticket, listener };
};

it("find, update, and save a ticket", async () => {
  const { msg, data, ticket, listener } = await setup();

  await listener.onMessage(data, msg);

  const updatedTicket = await Ticket.findById(ticket.id);

  expect(updatedTicket!.title).toEqual(data.title);
  expect(updatedTicket!.version).toEqual(data.version);
  expect(updatedTicket!.price).toEqual(data.price);
});

it("acks the message", async () => {
  const { msg, data, listener } = await setup();

  await listener.onMessage(data, msg);

  expect(msg.ack).toHaveBeenCalled();
});

it("does not call ack if the event is out of order", async () => {
  const { msg, data, listener, ticket } = await setup();

  data.version = 100;

  try {
    await listener.onMessage(data, msg);
  } catch (err) {}

  expect(msg.ack).not.toHaveBeenCalled();
});
