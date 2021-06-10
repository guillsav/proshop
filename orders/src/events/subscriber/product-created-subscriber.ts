import { Subscriber } from './base';
import { Queues, ProductCreatedEvent, Topics } from '../types';
import { ProductService } from '../../services';

class ProductCreatedSubscriber extends Subscriber<ProductCreatedEvent> {
  readonly topic: Topics.PRODUCT_CREATED = Topics.PRODUCT_CREATED;
  readonly queue: Queues.PRODUCTS = Queues.PRODUCTS;

  async onConsume(data: ProductCreatedEvent['data']) {
    console.info(`[MESSAGE RECEIVED]: ${this.topic} / ${this.queue}`);

    const existingProduct = await ProductService.find(data.id);

    if (existingProduct) {
      throw new Error('Product already added to db');
    }

    const product = await ProductService.add(data);

    if (product) {
      console.log('Added product to orders service db');
      return;
    }
  }
}

export default ProductCreatedSubscriber;
