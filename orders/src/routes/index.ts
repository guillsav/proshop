import { Router } from 'express';
import { restricted } from '../middlewares';
import defaultRouter from './default';
import createRouter from './create';
import deleteRouter from './delete';
import fetchRouter from './fetch';
import showRouter from './show';
import updateRouter from './update';

const router = Router();

router.use('/', defaultRouter);
router.use('/create', restricted, createRouter);
router.use('/all', restricted, fetchRouter);
router.use('/show', restricted, showRouter);
router.use('/update', restricted, updateRouter);
router.use('/delete', restricted, deleteRouter);

export default router;
