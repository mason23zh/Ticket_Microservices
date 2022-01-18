import nats from "node-nats-streaming";

console.clear();

// create a client
const stan = nats.connect("ticketing", "abc", {
  url: "http://localhost:4222",
});

// listen to 'connect' event after stan been connected
stan.on("connect", () => {
  console.log("publisher connected to NATS");

  // NATS can only take data as string format
  const data = JSON.stringify({
    id: "123",
    title: "concert",
    price: "20",
  });

  // publish data, (channel name, data)
  stan.publish("ticket:created", data, () => {
    console.log("event published");
  });
});
