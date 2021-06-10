import { NextFunction, Request, Response, Router } from 'express';
import { OrderController } from '../controllers';
import { asyncHandler } from '../middlewares';

const router = Router();

/**
 * @api {GET} /api/v1/orders/show/:id
 * @apiName View order
 * @apiGroup Orders
 * @apiSuccess {Number} code HTTP status code from API.
 * @apiSuccess {Object} Found order.
 */
router.get(
  '/:id',
  asyncHandler((req: Request, res: Response, next: NextFunction) => {
    OrderController.findById(req, res, next);
  })
);

export default router;
