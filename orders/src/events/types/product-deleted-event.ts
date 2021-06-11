import { Queues } from './queues';
import { Topics } from './topics';

export interface ProductDeletedEvent {
  topic: Topics.PRODUCT_DELETED;
  queue: Queues.PRODUCTS;
  data: {
    id: string;
    version: number;
  };
}
