import { Listener } from "../events/base-listener";
import { Message } from "node-nats-streaming";

export class TicketCreatedListener extends Listener {
  //channel from the publisher
  subject = "ticket:created";

  queueGroupName = "payments-service";

  onMessage(data: any, msg: Message) {
    console.log("Event data:", data);
    msg.ack();
  }
}
