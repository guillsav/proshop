import { Queues } from './queues';

export interface ProductUpdatedEvent {
  queue: Queues.PRODUCT_UPDATED;
  data: {
    id: string;
    name: string;
    image: string;
    brand: string;
    category: string;
    description: string;
    rating: number;
    numReviews: number;
    price: number;
    countInStock: number;
    userId: string;
    version: number;
  };
}
