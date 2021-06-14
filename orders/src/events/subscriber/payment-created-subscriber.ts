import { Subscriber } from './base';
import { OrderStatus, PaymentCreatedEvent, Queues, Topics } from '../types';
import { OrderService } from '../../services';
import { broker } from '../broker';
import { OrderUpdatedPublisher } from '../publisher';

class PaymentCreatedSubscriber extends Subscriber<PaymentCreatedEvent> {
  topic: Topics.PAYMENT_CREATED = Topics.PAYMENT_CREATED;
  queue: Queues.PAYMENTS = Queues.PAYMENTS;

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

    await OrderUpdatedPublisher.publish({
      id: updatedOrder.id,
      price: updatedOrder.price,
      products: updatedOrder.products,
      status: updatedOrder.status,
      userId: updatedOrder.userId
    });

    return;
  }
}

export default new PaymentCreatedSubscriber((await broker).ch);
