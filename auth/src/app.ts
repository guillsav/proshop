import express from 'express';
import cookieSession from 'cookie-session';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { apiErrorHandler, notFound, removeHeader } from './middlewares';
import routes from './routes';

const app = express();

app.set('trust proxy', true);
app.use(express.json());
app.use(cors());

if (process.env.NODE_ENV === 'production') {
  app.use(helmet());
  app.use(removeHeader);
}

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

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
