import { NextFunction, Request, Response, Router } from 'express';
import reviewsController from '../../controllers/reviews.controller';
import { asyncHandler } from '../../middlewares';

const router = Router();

router.get(
  '/',
  asyncHandler((req: Request, res: Response, next: NextFunction) =>
    reviewsController.findAll(req, res, next)
  )
);

export default router;
