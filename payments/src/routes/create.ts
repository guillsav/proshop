import { NextFunction, Request, Response, Router } from 'express';
import { PaymentController } from '../controllers';
import { asyncHandler, createPaymentValidation } from '../middlewares';

const router = Router();

router.post(
  '/',
  createPaymentValidation,
  asyncHandler((req: Request, res: Response, next: NextFunction) => {
    PaymentController.create(req, res, next, req.body);
  })
);

export default router;
