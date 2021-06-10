import { NextFunction, Request, Response, Router } from 'express';
import { asyncHandler, updateOrderValidation } from '../middlewares';
import { OrderController } from '../controllers';

const router = Router();

/**
 * @api {PUT} /api/v1/orders/update/:id
 * @apiName Update order
 * @apiGroup Orders
 * @apiSuccess {Number} code HTTP status code from API.
 * @apiSuccess {Object} Found order.
 */
router.put(
  '/:id',
  updateOrderValidation,
  asyncHandler((req: Request, res: Response, next: NextFunction) => {
    OrderController.update(req, res, next, req.body);
  })
);

export default router;
