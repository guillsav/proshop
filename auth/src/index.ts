import 'dotenv/config';
import { config } from './config';
import app from './app';
import { connectDatabase } from './database';

async function main(): Promise<void> {
  if (!config.port) throw new Error(`PORT must be defined`);
  if (!config.mongoURI) throw new Error(`MONGO_URI must be defined`);
  if (!config.jwtKey) throw new Error(`JWT_KEY must be defined`);

  await connectDatabase();

  app.listen(config.port);

  console.info(`
  🚀 [API IS RUNNING AT]: https://proshop.dev/api/v1/auth
  📖 [API DOCUMENTATION AT]: http://proshop.dev/api/v1/auth/api-docs
  `);
}
main();
