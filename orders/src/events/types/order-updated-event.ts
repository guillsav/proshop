import { ProductDoc } from '../../model';
import { OrderStatus } from './order-status';
import { Queues } from './queues';
import { Topics } from './topics';

export interface OrderUpdatedEvent {
  topic: Topics.ORDER_UPDATED;
  queue: Queues.ORDERS;
  data: {
    id: string;
    userId: string;
    products: [ProductDoc];
    price: number;
    status: OrderStatus;
  };
}
