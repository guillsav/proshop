import { Subscriber } from './base';
import { Queues, ProductDeletedEvent, Topics } from '../types';
import { ProductService } from '../../services';

class ProductDeletedSubscriber extends Subscriber<ProductDeletedEvent> {
  readonly topic: Topics.PRODUCT_DELETED = Topics.PRODUCT_DELETED;
  readonly queue: Queues.PRODUCTS = Queues.PRODUCTS;

  async onConsume(data: ProductDeletedEvent['data']) {
    const product = await ProductService.find(data.id);

    if (!product) {
      throw new Error('Product not found');
    }

    await ProductService.remove(product);
    return;
  }
}

export default ProductDeletedSubscriber;
