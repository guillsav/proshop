import { NextFunction, Request, Response, Router } from 'express';
import { PaymentController } from '../controllers';
import { asyncHandler } from '../middlewares';

const router = Router();

/**
 * @api {DELETE} /api/v1/payment/delete/:id
 * @apiName Delete payment
 * @apiGroup Payments
 * @apiSuccess {Number} code HTTP status code from API.
 * @apiSuccess {} No content.
 */
router.delete(
  '/:id',
  asyncHandler((req: Request, res: Response, next: NextFunction) =>
    PaymentController.delete(req, res, next)
  )
);

export default router;
