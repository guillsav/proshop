import { Queues } from './queues';
import { Topics } from './topics';

export interface ProductUpdatedEvent {
  topic: Topics.PRODUCT_UPDATED;
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
