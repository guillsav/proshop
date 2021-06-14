import { Publisher } from './base';
import { broker } from '../broker';
import { PaymentCreatedEvent, Queues, Topics } from '../types';

class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  queue: Queues.PAYMENTS = Queues.PAYMENTS;
  topic: Topics.PAYMENT_CREATED = Topics.PAYMENT_CREATED;
}

export default new PaymentCreatedPublisher((await broker).ch);
