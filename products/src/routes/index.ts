import { Router } from 'express';
import { restricted } from '../middlewares';
import createRouter from './create';
import defaultRouter from './default';
import fetchRouter from './fetch';

const router = Router();

router.use('/', defaultRouter);
router.use('/all', fetchRouter);
router.use('/create', restricted, createRouter);

export default router;
