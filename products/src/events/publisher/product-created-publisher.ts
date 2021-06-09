import { Publisher } from './base';
import { ProductCreatedEvent, Queues, Topics } from '../types';

class ProductCreatedPublisher extends Publisher<ProductCreatedEvent> {
  readonly topic: Topics.PRODUCT_CREATED = Topics.PRODUCT_CREATED;
  readonly queue: Queues.PRODUCTS = Queues.PRODUCTS;
}

export default ProductCreatedPublisher;
