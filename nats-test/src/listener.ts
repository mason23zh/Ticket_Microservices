import nats from "node-nats-streaming";
import { randomBytes } from "crypto";
import process from "process";
import { TicketCreatedListener } from "./events/ticket-created-listener";

console.clear();

const stan = nats.connect("ticketing", randomBytes(4).toString("hex"), {
  url: "http://localhost:4222",
});

stan.on("connect", () => {
  console.log("Listenner connected to NATS");

  stan.on("close", () => {
    console.log("NTAS connection closed");
    process.exit();
  });

  new TicketCreatedListener(stan).listen();
});

// Intercepte the terminal signal to close the listenner
// NOT WORKING ON WINDOWS
process.on("SIGINT", () => stan.close());
process.on("SIGTERM", () => stan.close());

// options for subscription
//   const options = stan
//     .subscriptionOptions()
//     .setManualAckMode(true)
//     .setDeliverAllAvailable()
//     .setDurableName("accouting-service");

// (channel id, queue group name)
//   const subscription = stan.subscribe(
//     "ticket:created",
//     "queue-group-name",
//     options
//   );

//   subscription.on("message", (msg: Message) => {
//     const data = msg.getData();
//     if (typeof data === "string") {
//       console.log(`Received event #${msg.getSequence()}, with data: ${data}`);
//     }
//     msg.ack();
//   });
// });
