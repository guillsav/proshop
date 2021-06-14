import { Publisher } from './base';
import { Queues, OrderUpdatedEvent, Topics } from '../types';
import { broker } from '../broker';

class OrderUpdatedPublisher extends Publisher<OrderUpdatedEvent> {
  readonly topic: Topics.ORDER_UPDATED = Topics.ORDER_UPDATED;
  readonly queue: Queues.ORDERS = Queues.ORDERS;
}

export default new OrderUpdatedPublisher((await broker).ch);
