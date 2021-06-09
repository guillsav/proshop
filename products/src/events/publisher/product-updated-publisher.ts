import { Publisher } from './base';
import { ProductUpdatedEvent, Queues } from '../types';

class ProductUpdatedPublisher extends Publisher<ProductUpdatedEvent> {
  readonly queue: Queues.PRODUCT_UPDATED = Queues.PRODUCT_UPDATED;
}

export default ProductUpdatedPublisher;
