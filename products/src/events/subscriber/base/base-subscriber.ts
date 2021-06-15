import { Channel, ConsumeMessage } from 'amqplib';
import { Queues, Topics } from '../../types';

interface Event {
  topic: Topics;
  queue: Queues;
  data: any;
}

abstract class Subscriber<T extends Event> {
  abstract topic: T['topic'];
  abstract queue: T['queue'];
  abstract onConsume(data: T['data']): void;

  constructor(protected ch?: Channel) {}

  /**
   * Subscribe to a Queue
   * @param {String} queue Queue name
   */
  async subscribe() {
    if (!this.ch) {
      throw new Error("Broker's channel not initialized");
    }

    await this.ch.assertQueue(this.queue, { durable: true });

    this.ch.consume(this.queue, async (msg: ConsumeMessage | null) => {
      if (msg) {
        const parsedMessage = JSON.parse(msg.content.toString());

        this.onConsume(parsedMessage);

        this.ch!.ack(msg);
      }
    });
  }
}

export default Subscriber;
