import { NextFunction, Request, Response, Router } from 'express';
import { asyncHandler } from '../middlewares';
import { createOrderValidation } from '../middlewares';
import { OrderController } from '../controllers';

const router = Router();

/**
 * @api {POST} /api/v1/orders/create
 * @apiName Create a new order
 * @apiGroup Orders
 * @apiSuccess {Number} code HTTP status code from API.
 * @apiSuccess {Object} Created product.
 */
router.post(
  '/',
  createOrderValidation,
  asyncHandler((req: Request, res: Response, next: NextFunction) => {
    OrderController.create(req, res, next, req.body);
  })
);

export default router;
