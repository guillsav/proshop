import { Publisher } from './base';
import { ProductCreatedEvent, Queues, Topics } from '../types';
import { broker } from '../broker';

class ProductCreatedPublisher extends Publisher<ProductCreatedEvent> {
  readonly topic: Topics.PRODUCT_CREATED = Topics.PRODUCT_CREATED;
  readonly queue: Queues.PRODUCTS = Queues.PRODUCTS;
}

export default new ProductCreatedPublisher((await broker).ch);
