import { Subscriber } from './base';
import { Queues, ProductUpdatedEvent, Topics } from '../types';
import { ProductService } from '../../services';

class ProductUpdatedSubscriber extends Subscriber<ProductUpdatedEvent> {
  readonly topic: Topics.PRODUCT_UPDATED = Topics.PRODUCT_UPDATED;
  readonly queue: Queues.PRODUCTS = Queues.PRODUCTS;

  async onConsume(data: ProductUpdatedEvent['data']) {
    console.info(`[MESSAGE RECEIVED]: ${this.topic} / ${this.queue}`);

    const existingProduct = await ProductService.find(data.id);

    if (!existingProduct) {
      throw new Error('Product not found');
    }

    await ProductService.update(data, existingProduct);
    return;
  }
}

export default ProductUpdatedSubscriber;
