import { NextFunction, Request, Response, Router } from 'express';
import { asyncHandler } from '../middlewares';
import { OrderController } from '../controllers';

const router = Router();

/**
 * @api {DELETE} /api/v1/orders/delete/:id
 * @apiName Delete order
 * @apiGroup Orders
 * @apiSuccess {Number} code HTTP status code from API.
 * @apiSuccess {Object} Deleted order.
 */
router.delete(
  '/:id',
  asyncHandler((req: Request, res: Response, next: NextFunction) => {
    // OrderController
  })
);

export default router;
