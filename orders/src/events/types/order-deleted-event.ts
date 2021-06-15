import { Queues } from './queues';
import { Topics } from './topics';

export interface OrderDeletedEvent {
  topic: Topics.ORDER_DELETED;
  queue: Queues.ORDERS;
  data: {
    id: string;
    version: number;
  };
}
