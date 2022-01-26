import { Ticket } from "../ticket";

it("implements optimistic concurrency control", async () => {
  // Create an instance of a ticket
  const ticket = Ticket.build({
    title: "concert",
    price: 20,
    userId: "123",
  });

  // Save the ticket to the DB
  await ticket.save();

  // Fetch the ticket TWICE
  const firstInstance = await Ticket.findById(ticket.id);
  const secondInstance = await Ticket.findById(ticket.id);

  // Make TWO separate changes to the tickets we fetched
  firstInstance?.set({ price: 5 });
  secondInstance?.set({ price: 15 });

  // Save the first fetched ticket (version number of the first save would be smaller version number)
  await firstInstance!.save();

  // Save the second fetched ticket (expect error, outdated version number)
  try {
    await secondInstance!.save();
  } catch (err) {
    return;
  }
  throw new Error("Shoud not reach this point");
});
