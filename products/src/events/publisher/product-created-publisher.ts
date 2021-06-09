import { Publisher } from './base';
import { ProductCreatedEvent, Queues } from '../types';

class ProductCreatedPublisher extends Publisher<ProductCreatedEvent> {
  readonly queue: Queues.PRODUCT_CREATED = Queues.PRODUCT_CREATED;
}

export default ProductCreatedPublisher;
