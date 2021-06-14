import { Queues } from './queues';
import { Topics } from './topics';

export interface PaymentCreatedEvent {
  queue: Queues.PAYMENTS;
  topic: Topics.PAYMENT_CREATED;
  data: {
    orderId: string;
    version: number;
  };
}
