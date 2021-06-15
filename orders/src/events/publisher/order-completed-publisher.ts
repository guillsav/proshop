import { Publisher } from './base';
import { broker } from '../broker';
import { OrderCompletedEvent, Queues, Topics } from '../types';

class OrderCompletedPublisher extends Publisher<OrderCompletedEvent> {
  readonly queue: OrderCompletedEvent['queue'] = Queues.ORDERS;
  readonly topic: OrderCompletedEvent['topic'] = Topics.ORDER_COMPLETED;
}

export default new OrderCompletedPublisher((await broker).ch);
