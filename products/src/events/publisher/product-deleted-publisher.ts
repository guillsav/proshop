import { Publisher } from './base';
import { ProductDeletedEvent, Queues, Topics } from '../types';
import { broker } from '../broker';

class ProductDeletedPublisher extends Publisher<ProductDeletedEvent> {
  readonly topic: Topics.PRODUCT_DELETED = Topics.PRODUCT_DELETED;
  readonly queue: Queues.PRODUCTS = Queues.PRODUCTS;
}

export default new ProductDeletedPublisher((await broker).ch);
