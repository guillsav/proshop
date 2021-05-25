import { Router } from 'express';
import defaultRouter from './default';

const routes = Router();

routes.use('/', defaultRouter);

export default routes;
