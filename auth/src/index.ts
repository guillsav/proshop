import 'dotenv/config';
import { config } from './config';
import app from './app';
import { connectDatabase } from './database';

async function init() {
  if (!config.port) throw new Error(`PORT  must be defined`);
  if (!config.mongoURI) throw new Error(`MONGO_URI must be defined`);
  if (!config.jwtKey) throw new Error(`JWT_KEY must be defined`);

  await connectDatabase();

  const PORT = config.port;

  app.listen(PORT);

  console.log(`
      🚀 Server is Running!
      🔉 Listening on port ${PORT}
      📭 API @ http://localhost:${PORT}`);
}
init();
