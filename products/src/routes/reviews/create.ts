import { NextFunction, Request, Response, Router } from 'express';
import reviewsController from '../../controllers/reviews.controller';
import { asyncHandler, createReviewValidation } from '../../middlewares';

const router = Router();

router.post(
  '/',
  createReviewValidation,
  asyncHandler((req: Request, res: Response, next: NextFunction) =>
    reviewsController.create(req, res, next, req.body)
  )
);

export default router;
