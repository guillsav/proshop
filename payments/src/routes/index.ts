import { Router } from 'express';
import { restricted } from '../middlewares';
import defaultRouter from './default';
import deleteRouter from './delete';
import createRouter from './create';
import showRouter from './show';

const router = Router();

router.use('/', defaultRouter);
router.use('/create', restricted, createRouter);
router.use('/show', restricted, showRouter);
router.use('/delete', restricted, deleteRouter);

export default router;
