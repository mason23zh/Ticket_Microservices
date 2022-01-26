import { Publisher, OrderCreatedEvent, Subjects } from "@ortick/new-common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
