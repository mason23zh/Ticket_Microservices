import { Publisher, Subjects, TicketUpdatedEvent } from "@ortick/new-common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}
