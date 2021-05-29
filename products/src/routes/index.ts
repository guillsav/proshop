import { Router } from 'express';
import { restricted } from '../middlewares';
import createRouter from './create';
import defaultRouter from './default';
import fetchRouter from './fetch';
import showRouter from './show';
import updateRouter from './update';
import deleteRouter from './delete';

const router = Router();

router.use('/', defaultRouter);
router.use('/all', fetchRouter);
router.use('/', showRouter);
router.use('/create', restricted, createRouter);
router.use('/update', restricted, updateRouter);
router.use('/delete', restricted, deleteRouter);

export default router;
