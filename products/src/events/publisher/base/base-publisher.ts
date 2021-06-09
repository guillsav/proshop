import { Channel } from 'amqplib';
import { Queues, Topics } from '../../types';

interface Event {
  topic: Topics;
  queue: Queues;
  data: any;
}

abstract class Publisher<T extends Event> {
  abstract topic: T['topic'];
  abstract queue: T['queue'];

  constructor(protected ch?: Channel) {}

  /**
   * Publish message to queue
   * @param {Object} msg Message as Buffer
   */
  async publish(msg: T['data']): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        if (!this.ch) {
          throw new Error('Unable to connect to RabbitMQ Channel');
        }

        const data = Buffer.from(JSON.stringify(msg._doc));

        console.log('Publishing event to queue', this.queue);

        this.ch.assertQueue(this.queue, { durable: true });
        this.ch.sendToQueue(this.queue, data);

        console.log(`[Message sent]: ${this.topic} / ${this.queue}`);

        resolve();
      } catch (err) {
        reject(err);
      }
    });
  }
}

export default Publisher;
