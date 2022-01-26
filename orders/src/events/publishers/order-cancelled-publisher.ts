import { Subjects, Publisher, OrderCancelledEvent } from "@ortick/new-common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
