import { Router } from 'express';
import { restricted } from '../middlewares';
import defaultRouter from './default';
import createRouter from './create';

const router = Router();

router.use('/', defaultRouter);
router.use('/create', restricted, createRouter);

export default router;
