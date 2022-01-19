import { Message, Stan } from "node-nats-streaming";
import { Subjects } from "./subjects";

interface Event {
  subject: Subjects;
  data: any;
}

export abstract class Listener<T extends Event> {
  /**
   * Function to run when a message is received
   */
  abstract onMessage(data: T["data"], msg: Message): void;

  /**
   * Name of the queue group this listener will join
   */
  abstract subject: T["subject"];
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
