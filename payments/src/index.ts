import 'dotenv/config';
import { config } from './config';
import app from './app';
// import {
//   broker,
//   ProductCreatedSubscriber,
//   ProductDeletedSubscriber,
//   ProductUpdatedSubscriber
// } from './events';
import { connectDatabase } from './database';

async function main(): Promise<void> {
  if (!config.port) throw new Error(`PORT must be defined`);
  if (!config.mongoURI) throw new Error(`MONGO_URI must be defined`);
  if (!config.jwtKey) throw new Error(`JWT_KEY must be defined`);
  if (!config.rabbitmqUrl) throw new Error(`RABBITMQ_URL must be defined`);
  if (!config.stripeKey) throw new Error(`STRIPE_KEY must be defined`);

  // process.on('beforeExit', async () => {
  //   console.log('Closing RabbitMQ connection');
  //   (await broker).conn!.close();
  // });

  // Subscribing to broker's queues.
  // await new ProductCreatedSubscriber((await broker).ch).subscribe();
  // await new ProductUpdatedSubscriber((await broker).ch).subscribe();
  // await new ProductDeletedSubscriber((await broker).ch).subscribe();

  // Connecting to MongoDB
  await connectDatabase();

  app.listen(config.port, () =>
    console.info(`
  🚀 [API IS RUNNING AT]: https://proshop.dev/api/v1/payments
  📖 [API DOCUMENTATION AT]: http://proshop.dev/api/v1/payments/api-docs
  `)
  );
}
main();
