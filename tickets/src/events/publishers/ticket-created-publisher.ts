import { Publisher, Subjects, TicketCreatedEvent } from "@ortick/new-common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}
