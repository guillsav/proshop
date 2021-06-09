import { Subscriber } from './base';
import { Queues, ProductCreatedEvent, Topics } from '../types';
import { Product } from '../../model';

class ProductCreatedSubscriber extends Subscriber<ProductCreatedEvent> {
  readonly topic: Topics.PRODUCT_CREATED = Topics.PRODUCT_CREATED;
  readonly queue: Queues.PRODUCTS = Queues.PRODUCTS;

  async onConsume(data: ProductCreatedEvent['data']) {
    console.info(`[Message received]: ${this.topic} / ${this.queue}`);

    const existingProduct = await Product.findById(data.id);

    if (existingProduct) {
      throw new Error('Product already added to db');
    }

    const product = await Product.build({ ...data }).save();

    if (product) {
      console.log('Added product to orders service db');
      return;
    }
  }
}

export default ProductCreatedSubscriber;
