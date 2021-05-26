import express from 'express';
import cookieSession from 'cookie-session';
import { apiErrorHandler, notFound } from './middlewares';
import routes from './routes';

const app = express();

app.set('trust proxy', true);
app.use(express.json());
app.use(
  cookieSession({
    httpOnly: true,
    signed: false,
    secure: process.env.NODE_ENV !== 'test'
  })
);

app.use('/api/v1/auth', routes);
app.use('*', notFound);
app.use(apiErrorHandler);

export default app;
