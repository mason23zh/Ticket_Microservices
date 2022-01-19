import nats, { Message, Stan } from "node-nats-streaming";
import { randomBytes } from "crypto";
import process, { kill } from "process";

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

  // options for subscription
  const options = stan
    .subscriptionOptions()
    .setManualAckMode(true)
    .setDeliverAllAvailable()
    .setDurableName("accouting-service");

  // (channel id, queue group name)
  const subscription = stan.subscribe(
    "ticket:created",
    "queue-group-name",
    options
  );

  subscription.on("message", (msg: Message) => {
    const data = msg.getData();
    if (typeof data === "string") {
      console.log(`Received event #${msg.getSequence()}, with data: ${data}`);
    }
    msg.ack();
  });
});

// Intercepte the terminal signal to close the listenner
// NOT WORKING ON WINDOWS

process.on("SIGINT", () => stan.close());
process.on("SIGTERM", () => stan.close());

abstract class Listener {
  /**
   * Function to run when a message is received
   */
  abstract onMessage(data: any, msg: Message): void;

  /**
   * Name of the queue group this listener will join
   */
  abstract subject: string;
  abstract queueGroupName: string;

  /**
   * Pre-initialized NATS client
   */
  private client: Stan;

  constructor(client: Stan) {
    this.client = client;
  }

  /**
   * Number of seconds this listener has to ack a message
   * Default: 5 seconds
   */
  protected ackWait = 5 * 1000;

  /**
   * Default subscription options
   */
  subscriptionOptions() {
    return this.client
      .subscriptionOptions()
      .setDeliverAllAvailable()
      .setManualAckMode(true)
      .setAckWait(this.ackWait)
      .setDurableName(this.queueGroupName);
  }

  /**
   * Set up the subscription
   */

  listen() {
    const subscription = this.client.subscribe(
      this.subject,
      this.queueGroupName,
      this.subscriptionOptions()
    );

    subscription.on("message", (msg: Message) => {
      console.log(`Message received: ${this.subject} / ${this.queueGroupName}`);

      const parsedData = this.parseMessage(msg);
      this.onMessage(parsedData, msg);
    });
  }

  /**
   * Parse the incomming data from JSON(String)
   */
  parseMessage(msg: Message) {
    const data = msg.getData();
    return typeof data === "string"
      ? JSON.parse(data)
      : JSON.parse(data.toString("utf8"));
  }
}
