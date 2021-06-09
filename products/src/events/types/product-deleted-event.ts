import { Queues } from './queues';

export interface ProductDeletedEvent {
  queue: Queues.PRODUCT_DELETED;
  data: {
    id: string;
  };
}
