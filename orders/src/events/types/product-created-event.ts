import { Queues } from './queues';
import { Topics } from './topics';

export interface ProductCreatedEvent {
  topic: Topics.PRODUCT_CREATED;
  queue: Queues.PRODUCTS;
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
