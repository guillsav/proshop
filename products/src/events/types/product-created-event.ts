import { Queues } from './queues';

export interface ProductCreatedEvent {
  queue: Queues.PRODUCT_CREATED;
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
