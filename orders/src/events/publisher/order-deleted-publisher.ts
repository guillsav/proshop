import { Publisher } from './base';
import { Queues, OrderDeletedEvent, Topics } from '../types';
import { broker } from '../broker';

class OrderDeletedPublisher extends Publisher<OrderDeletedEvent> {
  readonly topic: Topics.ORDER_DELETED = Topics.ORDER_DELETED;
  readonly queue: Queues.ORDERS = Queues.ORDERS;
}

export default new OrderDeletedPublisher((await broker).ch);
