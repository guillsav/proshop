import { NextFunction, Request, Response, Router } from 'express';
import { PaymentController } from '../controllers';
import { asyncHandler } from '../middlewares';

const router = Router();

/**
 * @api {GET} /api/v1/payments/show/:id
 * @apiName Show payments
 * @apiGroup Payments
 * @apiSuccess {Number} code HTTP status code from API.
 * @apiSuccess {Object} Found payment.
 */
router.get(
  '/:id',
  asyncHandler((req: Request, res: Response, next: NextFunction) =>
    PaymentController.find(req, res, next)
  )
);

export default router;
