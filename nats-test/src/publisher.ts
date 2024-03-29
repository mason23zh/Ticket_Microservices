import nats from "node-nats-streaming";
import { TicketCreatedPublisher } from "./events/ticket-created-publisher";

console.clear();

// create a client
const stan = nats.connect("ticketing", "abc", {
  url: "http://localhost:4222",
});

// listen to 'connect' event after stan been connected
stan.on("connect", async () => {
  console.log("publisher connected to NATS");

  const publisher = new TicketCreatedPublisher(stan);
  try {
    await publisher.publish({
      id: "123",
      title: "concert",
      price: 20,
    });
  } catch (err) {
    console.error(err);
  }

  // NATS can only take data as string format
  // const data = JSON.stringify({
  //   id: "123",
  //   title: "concert",
  //   price: "20",
  // });

  // // publish data, (channel name, data)
  // stan.publish("ticket:created", data, () => {
  //   console.log("event published");
  // });
});
