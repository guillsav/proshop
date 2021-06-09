import { Publisher } from './base';
import { ProductUpdatedEvent, Queues, Topics } from '../types';

class ProductUpdatedPublisher extends Publisher<ProductUpdatedEvent> {
  readonly queue: Queues.PRODUCTS = Queues.PRODUCTS;
  readonly topic: Topics.PRODUCT_UPDATED = Topics.PRODUCT_UPDATED;
}

export default ProductUpdatedPublisher;
