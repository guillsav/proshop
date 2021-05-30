import { Router } from 'express';
import { restricted } from '../middlewares';
import defaultRouter from './default';
import {
  createProductRouter,
  deleteProductRouter,
  fetchProductsRouter,
  showProductRouter,
  updateProductRouter
} from './products';
import {
  createReviewRouter,
  deleteReviewRouter,
  fetchReviewsRouter
} from './reviews';

const router = Router();

router.use('/', defaultRouter);
router.use('/products/all', fetchProductsRouter);
router.use('/products', showProductRouter);
router.use('/products/create', restricted, createProductRouter);
router.use('/products/update', restricted, updateProductRouter);
router.use('/products/delete', restricted, deleteProductRouter);
router.use('/reviews/create', createReviewRouter);
router.use('/reviews/all', fetchReviewsRouter);
router.use('/reviews/delete', deleteReviewRouter);

export default router;
