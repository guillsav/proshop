import amqp, { Channel, Connection } from 'amqplib';
import { config } from '../../config';

class AmqpWrapper {
  private _client?: typeof amqp;
  private conn?: Connection;
  private ch?: Channel;

  get client() {
    if (!this._client) {
      throw new Error('Cannot connect to RabbitMQ');
    }
    return this._client;
  }

  get channel() {
    return this.ch;
  }

  get connection() {
    return this.conn;
  }

  async init(url: string) {
    this._client = amqp;
    try {
      this.conn = await this._client.connect(url);
      this.ch = await this.conn.createChannel();
    } catch (error) {
      throw error;
    }

    return this;
  }

  close() {
    if (this.conn) {
      setTimeout(() => {
        this.conn!.close();
      }, 1000);
    }
  }
}

export const amqpWrapper = new AmqpWrapper().init(config.rabbitmqUrl);
