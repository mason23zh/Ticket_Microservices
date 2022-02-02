import {
  Publisher,
  Subjects,
  ExpirationCompleteEvent,
} from "@ortick/new-common";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}
