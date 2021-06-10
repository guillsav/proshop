import { NextFunction, Request, Response, Router } from 'express';
import { OrderController } from '../controllers';
import { asyncHandler } from '../middlewares';

const router = Router();

/**
 * @api {GET} /api/v1/orders/all
 * @apiName Fetch orders
 * @apiGroup Orders
 * @apiSuccess {Number} code HTTP status code from API.
 * @apiSuccess {Object} Retrived orders.
 */
router.get(
  '/',
  asyncHandler((req: Request, res: Response, next: NextFunction) => {
    OrderController.findAll(req, res, next);
  })
);

export default router;
