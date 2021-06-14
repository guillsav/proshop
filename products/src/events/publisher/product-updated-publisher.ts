import { Publisher } from './base';
import { ProductUpdatedEvent, Queues, Topics } from '../types';
import { broker } from '../broker';

class ProductUpdatedPublisher extends Publisher<ProductUpdatedEvent> {
  readonly queue: Queues.PRODUCTS = Queues.PRODUCTS;
  readonly topic: Topics.PRODUCT_UPDATED = Topics.PRODUCT_UPDATED;
}

export default new ProductUpdatedPublisher((await broker).ch);
