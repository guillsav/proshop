import { Queues } from '.';
import { Topics } from '.';

export interface PaymentCreatedEvent {
  queue: Queues.PAYMENTS;
  topic: Topics.PAYMENT_CREATED;
  data: {
    orderId: string;
    version: number;
  };
}
