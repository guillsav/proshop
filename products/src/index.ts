import 'dotenv/config';
import { config } from './config';
import app from './app';
import { connectDatabase } from './database';
import { broker } from './events';

async function main(): Promise<void> {
  if (!config.port) throw new Error(`PORT must be defined`);
  if (!config.mongoURI) throw new Error(`MONGO_URI must be defined`);
  if (!config.jwtKey) throw new Error(`JWT_KEY must be defined`);
  if (!config.rabbitmqUrl) throw new Error(`RABBITMQ_URL must be defined`);

  await connectDatabase();

  app.listen(config.port);

  console.info(`
  🚀 [API IS RUNNING AT]: https://proshop.dev/api/v1/products
  📖 [API DOCUMENTATION AT]: http://proshop.dev/api/v1/products/api-docs
  `);

  process.on('beforeExit', async () => {
    console.log('Closing connection');
    await (await broker).conn!.close();
  });

  // process.on('SIGINT', async () => {
  //   console.log('Closing connection');
  //   await (await broker).conn!.close();
  // });

  // process.on('SIGTERM', async () => {
  //   console.log('Closing connection');
  //   await (await broker).conn!.close();
  // });
}
main();
