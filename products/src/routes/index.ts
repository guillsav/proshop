import { Router } from 'express';
import { restricted } from '../middlewares';
import {
  createRouter,
  defaultRouter,
  deleteRouter,
  fetchRouter,
  showRouter,
  updateRouter
} from './products';

const router = Router();

router.use('/', defaultRouter);
router.use('/all', fetchRouter);
router.use('/', showRouter);
router.use('/create', restricted, createRouter);
router.use('/update', restricted, updateRouter);
router.use('/delete', restricted, deleteRouter);

export default router;
