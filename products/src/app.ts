import express from 'express';
import { apiErrorHandler, notFound } from '../../src';
import routes from './routes';

const app = express();

app.use('/api/v1', routes);
app.use(notFound);
app.use(apiErrorHandler);

export default app;
