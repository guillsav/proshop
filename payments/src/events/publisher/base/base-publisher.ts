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
    return new Promise(async (resolve, reject) => {
      try {
        if (!this.ch) {
          throw new Error('Unable to connect to RabbitMQ Channel');
        }

        const data = Buffer.from(JSON.stringify(msg));

        console.log('Publishing event to queue', this.queue);

        this.ch.assertQueue(this.queue, { durable: true });
        const result = this.ch.sendToQueue(this.queue, data);

        if (!result) {
          await new Promise(resolve => this.ch!.once('drain', () => resolve));
        }

        console.log(`[MESSAGE SENT]: ${this.topic} / ${this.queue}`);

        resolve();
      } catch (err) {
        reject(err);
      }
    });
  }
}

export default Publisher;
