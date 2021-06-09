import { Publisher } from './base';
import { ProductDeletedEvent, Queues } from '../types';

class ProductDeletedPublisher extends Publisher<ProductDeletedEvent> {
  readonly queue: Queues.PRODUCT_DELETED = Queues.PRODUCT_DELETED;
}

export default ProductDeletedPublisher;
