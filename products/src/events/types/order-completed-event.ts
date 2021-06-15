import { Queues } from '.';
import { Topics } from '.';
import { ProductEvent } from '../../lib';

export interface OrderCompletedEvent {
  queue: Queues.ORDERS;
  topic: Topics.ORDER_COMPLETED;
  data: {
    products: ProductEvent[];
  };
}
