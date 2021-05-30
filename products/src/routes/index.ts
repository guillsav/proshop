import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
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
router.use('/all', fetchProductsRouter);
router.use('/show', showProductRouter);
router.use('/create', restricted, createProductRouter);
router.use('/update', restricted, updateProductRouter);
router.use('/delete', restricted, deleteProductRouter);
router.use('/reviews/create', createReviewRouter);
router.use('/reviews/all', fetchReviewsRouter);
router.use('/reviews/delete', deleteReviewRouter);

try {
  const swaggerDoc = require('../../swagger.json');

  router.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerDoc, { explorer: true })
  );
} catch (error) {
  console.error('Unable to read swagger.json', error);
}

export default router;
