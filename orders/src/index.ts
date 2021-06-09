import 'dotenv/config';
import { config } from './config';
import app from './app';
import { broker, ProductCreatedSubscriber } from './events';
import { connectDatabase } from './database';

async function main(): Promise<void> {
  if (!config.port) throw new Error(`PORT must be defined`);
  if (!config.mongoURI) throw new Error(`MONGO_URI must be defined`);
  if (!config.jwtKey) throw new Error(`JWT_KEY must be defined`);
  if (!config.rabbitmqUrl) throw new Error(`RABBITMQ_URL must be defined`);

  await new ProductCreatedSubscriber((await broker).ch).subscribe();

  await connectDatabase();

  app.listen(config.port);

  console.info(`
  🚀 [API IS RUNNING AT]: https://proshop.dev/api/v1/orders
  📖 [API DOCUMENTATION AT]: http://proshop.dev/api/v1/orders/api-docs
  `);
}
main();
