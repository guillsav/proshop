import { Queues } from './queues';
import { Topics } from './topics';
import { OrderProduct } from '../../lib';

export interface OrderCompletedEvent {
  queue: Queues.ORDERS;
  topic: Topics.ORDER_COMPLETED;
  data: { products: OrderProduct[] };
}
