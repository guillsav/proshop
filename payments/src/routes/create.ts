import { NextFunction, Request, Response, Router } from 'express';
import { PaymentController } from '../controllers';
import { asyncHandler, createPaymentValidation } from '../middlewares';

const router = Router();

/**
 * @api {POST} /api/v1/payments/create
 * @apiName Create payment
 * @apiGroup Payments
 * @apiSuccess {Number} code HTTP status code from API.
 * @apiSuccess {Object} Created payment.
 */
router.post(
  '/',
  createPaymentValidation,
  asyncHandler((req: Request, res: Response, next: NextFunction) => {
    PaymentController.create(req, res, next, req.body);
  })
);

export default router;
