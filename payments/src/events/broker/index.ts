import amqp, { Channel, Connection } from 'amqplib';
import { config } from '../../config';

class Broker {
  private _client?: typeof amqp;
  private _conn?: Connection;
  private _ch?: Channel;

  get client() {
    if (!this._client) {
      throw new Error('Cannot connect to Broker');
    }
    return this._client;
  }

  get ch() {
    return this._ch;
  }

  get conn() {
    return this._conn;
  }

  async init(url: string) {
    if (!this._client) {
      this._client = amqp;
    }

    try {
      this._conn = await this._client.connect(url);
      this._ch = await this._conn.createChannel();
    } catch (error) {
      throw error;
    }

    return this;
  }

  close() {
    if (this._ch) {
      setTimeout(() => {
        this._ch!.close();
        this._conn!.close();
      }, 1000);
    }
  }
}

export const broker = new Broker().init(config.rabbitmqUrl);
