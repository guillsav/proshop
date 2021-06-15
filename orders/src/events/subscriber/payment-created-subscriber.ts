import { Subscriber } from './base';
import { OrderStatus, PaymentCreatedEvent, Queues, Topics } from '../types';
import { OrderService } from '../../services';
import { broker } from '../broker';
import { OrderCompletedPublisher } from '../publisher';
import { OrderProduct } from '../../lib';

class PaymentCreatedSubscriber extends Subscriber<PaymentCreatedEvent> {
  readonly queue: PaymentCreatedEvent['queue'] = Queues.PAYMENTS;
  readonly topic: PaymentCreatedEvent['topic'] = Topics.PAYMENT_CREATED;

  async onConsume(data: PaymentCreatedEvent['data']) {
    console.info(`[MESSAGE RECEIVED]: ${this.topic} / ${this.queue}`);

    const order = await OrderService.find(data.orderId);

    if (!order) {
      throw new Error('Order not found.');
    }

    const updatedOrder = await OrderService.update(order, {
      status: OrderStatus.COMPLETE,
      version: order.version + 1
    });

    const products: OrderProduct[] = updatedOrder.products.map(product => {
      return {
        ...product,
        countInStock: product.countInStock - product.quantity
      };
    });

    await OrderCompletedPublisher.publish({ products });

    return;
  }
}

export default new PaymentCreatedSubscriber((await broker).ch);
