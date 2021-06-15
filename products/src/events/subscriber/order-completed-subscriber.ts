import { Subscriber } from './base';
import { Queues, OrderCompletedEvent, Topics } from '../types';
import { ProductService } from '../../services';
import { broker } from '../broker';

class OrderCompletedSubscriber extends Subscriber<OrderCompletedEvent> {
  queue: OrderCompletedEvent['queue'] = Queues.ORDERS;
  topic: OrderCompletedEvent['topic'] = Topics.ORDER_COMPLETED;

  async onConsume(data: OrderCompletedEvent['data']) {
    console.info(`[MESSAGE RECEIVED]: ${this.topic} / ${this.queue}`);

    const { products } = data;

    products.map(async product => {
      const existingProduct = await ProductService.find(product.id);

      if (!existingProduct) {
        throw new Error('Product not found.');
      }

      existingProduct.countInStock = product.countInStock;
    });

    return;
  }
}

export default new OrderCompletedSubscriber((await broker).ch);
